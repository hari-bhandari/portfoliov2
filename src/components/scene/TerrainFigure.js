import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { prefersReducedMotion } from "../../hooks/motion"

const Figure = styled.figure`
  position: relative;
  margin: 0;
  width: 100%;
  height: 100%;

  canvas {
    width: 100%;
    height: 100%;
    opacity: 0;
    transform: scale(1.03);
    transition:
      opacity 1.2s var(--ease),
      transform 1.6s var(--ease);
  }
  &[data-ready="true"] canvas {
    opacity: 1;
    transform: none;
  }
`

const Hud = styled.figcaption`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 18px;
  white-space: nowrap;
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-faint);
  pointer-events: none;
  opacity: 0;
  transition: opacity 1.2s var(--ease) 0.6s;

  [data-ready="true"] > & {
    opacity: 1;
  }

  b {
    font-weight: 500;
    color: var(--text-muted);
  }
  i {
    font-style: normal;
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }
  i::before {
    content: "";
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--accent);
  }
`

const Meter = styled.span`
  display: inline-block;
  width: 56px;
  height: 2px;
  background: var(--line-strong);
  position: relative;
  vertical-align: middle;
  margin-left: 6px;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    transform-origin: left;
    transform: scaleX(var(--v, 1));
    background: var(--text-muted);
    transition: transform 0.6s linear;
  }
`

/**
 * Lazy-loads the WebGL scene once the browser is idle and the figure is near
 * the viewport, then runs it only while visible. Falls back to nothing (the
 * page is complete without it) if WebGL is unavailable.
 */
const TerrainFigure = ({ className, showHud = true, label, variant = "hero" }) => {
  const figureRef = useRef(null)
  const canvasRef = useRef(null)
  const [ready, setReady] = useState(false)
  const [status, setStatus] = useState(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const figure = figureRef.current
    if (!canvas || !figure || !window.WebGLRenderingContext) return undefined

    let cancelled = false
    let scene = null
    let visible = false
    const cleanups = []
    const reduced = prefersReducedMotion()

    const sync = () => {
      if (!scene) return
      if (visible && !document.hidden) scene.start()
      else scene.stop()
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible && !scene) load()
        sync()
      },
      { rootMargin: "120px" },
    )

    const load = () => {
      if (load.started) return
      load.started = true
      const idle = window.requestIdleCallback || (cb => setTimeout(cb, 200))
      idle(
        () => {
          import("./terrainScene").then(({ createTerrainScene }) => {
            if (cancelled) return
            try {
              scene = createTerrainScene(canvas, {
                reducedMotion: reduced,
                variant,
                onStatus: showHud ? setStatus : undefined,
              })
            } catch (e) {
              // The page is complete without the scene, so fail quietly.
              return
            }
            setReady(true)
            sync()
          })
        },
        { timeout: 1500 },
      )
    }

    io.observe(figure)
    cleanups.push(() => io.disconnect())

    const onVisibility = () => sync()
    document.addEventListener("visibilitychange", onVisibility)
    cleanups.push(() => document.removeEventListener("visibilitychange", onVisibility))

    const ro = new ResizeObserver(() => scene && scene.resize())
    ro.observe(canvas)
    cleanups.push(() => ro.disconnect())

    const mo = new MutationObserver(() => scene && scene.setTheme())
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] })
    cleanups.push(() => mo.disconnect())

    return () => {
      cancelled = true
      cleanups.forEach(fn => fn())
      if (scene) scene.dispose()
    }
  }, [showHud, variant])

  return (
    <Figure ref={figureRef} className={className} data-ready={ready}>
      <canvas ref={canvasRef} aria-hidden="true" />
      <span className="visually-hidden">{label}</span>
      {showHud && (
        <Hud aria-hidden="true">
          <span>Illustrative simulation</span>
          <i>Uncertain, high-consequence</i>
          {status && (
            <>
              <span>
                Inspected{" "}
                <b>
                  {status.resolved}/{status.total}
                </b>
              </span>
              <span>
                Flight budget <Meter style={{ "--v": status.budget }} />
              </span>
            </>
          )}
        </Hud>
      )}
    </Figure>
  )
}

export default TerrainFigure
