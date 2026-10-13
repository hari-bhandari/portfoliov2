import React from "react"
import styled from "styled-components"
import { Arrow, Tag, Tags, bp } from "./ui"
import { useTilt } from "../hooks/motion"

/* ---------- Publications ---------- */

const PubCard = styled.article`
  --rx: 0deg;
  --ry: 0deg;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: clamp(24px, 3vw, 36px);
  border-radius: var(--radius);
  background: var(--surface);
  border: 1px solid var(--line);
  transform: perspective(1200px) rotateX(var(--rx)) rotateY(var(--ry));
  transition:
    transform 0.6s var(--ease),
    border-color 0.4s var(--ease);

  &:hover {
    border-color: var(--line-strong);
  }

  h3 {
    font-family: var(--font-display);
    font-weight: 400;
    font-size: clamp(22px, 2.2vw, 27px);
    line-height: 1.2;
    letter-spacing: -0.015em;
  }

  .authors {
    font-size: 15px;
    color: var(--text-muted);
  }
  .authors b {
    color: var(--text);
    font-weight: 500;
  }
  .summary {
    color: var(--text-muted);
    font-size: 16px;
  }
  .links {
    margin-top: auto;
    padding-top: 8px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px 20px;
    font-size: 15px;
  }
  .links a {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-weight: 500;
    border-bottom: 1px solid var(--line-strong);
    padding-bottom: 1px;
    transition:
      color 0.3s var(--ease),
      border-color 0.3s var(--ease);
  }
  .links a:hover {
    color: var(--accent);
    border-color: var(--accent);
  }
`

const Venue = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.04em;
  color: var(--text-faint);

  span:first-child {
    color: var(--accent);
  }
`

export const PublicationCard = ({ pub, showSummary = true, index = 0 }) => {
  const tilt = useTilt(1.5)
  return (
    <div data-reveal style={{ "--i": index, height: "100%" }}>
      <PubCard ref={tilt}>
        <Venue>
          <span>{pub.type}</span>
          <span>{pub.year}</span>
        </Venue>
        <h3>{pub.title}</h3>
        <p className="authors">
          {pub.authors.map((a, i) => (
            <React.Fragment key={a}>
              {i > 0 && " and "}
              {a === "Hari Bhandari" ? <b>{a}</b> : a}
            </React.Fragment>
          ))}
          <br />
          <em>{pub.venue}</em>
          {pub.detail ? `, ${pub.detail}` : ""}
        </p>
        {showSummary && <p className="summary">{pub.summary}</p>}
        {showSummary && (
          <Tags>
            {pub.themes.map(t => (
              <Tag key={t}>{t}</Tag>
            ))}
          </Tags>
        )}
        <div className="links">
          <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noopener noreferrer">
            DOI {pub.doi} <Arrow dir="upRight" size={13} />
          </a>
          {pub.pdf && (
            <a href={pub.pdf} target="_blank" rel="noopener noreferrer">
              Author copy (PDF) <Arrow dir="upRight" size={13} />
            </a>
          )}
        </div>
      </PubCard>
    </div>
  )
}

export const PubGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;

  ${bp.md} {
    grid-template-columns: 1fr;
  }
`

/* ---------- Inspection loop ---------- */

const Loop = styled.ol`
  list-style: none;
  counter-reset: step;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  border: 1px solid var(--line);
  border-radius: var(--radius);
  overflow: hidden;
  background: var(--surface);

  ${bp.md} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  ${bp.sm} {
    grid-template-columns: 1fr;
  }

  li {
    counter-increment: step;
    position: relative;
    padding: 24px 22px 26px;
    border-right: 1px solid var(--line);
    display: grid;
    gap: 6px;
    align-content: start;
  }
  li:last-child {
    border-right: 0;
  }
  ${bp.md} {
    li:nth-child(2) {
      border-right: 0;
    }
    li:nth-child(-n + 2) {
      border-bottom: 1px solid var(--line);
    }
  }
  ${bp.sm} {
    li {
      border-right: 0;
      border-bottom: 1px solid var(--line);
    }
    li:last-child {
      border-bottom: 0;
    }
  }

  li::before {
    content: "0" counter(step);
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--text-faint);
    margin-bottom: 18px;
  }
  li[data-key="true"]::before {
    color: var(--accent);
  }
  li::after {
    content: "";
    position: absolute;
    top: 30px;
    right: 22px;
    width: 28px;
    height: 1px;
    background: var(--line-strong);
  }
  li:last-child::after {
    content: "↺";
    width: auto;
    height: auto;
    top: 20px;
    background: none;
    color: var(--text-faint);
    font-size: 15px;
  }

  h3 {
    font-size: 17px;
  }
  p {
    font-size: 15px;
    color: var(--text-muted);
  }
`

export const InspectionLoop = ({ steps }) => (
  <Loop aria-label="SafeScout decision loop" data-reveal>
    {steps.map((s, i) => (
      <li key={s.title} data-key={i === 2 || i === 3}>
        <h3>{s.title}</h3>
        <p>{s.body}</p>
      </li>
    ))}
  </Loop>
)

/* ---------- Roadmap ---------- */

const RoadmapList = styled.ol`
  list-style: none;
  display: grid;
  gap: 0;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    left: 7px;
    top: 10px;
    bottom: 10px;
    width: 1px;
    background: linear-gradient(var(--accent), var(--line) 22%);
  }

  li {
    position: relative;
    display: grid;
    grid-template-columns: 220px 1fr auto;
    gap: 8px 32px;
    padding: 20px 0 20px 40px;
    border-bottom: 1px solid var(--line);
    align-items: baseline;

    ${bp.md} {
      grid-template-columns: 1fr auto;
    }
  }
  li:last-child {
    border-bottom: 0;
  }
  li::before {
    content: "";
    position: absolute;
    left: 2px;
    top: 27px;
    width: 11px;
    height: 11px;
    border-radius: 50%;
    border: 1px solid var(--line-strong);
    background: var(--bg);
  }
  li[data-state="now"]::before {
    border-color: var(--accent);
    background: var(--accent);
    box-shadow: 0 0 0 5px var(--accent-soft);
  }
  h3 {
    font-size: 17px;
  }
  p {
    color: var(--text-muted);
    font-size: 16px;
    ${bp.md} {
      grid-column: 1 / -1;
      grid-row: 2;
    }
  }
  span {
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--text-faint);
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
  li[data-state="now"] span {
    color: var(--accent);
  }
`

export const Roadmap = ({ items }) => (
  <RoadmapList>
    {items.map((r, i) => (
      <li key={r.phase} data-state={r.state} data-reveal style={{ "--i": i }}>
        <h3>{r.phase}</h3>
        <p>{r.body}</p>
        <span>{r.state === "now" ? "Now" : "Planned"}</span>
      </li>
    ))}
  </RoadmapList>
)

export const Note = styled.aside`
  display: flex;
  gap: 14px;
  padding: 18px 20px;
  border-radius: var(--radius-sm);
  border: 1px dashed var(--line-strong);
  color: var(--text-muted);
  font-size: 15px;
  line-height: 1.55;

  &::before {
    content: "i";
    flex: none;
    width: 20px;
    height: 20px;
    display: grid;
    place-items: center;
    border-radius: 50%;
    border: 1px solid var(--line-strong);
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--text-faint);
    margin-top: 1px;
  }
`
