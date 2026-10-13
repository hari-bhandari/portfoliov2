import React from "react"
import styled from "styled-components"

const COL_W = 196
const ROW_H = 92
const BOX_W = 156
const BOX_H = 58
const PAD = 16

const kindStyle = {
  client: { stroke: "var(--line-strong)", fill: "var(--surface)" },
  service: { stroke: "var(--text-faint)", fill: "var(--surface)" },
  domain: { stroke: "var(--line-strong)", fill: "var(--surface-2)" },
  data: { stroke: "var(--line-strong)", fill: "var(--bg-soft)", dashed: true },
  external: { stroke: "var(--line-strong)", fill: "var(--bg-soft)", dashed: true },
  ai: { stroke: "var(--accent)", fill: "var(--accent-soft)" },
  human: { stroke: "var(--live)", fill: "var(--surface)" },
}

const Svg = styled.svg`
  width: 100%;
  height: auto;
  overflow: visible;
  font-family: var(--font-sans);

  .edge {
    fill: none;
    stroke: var(--text-faint);
    stroke-width: 1.2;
    opacity: 0.55;
  }
  .flow {
    fill: none;
    stroke: var(--accent);
    stroke-width: 1.4;
    stroke-dasharray: 3 14;
    opacity: 0;
    transition: opacity 0.6s var(--ease);
  }
  /* Data flows along the edges a few times, then settles, so nothing loops forever. */
  &[data-animate="true"] .flow {
    opacity: 0.6;
    animation: flow 3.2s linear 0.8s 3 both;
  }
  @keyframes flow {
    to {
      stroke-dashoffset: -34;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    &[data-animate="true"] .flow {
      animation: none;
      opacity: 0;
    }
  }

  .label {
    font-size: 13px;
    font-weight: 600;
    fill: var(--text);
  }
  .sub {
    font-family: var(--font-mono);
    font-size: 10px;
    fill: var(--text-muted);
  }
`

const anchor = (n, side) => {
  const x = PAD + n.col * COL_W
  const y = PAD + n.row * ROW_H
  switch (side) {
    case "right":
      return [x + BOX_W, y + BOX_H / 2]
    case "left":
      return [x, y + BOX_H / 2]
    case "top":
      return [x + BOX_W / 2, y]
    default:
      return [x + BOX_W / 2, y + BOX_H]
  }
}

const edgePath = (a, b) => {
  if (a.col === b.col) {
    const down = b.row > a.row
    const [x1, y1] = anchor(a, down ? "bottom" : "top")
    const [x2, y2] = anchor(b, down ? "top" : "bottom")
    return `M${x1},${y1} L${x2},${y2}`
  }
  const forward = b.col > a.col
  const [x1, y1] = anchor(a, forward ? "right" : "left")
  const [x2, y2] = anchor(b, forward ? "left" : "right")
  const mx = (x1 + x2) / 2
  return `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`
}

const Diagram = ({ diagram, animate = false, className }) => {
  if (!diagram) return null
  const byId = Object.fromEntries(diagram.nodes.map(n => [n.id, n]))
  const w = PAD * 2 + (diagram.cols - 1) * COL_W + BOX_W
  const h = PAD * 2 + (diagram.rows - 1) * ROW_H + BOX_H

  return (
    <Svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label={diagram.title} data-animate={animate} className={className}>
      <title>{diagram.title}</title>
      {diagram.edges.map(([from, to]) => {
        const d = edgePath(byId[from], byId[to])
        return (
          <g key={`${from}-${to}`}>
            <path className="edge" d={d} />
            <path className="flow" d={d} />
          </g>
        )
      })}
      {diagram.nodes.map(n => {
        const s = kindStyle[n.kind] || kindStyle.service
        const x = PAD + n.col * COL_W
        const y = PAD + n.row * ROW_H
        return (
          <g key={n.id} transform={`translate(${x} ${y})`}>
            <rect
              width={BOX_W}
              height={BOX_H}
              rx="10"
              fill={s.fill}
              stroke={s.stroke}
              strokeDasharray={s.dashed ? "4 4" : undefined}
            />
            <text className="label" x="14" y="25">
              {n.label}
            </text>
            {n.sub && (
              <text className="sub" x="14" y="43">
                {n.sub}
              </text>
            )}
          </g>
        )
      })}
    </Svg>
  )
}

export const DiagramLegend = styled(({ className }) => (
  <ul className={className} aria-label="Diagram key">
    <li data-k="ai">AI component</li>
    <li data-k="human">Human decision</li>
    <li data-k="data">Data store</li>
  </ul>
))`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--text-faint);

  li {
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
  li::before {
    content: "";
    width: 12px;
    height: 8px;
    border-radius: 2px;
    border: 1px solid var(--line-strong);
  }
  li[data-k="ai"]::before {
    border-color: var(--accent);
    background: var(--accent-soft);
  }
  li[data-k="human"]::before {
    border-color: var(--live);
  }
  li[data-k="data"]::before {
    border-style: dashed;
  }
`

export default Diagram
