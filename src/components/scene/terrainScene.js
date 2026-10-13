/**
 * "Risk-aware inspection" scene, in plain WebGL (no 3D library, a few KB gzipped).
 *
 * A synthetic terrain rendered as a topographic point field. A few regions carry
 * an uncertain, high-consequence hazard (accent tint). A UAV chooses where to fly
 * next by weighing risk against distance, inspects, and the region resolves.
 * It is an illustration of the SafeScout research question, not a result.
 *
 * Performance notes:
 * - The terrain is one static vertex buffer and one draw call; heights are computed once.
 * - Per frame, only the rows under the sensor footprint are re-uploaded (bufferSubData).
 * - Device pixel ratio is capped, and drops to 1 if frames are consistently slow.
 * - The caller stops the loop when the canvas is off-screen or the tab is hidden.
 */

/* ---------- Deterministic terrain ---------- */

const hash = (x, z) => {
  const s = Math.sin(x * 127.1 + z * 311.7) * 43758.5453
  return s - Math.floor(s)
}
const smooth = t => t * t * (3 - 2 * t)
const noise = (x, z) => {
  const xi = Math.floor(x)
  const zi = Math.floor(z)
  const xf = smooth(x - xi)
  const zf = smooth(z - zi)
  const a = hash(xi, zi)
  const b = hash(xi + 1, zi)
  const c = hash(xi, zi + 1)
  const d = hash(xi + 1, zi + 1)
  return a + (b - a) * xf + (c - a) * zf + (a - b - c + d) * xf * zf
}
const fbm = (x, z) => {
  let v = 0
  let amp = 0.5
  let f = 1
  for (let i = 0; i < 5; i++) {
    v += amp * noise(x * f, z * f)
    f *= 2.03
    amp *= 0.5
  }
  return v
}

const SIZE_X = 13
const SIZE_Z = 8.5

// A ridge to the north and a valley cutting across: landslide country.
const heightAt = (x, z) => {
  const base = fbm(x * 0.32 + 4.1, z * 0.32 + 1.7) * 2.1
  const ridge = Math.exp(-((z + 2.6) ** 2) / 3.2) * 1.15
  const valley = -Math.exp(-((x * 0.55 + z * 0.5 - 0.6) ** 2) / 1.4) * 0.95
  const detail = fbm(x * 1.4, z * 1.4) * 0.18
  return base + ridge + valley + detail - 1.2
}

// Seeded random for hazard placement, so cycles vary but stay reproducible.
const mulberry = seed => () => {
  seed |= 0
  seed = (seed + 0x6d2b79f5) | 0
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}

/* ---------- Minimal matrix maths (column-major, like GLSL) ---------- */

const perspective = (fovy, aspect, near, far) => {
  const f = 1 / Math.tan(fovy / 2)
  const nf = 1 / (near - far)
  return new Float32Array([f / aspect, 0, 0, 0, 0, f, 0, 0, 0, 0, (far + near) * nf, -1, 0, 0, 2 * far * near * nf, 0])
}

const lookAt = (eye, target) => {
  let zx = eye[0] - target[0]
  let zy = eye[1] - target[1]
  let zz = eye[2] - target[2]
  let len = Math.hypot(zx, zy, zz)
  zx /= len
  zy /= len
  zz /= len
  // x = up(0, 1, 0) cross z
  let xx = zz
  const xy = 0
  let xz = -zx
  len = Math.hypot(xx, xz)
  xx /= len
  xz /= len
  // y = z cross x
  const yx = zy * xz - zz * xy
  const yy = zz * xx - zx * xz
  const yz = zx * xy - zy * xx
  return new Float32Array([
    xx,
    yx,
    zx,
    0,
    xy,
    yy,
    zy,
    0,
    xz,
    yz,
    zz,
    0,
    -(xx * eye[0] + xy * eye[1] + xz * eye[2]),
    -(yx * eye[0] + yy * eye[1] + yz * eye[2]),
    -(zx * eye[0] + zy * eye[1] + zz * eye[2]),
    1,
  ])
}

/* ---------- Shaders (GLSL ES 1.0, runs on WebGL 1 and 2) ---------- */

