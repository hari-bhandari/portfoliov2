// Regenerates the favicon source and the Open Graph image from the logo mark.
// Usage: node scripts/make-assets.mjs
import { readFileSync } from "node:fs"
import sharp from "sharp"

const BG = "#0c0d0f"
const INK = "#ecebe7"
const MUTED = "#a5a49e"
const ACCENT = "#ee8a4f"

const logoSrc = readFileSync(new URL("../src/components/LogoMark.js", import.meta.url), "utf8")
const paths = [...logoSrc.matchAll(/<path d="([^"]+)" fill="([^"]+)"/g)]
  .map(([, d, fill]) => `<path d="${d}" fill="${fill === "currentColor" ? INK : ACCENT}"/>`)
  .join("")

const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="112" fill="${BG}"/>
  <g transform="translate(106 106) scale(${300 / 747})">${paths}</g>
</svg>`

await sharp(Buffer.from(icon))
  .png()
  .toFile(new URL("../src/images/icon.png", import.meta.url).pathname)

// Contour lines echo the terrain scene on the site.
const contours = Array.from({ length: 9 }, (_, i) => {
  const y = 380 + i * 34
  const amp = 26 + i * 3
  return `<path d="M520 ${y} C 700 ${y - amp}, 820 ${y + amp}, 980 ${y - amp * 0.4} S 1180 ${y + amp * 0.6}, 1240 ${y}" fill="none" stroke="${INK}" stroke-opacity="${0.05 + i * 0.012}" stroke-width="1.2"/>`
}).join("")

const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${BG}"/>
  ${contours}
  <circle cx="930" cy="438" r="70" fill="${ACCENT}" fill-opacity="0.10"/>
  <circle cx="930" cy="438" r="4" fill="${ACCENT}"/>
  <g transform="translate(80 78) scale(${44 / 747})">${paths}</g>
  <text x="142" y="110" font-family="Noto Serif, Liberation Serif, serif" font-size="30" fill="${INK}">Hari Bhandari</text>
  <text x="80" y="300" font-family="Noto Serif, Liberation Serif, serif" font-size="72" fill="${INK}" letter-spacing="-1.5">Researching safer AI.</text>
  <text x="80" y="384" font-family="Noto Serif, Liberation Serif, serif" font-style="italic" font-size="72" fill="${MUTED}" letter-spacing="-1.5">Building dependable software.</text>
  <text x="80" y="548" font-family="Liberation Mono, monospace" font-size="20" fill="${MUTED}" letter-spacing="2">PHD RESEARCHER IN SAFE AI · SOFTWARE ENGINEER</text>
  <rect x="80" y="520" width="28" height="1.5" fill="${ACCENT}"/>
</svg>`

await sharp(Buffer.from(og))
  .png({ compressionLevel: 9 })
  .toFile(new URL("../static/og.png", import.meta.url).pathname)

console.log("Wrote src/images/icon.png and static/og.png")
