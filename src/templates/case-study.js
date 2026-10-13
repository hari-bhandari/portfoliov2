import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import projects from "../content/projects.json"
import Seo from "../components/Seo"
import Diagram, { DiagramLegend } from "../components/Diagram"
import { Arrow, Container, Lede, PageHero, Status, Tag, Tags, bp } from "../components/ui"
import { Note } from "../components/research"

const find = slug => projects.featured.find(p => p.slug === slug)

const Crumb = styled.nav`
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.04em;
  color: var(--text-faint);

  a {
    color: var(--text-muted);
    text-decoration: underline;
    text-underline-offset: 3px;
  }
  a:hover {
    color: var(--accent);
  }
`

const Facts = styled.dl`
  margin: 48px 0 0;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  border-top: 1px solid var(--line);

  ${bp.sm} {
    grid-template-columns: 1fr;
  }

  div {
    padding: 20px 20px 0 0;
    display: grid;
    gap: 6px;
  }
  dt {
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-faint);
  }
  dd {
    margin: 0;
    font-size: 16px;
  }
`

const Figure = styled.figure`
  margin: clamp(48px, 7vw, 88px) 0 0;
  border-radius: var(--radius);
  border: 1px solid var(--line);
  background:
    radial-gradient(circle at 1px 1px, var(--line) 1px, transparent 0) 0 0 / 20px 20px,
    var(--bg-soft);
  padding: clamp(20px, 4vw, 56px);
  perspective: 1600px;
  overflow: hidden;

  .plane {
    max-width: 880px;
    margin: 0 auto;
    animation: settle 0.9s var(--ease) both 0.1s;
  }
  @keyframes settle {
    from {
      opacity: 0;
      transform: rotateX(16deg) rotateZ(-4deg) scale(0.96);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  figcaption {
    margin-top: 32px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 12px 24px;
    font-size: 14px;
    color: var(--text-muted);
  }
`

const Body = styled.div`
  padding: clamp(64px, 9vw, 120px) 0;
  display: grid;
  gap: clamp(56px, 8vw, 96px);
`

const Block = styled.section`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 2.4fr);
  gap: 24px 48px;

  ${bp.md} {
    grid-template-columns: 1fr;
  }

  > h2 {
    font-family: var(--font-mono);
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--text-muted);
    padding-top: 8px;
    line-height: 1.6;
  }

  .text {
    font-size: clamp(18px, 1.6vw, 21px);
    line-height: 1.65;
    max-width: 62ch;
  }
  ul.points {
    list-style: none;
    display: grid;
    border-top: 1px solid var(--line);
  }
  ul.points li {
    padding: 16px 0 16px 28px;
    border-bottom: 1px solid var(--line);
    position: relative;
    color: var(--text-muted);
  }
  ul.points li::before {
    content: "";
    position: absolute;
    left: 2px;
    top: 27px;
    width: 12px;
    height: 1px;
    background: var(--accent);
  }
`

const Decisions = styled.ol`
  list-style: none;
  counter-reset: d;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;

  ${bp.sm} {
    grid-template-columns: 1fr;
  }

  li {
    counter-increment: d;
    padding: 24px;
    border-radius: var(--radius-sm);
    border: 1px solid var(--line);
    background: var(--surface);
    display: grid;
    gap: 10px;
    align-content: start;
  }
  li::before {
    content: "0" counter(d);
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--accent);
  }
  h3 {
    font-size: 17px;
  }
  p {
    color: var(--text-muted);
    font-size: 16px;
  }
`

const Next = styled(Link)`
  display: grid;
  gap: 10px;
  padding: clamp(40px, 6vw, 72px) 0;
  border-top: 1px solid var(--line);

  span {
    font-family: var(--font-mono);
    font-size: 12px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-faint);
  }
  strong {
    font-family: var(--font-display);
    font-weight: 400;
    font-size: clamp(36px, 5vw, 64px);
    letter-spacing: -0.03em;
    display: inline-flex;
    align-items: center;
    gap: 20px;
    transition: color 0.4s var(--ease);
  }
  svg {
    transition: transform 0.5s var(--ease);
  }
  &:hover strong {
    color: var(--accent);
  }
  &:hover svg {
    transform: translateX(8px);
  }
`

const CaseStudy = ({ pageContext }) => {
  const p = find(pageContext.slug)
  const next = find(pageContext.nextSlug)

  return (
    <article>
      <PageHero>
        <Container>
          <Crumb aria-label="Breadcrumb">
            <Link to="/projects/">Projects</Link> / {p.name}
          </Crumb>
          <h1>{p.name}</h1>
          <Lede>{p.summary}</Lede>
          <Facts>
            <div>
              <dt>Role</dt>
              <dd>{p.role}</dd>
            </div>
            <div>
              <dt>Context</dt>
              <dd>{p.context}</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>
                <Status kind={p.statusKind}>{p.status}</Status>
              </dd>
            </div>
          </Facts>
          <Figure>
            <div className="plane">
              <Diagram diagram={p.diagram} animate />
            </div>
            <figcaption>
              <span>{p.diagram.title}</span>
              <DiagramLegend />
            </figcaption>
          </Figure>
        </Container>
      </PageHero>

      <Container>
        <Body>
          <Block data-reveal>
            <h2>The problem</h2>
            <p className="text">{p.problem}</p>
          </Block>

          <Block data-reveal>
            <h2>My responsibilities</h2>
            <ul className="points">
              {p.responsibilities.map(r => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </Block>

          <Block data-reveal>
            <h2>The solution</h2>
            <p className="text">{p.solution}</p>
          </Block>

          <Block>
            <h2 data-reveal>Key decisions</h2>
            <Decisions>
              {p.decisions.map((d, i) => (
                <li key={d.title} data-reveal style={{ "--i": i % 2 }}>
                  <h3>{d.title}</h3>
                  <p>{d.body}</p>
                </li>
              ))}
            </Decisions>
          </Block>

          <Block data-reveal>
            <h2>Trade-offs</h2>
            <ul className="points">
              {p.tradeoffs.map(t => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </Block>

          <Block data-reveal>
            <h2>Outcomes</h2>
            <ul className="points">
              {p.outcomes.map(o => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          </Block>

          {p.stack.length > 0 && (
            <Block data-reveal>
              <h2>Stack</h2>
              <Tags>
                {p.stack.map(s => (
                  <Tag key={s}>{s}</Tag>
                ))}
              </Tags>
            </Block>
          )}

          {p.confidential && (
            <Block data-reveal>
              <h2>A note on detail</h2>
              <Note>
                This is commercial software, so there are no screenshots, client names or implementation specifics here.
                The diagram is a simplified view of the architecture.
              </Note>
            </Block>
          )}
        </Body>

        <Next to={`/projects/${next.slug}/`}>
          <span>Next case study</span>
          <strong>
            {next.name} <Arrow size={28} />
          </strong>
        </Next>
      </Container>
    </article>
  )
}

export default CaseStudy

export const Head = ({ pageContext }) => {
  const p = find(pageContext.slug)
  return (
    <Seo title={p.name} description={`${p.summary} Case study by Hari Bhandari.`} pathname={`/projects/${p.slug}/`} />
  )
}