const TERRAIN_VS = `
precision highp float;
attribute vec3 aPos;
attribute float aSeen;
attribute float aRand;
uniform mat4 uView;
uniform mat4 uProj;
uniform float uTime;
uniform float uSize;
uniform float uPixelRatio;
uniform vec4 uHazards[4];
uniform float uResolved[4];
varying float vBright;
varying float vRisk;
varying float vScan;
varying float vFog;

void main() {
  vec4 mv = uView * vec4(aPos, 1.0);
  gl_Position = uProj * mv;

  float f = fract(aPos.y * 3.2);
  float d = min(f, 1.0 - f);
  float contour = 1.0 - smoothstep(0.0, 0.09, d);

  float risk = 0.0;
  for (int i = 0; i < 4; i++) {
    vec2 dp = aPos.xz - uHazards[i].xy;
    float g = exp(-dot(dp, dp) / (uHazards[i].z * uHazards[i].z));
    risk += g * uHazards[i].w * (1.0 - uResolved[i]);
  }
  vRisk = clamp(risk, 0.0, 1.0);
  vScan = aSeen > 0.0 ? exp(-(uTime - aSeen) / 3.2) : 0.0;
  vBright = 0.3 + contour * 0.55 + aRand * 0.1;
  vFog = smoothstep(-24.0, -13.0, mv.z);

  float size = uSize * (1.0 + contour * 0.5 + vRisk * 0.9 + vScan * 0.6);
  gl_PointSize = size * uPixelRatio * (17.0 / -mv.z);
}`

const TERRAIN_FS = `
precision mediump float;
uniform vec3 uInk;
uniform vec3 uAccent;
uniform float uAlpha;
varying float vBright;
varying float vRisk;
varying float vScan;
varying float vFog;

void main() {
  float r = length(gl_PointCoord - 0.5);
  if (r > 0.5) discard;
  float edge = smoothstep(0.5, 0.25, r);
  vec3 col = mix(uInk, uAccent, smoothstep(0.08, 0.7, vRisk));
  float a = clamp((vBright + vRisk * 0.75 + vScan * 0.55) * edge * vFog * uAlpha, 0.0, 1.0);
  gl_FragColor = vec4(col * a, a);
}`

// Shared by the footprint ring, sensor beam, trail and the drone marker.
const SIMPLE_VS = `
precision highp float;
attribute vec3 aPos;
attribute float aAlpha;
uniform mat4 uView;
uniform mat4 uProj;
uniform float uPointSize;
varying float vAlpha;
void main() {
  vAlpha = aAlpha;
  gl_Position = uProj * uView * vec4(aPos, 1.0);
  gl_PointSize = uPointSize;
}`

const SIMPLE_FS = `
precision mediump float;
uniform vec3 uColor;
uniform float uOpacity;
uniform float uRound;
varying float vAlpha;
void main() {
  float a = vAlpha * uOpacity;
  if (uRound > 0.5) {
    float r = length(gl_PointCoord - 0.5);
    if (r > 0.5) discard;
    a *= smoothstep(0.5, 0.32, r) * mix(1.0, 0.5, smoothstep(0.18, 0.28, r));
  }
  gl_FragColor = vec4(uColor * a, a);
}`

const compile = (gl, vs, fs) => {
  const program = gl.createProgram()
  ;[
    [gl.VERTEX_SHADER, vs],
    [gl.FRAGMENT_SHADER, fs],
  ].forEach(([type, src]) => {
    const shader = gl.createShader(type)
    gl.shaderSource(shader, src)
    gl.compileShader(shader)
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader))
    gl.attachShader(program, shader)
  })
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program))
  const uniforms = {}
  const attrs = {}
  return {
    program,
    loc: name => (name in uniforms ? uniforms[name] : (uniforms[name] = gl.getUniformLocation(program, name))),
    attr: name => (name in attrs ? attrs[name] : (attrs[name] = gl.getAttribLocation(program, name))),
  }
}

const parseColor = (value, fallback) => {
  const m = /^#?([0-9a-f]{6})$/i.exec((value || "").trim())
  const hex = m ? m[1] : fallback
  return [0, 2, 4].map(i => parseInt(hex.slice(i, i + 2), 16) / 255)
}

