import React from "react"
import styled from "styled-components"
import experience from "../content/experience.json"
import { bp } from "./ui"

const Wrap = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 2fr);
  gap: 40px;
  align-items: start;

  ${bp.md} {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`

const Company = styled.div`
  display: grid;
  gap: 8px;

  h3 {
    font-family: var(--font-display);
    font-weight: 400;
    font-size: clamp(26px, 2.6vw, 32px);
    letter-spacing: -0.015em;
    line-height: 1.15;
  }
  p {
    color: var(--text-muted);
    font-size: 16px;
  }
  span {
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--text-faint);
  }
`

const List = styled.ol`
  list-style: none;
  border-top: 1px solid var(--line);

  li {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 8px 24px;
    flex-wrap: wrap;
    padding: 20px 0;
    border-bottom: 1px solid var(--line);
  }
  h4 {
    font-size: 18px;
    font-weight: 500;
  }
  time {
    font-family: var(--font-mono);
    font-size: 13px;
    color: var(--text-muted);
  }
  li[data-current="true"] h4::after {
    content: "Current";
    margin-left: 12px;
    padding: 3px 8px;
    border-radius: 999px;
    font-family: var(--font-mono);
    font-size: 11px;
    font-weight: 400;
    vertical-align: 2px;
    color: var(--accent);
    background: var(--accent-soft);
  }
`

const Roles = () => (
  <Wrap>
    <Company data-reveal>
      <span>{experience.period}</span>
      <h3>{experience.company}</h3>
      <p>{experience.summary}</p>
    </Company>
    <List data-reveal style={{ "--i": 1 }}>
      {experience.roles.map(r => (
        <li key={r.title} data-current={!!r.current}>
          <h4>{r.title}</h4>
          <time>{r.period}</time>
        </li>
      ))}
    </List>
  </Wrap>
)

export default Roles
