import React from "react"
import styled from "styled-components"
import projects from "../content/projects.json"
import Seo from "../components/Seo"
import ProjectCard from "../components/ProjectCard"
import { Arrow, Container, Eyebrow, Lede, PageHero, Section, SectionHeading, Tag, Tags, bp } from "../components/ui"

const Featured = styled.div`
  display: grid;
  gap: 20px;
`

const MoreGrid = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;

  ${bp.md} {
    grid-template-columns: 1fr;
  }

  > li {
    padding: 28px;
    border-radius: var(--radius);
    border: 1px solid var(--line);
    background: var(--surface);
    display: grid;
    gap: 14px;
    align-content: start;
  }
  h3 {
    font-size: 19px;
  }
  p {
    color: var(--text-muted);
    font-size: 16px;
  }
`

const Archive = styled.ul`
  list-style: none;
  border-top: 1px solid var(--line);

  > li {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.6fr) auto;
    gap: 12px 32px;
    padding: 22px 0;
    border-bottom: 1px solid var(--line);
    align-items: baseline;

    ${bp.md} {
      grid-template-columns: 1fr;
    }
  }
  h3 {
    font-size: 17px;
  }
  p {
    color: var(--text-muted);
    font-size: 15px;
    margin-bottom: 10px;
  }
  .links {
    display: flex;
    gap: 16px;
    font-size: 14px;
    white-space: nowrap;
  }
  .links a {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    color: var(--text-muted);
    transition: color 0.3s var(--ease);
  }
  .links a:hover {
    color: var(--accent);
  }
`

const ProjectsPage = () => (
  <>
    <PageHero>
      <Container>
        <Eyebrow>Work</Eyebrow>
        <h1>Projects and case studies</h1>
        <Lede>
          Most of my work is commercial software for the electronic components distribution industry, built at Dashing
          Distribution Software. The case studies cover the problem, the architecture and the decisions behind each one.
        </Lede>
      </Container>
    </PageHero>

    <Section>
      <Container>
        <SectionHeading eyebrow="Featured" title="Case studies" />
        <Featured>
          {projects.featured.map((p, i) => (
            <ProjectCard key={p.slug} project={p} wide index={i % 2} />
          ))}
        </Featured>
      </Container>
    </Section>

    <Section>
      <Container>
        <SectionHeading eyebrow="Also at Dashing" title="More engineering work" />
        <MoreGrid>
          {projects.more.map((m, i) => (
            <li key={m.name} data-reveal style={{ "--i": i }}>
              <h3>{m.name}</h3>
              <p>{m.summary}</p>
              <Tags>
                {m.stack.map(s => (
                  <Tag key={s}>{s}</Tag>
                ))}
              </Tags>
            </li>
          ))}
        </MoreGrid>
      </Container>
    </Section>

    <Section>
      <Container>
        <SectionHeading eyebrow="Archive" title="Earlier projects">
          Earlier personal projects, kept here for completeness.
        </SectionHeading>
        <Archive>
          {projects.archive.map(a => (
            <li key={a.name} data-reveal>
              <h3>{a.name}</h3>
              <div>
                <p>{a.summary}</p>
                <Tags>
                  {a.stack.map(s => (
                    <Tag key={s}>{s}</Tag>
                  ))}
                </Tags>
              </div>
              <div className="links">
                {a.links.map(l => (
                  <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">
                    {l.label}
                    <Arrow dir="upRight" size={12} />
                    <span className="visually-hidden"> for {a.name} (opens in a new tab)</span>
                  </a>
                ))}
              </div>
            </li>
          ))}
        </Archive>
      </Container>
    </Section>
  </>
)

export default ProjectsPage

export const Head = () => (
  <Seo
    title="Projects"
    description="Case studies in enterprise architecture and applied AI, plus earlier personal projects, by Hari Bhandari."
    pathname="/projects/"
  />
)
