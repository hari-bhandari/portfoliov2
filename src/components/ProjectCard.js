import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import Diagram from "./Diagram"
import { Arrow, Status, bp } from "./ui"
import { useTilt } from "../hooks/motion"

const Card = styled.article`
  --rx: 0deg;
  --ry: 0deg;
  position: relative;
  height: 100%;
  border-radius: var(--radius);
  background: var(--surface);
  border: 1px solid var(--line);
  box-shadow: var(--shadow);
  overflow: hidden;
  transform: perspective(1200px) rotateX(var(--rx)) rotateY(var(--ry));
  transition:
    transform 0.6s var(--ease),
    border-color 0.4s var(--ease);
  will-change: transform;

  &:hover,
  &:focus-within {
    border-color: var(--line-strong);
  }

  /* A soft light that follows the pointer, kept very faint. */
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: radial-gradient(
      500px circle at var(--mx, 50%) var(--my, 0%),
      color-mix(in srgb, var(--text) 5%, transparent),
      transparent 45%
    );
    opacity: 0;
    transition: opacity 0.5s var(--ease);
  }
  &:hover::after {
    opacity: 1;
  }

  display: grid;
  grid-template-columns: ${p => (p.$wide ? "minmax(0, 0.9fr) minmax(0, 1.1fr)" : "1fr")};

  ${bp.md} {
    grid-template-columns: 1fr;
  }
`

const Body = styled.div`
  padding: clamp(24px, 3vw, 36px);
  display: flex;
  flex-direction: column;
  gap: 14px;

  h3 {
    font-family: var(--font-display);
    font-weight: 400;
    font-size: ${p => (p.$wide ? "clamp(30px, 3.4vw, 42px)" : "clamp(26px, 2.6vw, 32px)")};
    letter-spacing: -0.02em;
    line-height: 1.1;
  }

  p {
    color: var(--text-muted);
    max-width: 46ch;
  }
`

const Meta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-faint);
  letter-spacing: 0.04em;
`

const More = styled.span`
  margin-top: auto;
  padding-top: 12px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  font-size: 15px;
  color: var(--text);

  svg {
    transition: transform 0.4s var(--ease);
  }
  article:hover & svg {
    transform: translateX(4px);
  }
`

const Stage = styled.div`
  position: relative;
  min-height: ${p => (p.$wide ? "340px" : "230px")};
  display: grid;
  place-items: center;
  padding: 28px;
  perspective: 1400px;
  background:
    radial-gradient(circle at 1px 1px, var(--line) 1px, transparent 0) 0 0 / 18px 18px,
    var(--bg-soft);
  border-${p => (p.$wide ? "left" : "top")}: 1px solid var(--line);
  overflow: hidden;

  ${bp.md} {
    border-left: 0;
    border-top: 1px solid var(--line);
    min-height: 220px;
  }

  > div {
    width: 100%;
    max-width: ${p => (p.$wide ? "640px" : "520px")};
    transform: rotateX(18deg) rotateZ(-5deg) scale(0.96);
    transform-origin: 50% 60%;
    transition: transform 0.7s var(--ease);
  }
  svg {
    max-height: ${p => (p.$wide ? "280px" : "190px")};
  }

  article:hover & > div,
  article:focus-within & > div {
    transform: rotateX(0deg) rotateZ(0deg) scale(1);
  }

  @media (prefers-reduced-motion: reduce) {
    > div {
      transform: none;
    }
  }
`

const CoverLink = styled(Link)`
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 1;
  }
`

const ProjectCard = ({ project, wide = false, index = 0 }) => {
  const tilt = useTilt(wide ? 1.5 : 2)
  return (
    <div data-reveal style={{ "--i": index, height: "100%" }}>
      <Card ref={tilt} $wide={wide}>
        <Body $wide={wide}>
          <Meta>
            <span>{project.kicker}</span>
            <Status kind={project.statusKind}>{project.status}</Status>
          </Meta>
          <h3>
            <CoverLink to={`/projects/${project.slug}/`}>{project.name}</CoverLink>
          </h3>
          <p>{project.summary}</p>
          <More aria-hidden="true">
            Read case study <Arrow size={14} />
          </More>
        </Body>
        <Stage $wide={wide} aria-hidden="true">
          <div>
            <Diagram diagram={project.diagram} />
          </div>
        </Stage>
      </Card>
    </div>
  )
}

export default ProjectCard
