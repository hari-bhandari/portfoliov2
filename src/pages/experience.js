import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import experience from "../content/experience.json"
import profile from "../content/profile.json"
import projects from "../content/projects.json"
import Seo from "../components/Seo"
import Roles from "../components/Roles"
import { Container, Eyebrow, Lede, PageHero, Section, SectionHeading, TextLink, bp } from "../components/ui"

const Grid = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 40px;
  border-top: 1px solid var(--line);

  ${bp.sm} {
    grid-template-columns: 1fr;
  }

  li {
    padding: 16px 0;
    border-bottom: 1px solid var(--line);
    font-size: 17px;
  }
`

const WorkList = styled.ul`
  list-style: none;
  display: grid;
  border-top: 1px solid var(--line);

  li {
    border-bottom: 1px solid var(--line);
  }
  a {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.4fr) auto;
    gap: 8px 32px;
    padding: 22px 0;
    align-items: baseline;
    transition: color 0.3s var(--ease);

    ${bp.md} {
      grid-template-columns: 1fr;
    }
  }
  a:hover h3 {
    color: var(--accent);
  }
  h3 {
    font-family: var(--font-display);
    font-weight: 400;
    font-size: 26px;
    letter-spacing: -0.01em;
    transition: color 0.3s var(--ease);
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

const Education = styled.ol`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
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
    gap: 12px;
    align-content: start;
  }
  .period {
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--text-faint);
  }
  h3 {
    font-family: var(--font-display);
    font-weight: 400;
    font-size: 30px;
    letter-spacing: -0.015em;
  }
  .inst {
    color: var(--text-muted);
  }
  ul {
    list-style: none;
    display: grid;
    gap: 8px;
    margin-top: 8px;
    color: var(--text-muted);
    font-size: 16px;
  }
  ul li {
    padding-left: 18px;
    position: relative;
  }
  ul li::before {
    content: "";
    position: absolute;
    left: 0;
    top: 12px;
    width: 8px;
    height: 1px;
    background: var(--accent);
  }
`

const ExperiencePage = () => (
  <>
    <PageHero>
      <Container>
        <Eyebrow>Experience</Eyebrow>
        <h1>Experience and education</h1>
        <Lede>
          Doctoral research at the University of York since 2026, and software engineering at {experience.company} since
          2022.
        </Lede>
      </Container>
    </PageHero>

    <Section id="education">
      <Container>
        <SectionHeading eyebrow="Education" title="University of York" />
        <Education>
          {profile.education.map((e, i) => (
            <li key={e.award} data-reveal style={{ "--i": i }}>
              <span className="period">{e.period}</span>
              <h3>{e.award}</h3>
              <span className="inst">{e.institution}</span>
              <ul>
                {e.details.map(d => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </li>
          ))}
        </Education>
      </Container>
    </Section>

    <Section>
      <Container>
        <SectionHeading eyebrow="Industry" title="Roles" />
        <Roles />
      </Container>
    </Section>

    <Section>
      <Container>
        <SectionHeading eyebrow="What the work involves" title="Responsibilities" />
        <Grid data-reveal>
          {experience.responsibilities.map(r => (
            <li key={r}>{r}</li>
          ))}
        </Grid>
      </Container>
    </Section>

    <Section>
      <Container>
        <SectionHeading eyebrow="Selected work" title="Projects at Dashing" />
        <WorkList data-reveal>
          {projects.featured.map(p => (
            <li key={p.slug}>
              <Link to={`/projects/${p.slug}/`}>
                <h3>{p.name}</h3>
                <p>{p.summary}</p>
                <span>{p.status}</span>
              </Link>
            </li>
          ))}
        </WorkList>
        <div style={{ marginTop: 32 }}>
          <TextLink to="/projects/">All projects</TextLink>
        </div>
      </Container>
    </Section>
  </>
)

export default ExperiencePage

export const Head = () => (
  <Seo
    title="Experience"
    description="Roles at Dashing Distribution Software since 2022, and education at the University of York: BEng Computer Science (First Class Honours) and a PhD in Safe AI."
    pathname="/experience/"
  />
)