const readTheme = () => {
  const root = document.documentElement
  const cs = getComputedStyle(root)
  return {
    light: root.dataset.theme === "light",
    ink: parseColor(cs.getPropertyValue("--text"), "ecebe7"),
    accent: parseColor(cs.getPropertyValue("--accent"), "ee8a4f"),
  }
}

// variant "hero" frames the terrain to the right of the hero copy; "wide" fills a full-width frame.
export function createTerrainScene(canvas, { reducedMotion = false, onStatus, variant = "hero" } = {}) {
  const wide = variant === "wide"
  const gl = canvas.getContext("webgl", {
    antialias: false,
    alpha: true,
    premultipliedAlpha: true,
    powerPreference: "low-power",
  })
  if (!gl) throw new Error("WebGL unavailable")

  const width = () => canvas.clientWidth || 1
  const height = () => canvas.clientHeight || 1
  const small = width() < 640
  let pixelRatio = Math.min(window.devicePixelRatio || 1, small ? 1.5 : 1.75)

  const terrainProg = compile(gl, TERRAIN_VS, TERRAIN_FS)
  const simpleProg = compile(gl, SIMPLE_VS, SIMPLE_FS)

  /* ---- Terrain buffers ---- */
  const NX = small ? 104 : 150
  const NZ = small ? 68 : 98
  const count = NX * NZ
  const positions = new Float32Array(count * 3)
  const seen = new Float32Array(count)
  const rand = new Float32Array(count)
  for (let iz = 0; iz < NZ; iz++) {
    for (let ix = 0; ix < NX; ix++) {
      const i = iz * NX + ix
      // Slight jitter breaks the grid so it reads as survey data, not a mesh.
      const x = (ix / (NX - 1) - 0.5) * SIZE_X + (hash(ix, iz) - 0.5) * 0.05
      const z = (iz / (NZ - 1) - 0.5) * SIZE_Z + (hash(iz, ix) - 0.5) * 0.05
      positions[i * 3] = x
      positions[i * 3 + 1] = heightAt(x, z)
      positions[i * 3 + 2] = z
      rand[i] = hash(ix * 3.1, iz * 7.7)
    }
  }

  const makeBuffer = (data, usage = gl.STATIC_DRAW) => {
    const b = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, b)
    gl.bufferData(gl.ARRAY_BUFFER, data, usage)
    return b
  }
  const posBuf = makeBuffer(positions)
  const seenBuf = makeBuffer(seen, gl.DYNAMIC_DRAW)
  const randBuf = makeBuffer(rand)

  /* ---- UAV overlays: ring, beam, trail, marker ---- */
  const RING_SEG = 56
  const FOOT_R = 0.62
  const TRAIL = 160
  const makeOverlay = (n, alphaFn) => {
    const pos = new Float32Array(n * 3)
    const alpha = new Float32Array(n).map((_, i) => alphaFn(i))
    return { n, pos, posBuf: makeBuffer(pos, gl.DYNAMIC_DRAW), alphaBuf: makeBuffer(alpha) }
  }
  const ring = makeOverlay(RING_SEG, () => 1)
  const beam = makeOverlay(2, i => (i === 0 ? 1 : 0.1))
  const trail = makeOverlay(TRAIL, i => (i / (TRAIL - 1)) ** 1.6)
  const marker = makeOverlay(1, () => 1)

  /* ---- Uniform state ---- */
  let theme = readTheme()
  const hazardsU = new Float32Array(16)
  const resolvedU = new Float32Array(4)
  let view = lookAt([0, 6, 11], [0, 0, 0])
  let proj = perspective((34 * Math.PI) / 180, width() / height(), 0.1, 60)

  /* ---- Mission state ---- */
  const ALT = 1.25
  const pos = wide ? [-4.6, 0, 2.4] : [4.8, 0, 2.6]
  pos[1] = heightAt(pos[0], pos[2]) + ALT
  const vel = [0, 0]
  const trailPts = Array.from({ length: TRAIL }, () => pos.slice())
  let rng = mulberry(7)
  let hazards = []
  let budget = 1
  let phase = "transit"
  let hoverT = 0
  let current = null
  let cycleRest = 0

  const spawnHazards = () => {
    hazards = []
    for (let i = 0; i < 4; i++) {
      let x
      let z
      let tries = 0
      do {
        // Hazards stay on the right two-thirds, clear of the hero copy on wide screens.
        x = wide ? (rng() - 0.5) * (SIZE_X - 4) : -1.6 + rng() * 6.6
        z = (rng() - 0.5) * (SIZE_Z - 2.8)
        tries++
      } while (tries < 30 && hazards.some(h => Math.hypot(h.x - x, h.z - z) < 2.2))
      hazards.push({ x, z, r: 0.55 + rng() * 0.45, risk: 0.45 + rng() * 0.55, resolved: 0, target: 0, done: false })
    }
    hazards.forEach((h, i) => hazardsU.set([h.x, h.z, h.r, h.risk], i * 4))
  }
  spawnHazards()

  // The toy policy: value = risk discounted by travel cost.
  const chooseNext = () => {
    let best = null
    let bestScore = -Infinity
    hazards.forEach(h => {
      if (h.done) return
      const score = h.risk - 0.09 * Math.hypot(h.x - pos[0], h.z - pos[2])
      if (score > bestScore) {
        bestScore = score
        best = h
      }
    })
    return best
  }

  // Mark the points under the footprint as seen, and upload only those rows.
  const markSeen = time => {
    const fx = Math.round((pos[0] / SIZE_X + 0.5) * (NX - 1))
    const fz = Math.round((pos[2] / SIZE_Z + 0.5) * (NZ - 1))
    const rx = Math.ceil((FOOT_R / SIZE_X) * (NX - 1))
    const rz = Math.ceil((FOOT_R / SIZE_Z) * (NZ - 1))
    const z0 = Math.max(0, fz - rz)
    const z1 = Math.min(NZ - 1, fz + rz)
    const x0 = Math.max(0, fx - rx)
    const x1 = Math.min(NX - 1, fx + rx)
    if (z0 > z1 || x0 > x1) return
    for (let iz = z0; iz <= z1; iz++) {
      for (let ix = x0; ix <= x1; ix++) {
        const i = iz * NX + ix
        const dx = positions[i * 3] - pos[0]
        const dz = positions[i * 3 + 2] - pos[2]
        if (dx * dx + dz * dz < FOOT_R * FOOT_R) seen[i] = time
      }
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, seenBuf)
    gl.bufferSubData(gl.ARRAY_BUFFER, z0 * NX * 4, seen.subarray(z0 * NX, (z1 + 1) * NX))
  }

  const uploadOverlays = () => {
    const ground = heightAt(pos[0], pos[2])
    for (let i = 0; i < RING_SEG; i++) {
      const a = (i / RING_SEG) * Math.PI * 2
      const x = pos[0] + Math.cos(a) * FOOT_R
      const z = pos[2] + Math.sin(a) * FOOT_R
      ring.pos.set([x, heightAt(x, z) + 0.03, z], i * 3)
    }
    beam.pos.set([pos[0], pos[1], pos[2], pos[0], ground + 0.03, pos[2]])
    for (let i = 0; i < TRAIL; i++) trail.pos.set(trailPts[i], i * 3)
    marker.pos.set(pos)
    ;[ring, beam, trail, marker].forEach(o => {
      gl.bindBuffer(gl.ARRAY_BUFFER, o.posBuf)
      gl.bufferSubData(gl.ARRAY_BUFFER, 0, o.pos)
    })
  }

  let lastStatus = ""
  const report = () => {
    if (!onStatus) return
    const resolved = hazards.filter(h => h.done).length
    const key = `${resolved}|${Math.round(budget * 100)}`
    if (key !== lastStatus) {
      lastStatus = key
      onStatus({ resolved, total: hazards.length, budget })
    }
  }

  const step = (dt, time) => {
    if (phase === "rest") {
      cycleRest -= dt
      if (cycleRest <= 0) {
        rng = mulberry(Math.floor(time * 1000))
        spawnHazards()
        hazards.forEach(h => {
          h.resolved = 1
          h.target = 0
        })
        budget = 1
        phase = "transit"
      }
    }
    if (phase === "transit" && (!current || current.done)) {
      current = chooseNext()
      if (!current) {
        phase = "rest"
        cycleRest = 3.5
      }
    }

    // Steer toward the target, or drift in a lazy survey pattern while resting.
    const gx = current && phase !== "rest" ? current.x : (wide ? 0 : 1.8) + Math.sin(time * 0.15) * 3
    const gz = current && phase !== "rest" ? current.z : Math.cos(time * 0.11) * 2.2
    const tx = gx - pos[0]
    const tz = gz - pos[2]
    const dist = Math.hypot(tx, tz) || 1e-6
    const speed = Math.min(1.15, dist * 1.4)
    const k = Math.min(1, dt * 1.6)
    vel[0] += ((tx / dist) * speed - vel[0]) * k
    vel[1] += ((tz / dist) * speed - vel[1]) * k
    pos[0] += vel[0] * dt
    pos[2] += vel[1] * dt
    pos[1] += (heightAt(pos[0], pos[2]) + ALT - pos[1]) * Math.min(1, dt * 3)

    if (phase !== "rest") budget = Math.max(0.05, budget - dt * 0.012)
    if (phase === "transit" && current && dist < 0.22) {
      phase = "inspect"
      hoverT = 1.4
    }
    if (phase === "inspect") {
      hoverT -= dt
      current.target = 1
      if (hoverT <= 0) {
        current.done = true
        current = null
        phase = "transit"
      }
    }

    hazards.forEach((h, i) => {
      h.resolved += (h.target - h.resolved) * Math.min(1, dt * 1.3)
      resolvedU[i] = h.resolved
    })

    const oldest = trailPts.shift()
    oldest[0] = pos[0]
    oldest[1] = pos[1]
    oldest[2] = pos[2]
    trailPts.push(oldest)
    markSeen(time)
    report()
  }

  /* ---- Camera with gentle orbit and pointer parallax ---- */
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 }
  const onPointer = e => {
    pointer.tx = (e.clientX / window.innerWidth - 0.5) * 2
    pointer.ty = (e.clientY / window.innerHeight - 0.5) * 2
  }
  if (!reducedMotion) window.addEventListener("pointermove", onPointer, { passive: true })

  const placeCamera = time => {
    pointer.x += (pointer.tx - pointer.x) * 0.04
    pointer.y += (pointer.ty - pointer.y) * 0.04
    const orbit = reducedMotion ? 0 : Math.sin(time * 0.05) * 0.12
    const angle = -0.62 + orbit + pointer.x * 0.08
    const radius = wide ? (small ? 11.5 : 10.2) : small ? 13.2 : 12.4
    const elev = (wide ? 6.4 : 7.4) - pointer.y * 0.5
    const target = wide ? [0, -0.9, 0.4] : [0.9, -1.1, 0.2]
    view = lookAt([Math.sin(angle) * radius, elev, Math.cos(angle) * radius], target)
  }

  /* ---- Drawing ---- */
  const bindAttr = (prog, name, buf, size) => {
    const loc = prog.attr(name)
    if (loc < 0) return
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0)
  }
  const unbindAttrs = (prog, names) =>
    names.forEach(n => {
      const loc = prog.attr(n)
      if (loc >= 0) gl.disableVertexAttribArray(loc)
    })

  let elapsed = 0
  let running = false

  const render = () => {
    uploadOverlays()
    gl.viewport(0, 0, canvas.width, canvas.height)
    gl.clearColor(0, 0, 0, 0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.disable(gl.DEPTH_TEST)
    gl.enable(gl.BLEND)
    // Premultiplied output: additive glow on dark, normal "ink" compositing on light.
    if (theme.light) gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)
    else gl.blendFunc(gl.ONE, gl.ONE)

    const t = terrainProg
    gl.useProgram(t.program)
    gl.uniformMatrix4fv(t.loc("uView"), false, view)
    gl.uniformMatrix4fv(t.loc("uProj"), false, proj)
    gl.uniform1f(t.loc("uTime"), elapsed)
    gl.uniform1f(t.loc("uSize"), small ? 2.1 : 2.3)
    gl.uniform1f(t.loc("uPixelRatio"), pixelRatio)
    gl.uniform4fv(t.loc("uHazards"), hazardsU)
    gl.uniform1fv(t.loc("uResolved"), resolvedU)
    gl.uniform3fv(t.loc("uInk"), theme.ink)
    gl.uniform3fv(t.loc("uAccent"), theme.accent)
    gl.uniform1f(t.loc("uAlpha"), theme.light ? 2.6 : 0.62)
    bindAttr(t, "aPos", posBuf, 3)
    bindAttr(t, "aSeen", seenBuf, 1)
    bindAttr(t, "aRand", randBuf, 1)
    gl.drawArrays(gl.POINTS, 0, count)
    unbindAttrs(t, ["aPos", "aSeen", "aRand"])

    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)
    const s = simpleProg
    gl.useProgram(s.program)
    gl.uniformMatrix4fv(s.loc("uView"), false, view)
    gl.uniformMatrix4fv(s.loc("uProj"), false, proj)
    gl.uniform3fv(s.loc("uColor"), theme.ink)
    const draw = (o, mode, opacity, round = 0, pointSize = 1) => {
      gl.uniform1f(s.loc("uOpacity"), opacity)
      gl.uniform1f(s.loc("uRound"), round)
      gl.uniform1f(s.loc("uPointSize"), pointSize)
      bindAttr(s, "aPos", o.posBuf, 3)
      bindAttr(s, "aAlpha", o.alphaBuf, 1)
      gl.drawArrays(mode, 0, o.n)
    }
    draw(trail, gl.LINE_STRIP, 0.5)
    draw(ring, gl.LINE_LOOP, 0.55)
    draw(beam, gl.LINES, 0.35)
    draw(marker, gl.POINTS, 1, 1, 9 * pixelRatio)
    unbindAttrs(s, ["aPos", "aAlpha"])
  }

  const resize = () => {
    canvas.width = Math.round(width() * pixelRatio)
    canvas.height = Math.round(height() * pixelRatio)
    proj = perspective((34 * Math.PI) / 180, width() / height(), 0.1, 60)
    if (!running) render()
  }

  /* ---- Loop ---- */
  let raf = 0
  let last = 0
  let slowFrames = 0

  const frame = now => {
    if (!running) return
    raf = requestAnimationFrame(frame)
    const dt = Math.min(0.05, (now - last) / 1000 || 0.016)
    last = now

    // Adaptive quality: if frames are consistently slow, drop to 1x pixels once.
    if (dt > 0.03 && pixelRatio > 1) {
      if (++slowFrames > 45) {
        pixelRatio = 1
        resize()
      }
    } else slowFrames = Math.max(0, slowFrames - 1)

    elapsed += dt
    step(dt, elapsed)
    placeCamera(elapsed)
    render()
  }

  const start = () => {
    if (running || reducedMotion) return
    running = true
    last = performance.now()
    raf = requestAnimationFrame(frame)
  }
  const stop = () => {
    running = false
    cancelAnimationFrame(raf)
  }

  const setTheme = () => {
    theme = readTheme()
    if (!running) render()
  }

  const onLost = e => {
    e.preventDefault()
    stop()
  }
  canvas.addEventListener("webglcontextlost", onLost)

  // Warm up so the first frame already has a trail. With reduced motion, simulate
  // a longer stretch and leave a single still frame.
  const warm = reducedMotion ? 360 : 120
  for (let i = 0; i < warm; i++) {
    elapsed += 1 / 30
    step(1 / 30, elapsed)
  }
  placeCamera(elapsed)
  resize()

  const dispose = () => {
    stop()
    window.removeEventListener("pointermove", onPointer)
    canvas.removeEventListener("webglcontextlost", onLost)
    ;[posBuf, seenBuf, randBuf, ...[ring, beam, trail, marker].flatMap(o => [o.posBuf, o.alphaBuf])].forEach(b =>
      gl.deleteBuffer(b),
    )
    gl.deleteProgram(terrainProg.program)
    gl.deleteProgram(simpleProg.program)
  }

  return { start, stop, resize, setTheme, dispose }
}
