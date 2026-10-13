import React from "react"
import styled, { keyframes } from "styled-components"
import { StaticImage } from "gatsby-plugin-image"
import profile from "../content/profile.json"
import projects from "../content/projects.json"
import research from "../content/research.json"
import Seo, { personJsonLd } from "../components/Seo"
import TerrainFigure from "../components/scene/TerrainFigure"
import ProjectCard from "../components/ProjectCard"
import experience from "../content/experience.json"
import { InspectionLoop, PubGrid, PublicationCard } from "../components/research"
import { Arrow, Button, Container, Eyebrow, Section, SectionHeading, TextLink, bp } from "../components/ui"

const rise = keyframes`
  from { opacity: 0.01; transform: translate3d(0, 14px, 0); }
  to { opacity: 1; transform: none; }
`

const Hero = styled.section`
  position: relative;
  min-height: min(100svh, 940px);
  display: flex;
  align-items: center;
  padding: calc(var(--nav-h) + 48px) 0 72px;
  overflow: hidden;

  ${bp.md} {
    min-height: 0;
    display: block;
    padding-bottom: 32px;
  }
`

const HeroCopy = styled.div`
  position: relative;
  z-index: 2;
  max-width: 980px;
  display: grid;
  gap: 28px;

  > * {
    animation: ${rise} 0.8s var(--ease) both;
  }
  > *:nth-child(2) {
    animation-delay: 0.06s;
  }
  > *:nth-child(3) {
    animation-delay: 0.12s;
  }
  > *:nth-child(4) {
    animation-delay: 0.18s;
  }

  h1 {
    font-size: clamp(46px, 6.4vw, 92px);
    line-height: 1;
    letter-spacing: -0.035em;
  }
  h1 span {
    display: block;
  }
  ${bp.lg} {
    h1 span,
    h1 em {
      white-space: nowrap;
    }
  }
  h1 em {
    display: block;
    font-style: italic;
    color: var(--text-muted);
  }
  .intro {
    font-size: clamp(17px, 1.5vw, 20px);
    line-height: 1.6;
    color: var(--text-muted);
    max-width: 54ch;
  }
`

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`

const Stage = styled.div`
  position: absolute;
  z-index: 1;
  top: 14%;
  bottom: 0;
  right: -6vw;
  width: min(70vw, 1120px);
  /* Fade out under the copy and towards the next section. */
  -webkit-mask-image: linear-gradient(90deg, transparent 8%, #000 52%), linear-gradient(0deg, transparent 0%, #000 14%);
  -webkit-mask-composite: source-in;
  mask-image: linear-gradient(90deg, transparent 8%, #000 52%), linear-gradient(0deg, transparent 0%, #000 14%);
  mask-composite: intersect;

  figcaption {
    left: 50%;
    right: 6vw;
    bottom: 15%;
  }

  ${bp.md} {
    position: relative;
    right: auto;
    width: auto;
    height: clamp(300px, 78vw, 460px);
    margin: 12px calc(var(--gutter) * -1) 0;
    -webkit-mask-image: linear-gradient(180deg, transparent 0%, #000 18%, #000 85%, transparent 100%);
    -webkit-mask-composite: source-over;
    mask-image: linear-gradient(180deg, transparent 0%, #000 18%, #000 85%, transparent 100%);
    mask-composite: add;

    figcaption {
      left: var(--gutter);
      right: var(--gutter);
      bottom: 8px;
    }
  }
`

const Now = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 10px 28px;
  padding-top: 8px;
  font-size: 14px;
  color: var(--text-muted);

  li {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  li::before {
    content: "";
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--live);
  }
`

const Metrics = styled.dl`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  margin: 0;

  ${bp.md} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  > div {
    padding: 32px 28px 30px 0;
    display: grid;
    gap: 10px;
    align-content: start;
  }
  > div + div {
    padding-left: 28px;
    border-left: 1px solid var(--line);
  }
  ${bp.md} {
    > div:nth-child(3) {
      padding-left: 0;
      border-left: 0;
    }
    > div:nth-child(-n + 2) {
      border-bottom: 1px solid var(--line);
    }
  }
  dt {
    order: 2;
    font-size: 14px;
    line-height: 1.5;
    color: var(--text-muted);
  }
  dd {
    margin: 0;
    font-family: var(--font-display);
    font-size: clamp(40px, 4.4vw, 60px);
    line-height: 1;
    letter-spacing: -0.03em;
  }
  dd small {
    font-family: var(--font-mono);
    font-size: 12px;
    letter-spacing: 0.04em;
    color: var(--text-faint);
    margin-left: 8px;
    vertical-align: 0.9em;
  }
  ${bp.sm} {
    > div,
    > div + div {
      padding: 24px 16px 24px 0;
    }
    > div:nth-child(even) {
      padding-left: 16px;
    }
    dd small {
      display: block;
      margin: 10px 0 0;
      vertical-align: baseline;
    }
  }
`

const Threads = styled.ol`
  list-style: none;
  counter-reset: t;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: clamp(24px, 4vw, 56px);

  ${bp.md} {
    grid-template-columns: 1fr;
  }

  li {
    counter-increment: t;
    display: grid;
    gap: 12px;
    align-content: start;
    padding-top: 22px;
    border-top: 1px solid var(--line-strong);
  }
  li::before {
    content: "0" counter(t);
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--accent);
  }
  h3 {
    font-family: var(--font-display);
    font-weight: 400;
    font-size: 30px;
    letter-spacing: -0.015em;
  }
  p {
    color: var(--text-muted);
  }
`

const WorkGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;

  > :first-child {
    grid-column: 1 / -1;
  }

  ${bp.md} {
    grid-template-columns: 1fr;
  }
`

const SectionFoot = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: flex-end;
`

const Spotlight = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: clamp(32px, 5vw, 72px);
  align-items: end;
  margin-bottom: 40px;

  ${bp.md} {
    grid-template-columns: 1fr;
  }

  blockquote {
    margin: 0;
    font-family: var(--font-display);
    font-size: clamp(24px, 2.5vw, 32px);
    line-height: 1.3;
    letter-spacing: -0.01em;
    padding-left: 24px;
    border-left: 2px solid var(--accent);
  }
  blockquote footer {
    margin-top: 16px;
    font-family: var(--font-mono);
    font-size: 12px;
    letter-spacing: 0.04em;
    color: var(--text-faint);
  }
`

const SubHead = styled.h3`
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin: 72px 0 24px;
`

const AboutGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
  gap: clamp(32px, 6vw, 96px);
  align-items: center;

  ${bp.md} {
    grid-template-columns: 1fr;
  }

  .photo {
    border-radius: var(--radius);
    overflow: hidden;
    border: 1px solid var(--line);
    aspect-ratio: 4 / 5;
  }
  .photo img {
    transition: transform 1.6s var(--ease) !important;
  }
  .photo:hover img {
    transform: scale(1.03);
  }
  .copy {
    display: grid;
    gap: 22px;
  }
  .copy h2 {
    font-size: clamp(34px, 4.4vw, 54px);
  }
  .copy p {
    color: var(--text-muted);
    font-size: 18px;
    line-height: 1.7;
  }
  .copy p:first-of-type {
    color: var(--text);
  }
`

const Cta = styled.div`
  display: grid;
  gap: 32px;
  justify-items: start;

  h2 {
    font-size: clamp(44px, 6.4vw, 84px);
    max-width: 20ch;
    letter-spacing: -0.035em;
  }
  h2 em {
    font-style: italic;
    color: var(--text-muted);
  }
  p {
    font-size: 19px;
    color: var(--text-muted);
    max-width: 52ch;
  }
`

const PathGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: clamp(40px, 6vw, 96px);

  ${bp.md} {
    grid-template-columns: 1fr;
  }

  h3 {
    font-family: var(--font-mono);
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--text-muted);
    margin-bottom: 20px;
  }
`

const Degrees = styled.ol`
  list-style: none;
  border-top: 1px solid var(--line);

  > li {
    padding: 22px 0;
    border-bottom: 1px solid var(--line);
    display: grid;
    gap: 6px;
  }
  .row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 6px 20px;
  }
  h4 {
    font-family: var(--font-display);
    font-weight: 400;
    font-size: 26px;
    letter-spacing: -0.01em;
  }
  time {
    font-family: var(--font-mono);
    font-size: 13px;
    color: var(--text-muted);
  }
  p {
    color: var(--text-muted);
    font-size: 16px;
  }
`

const IndexPage = () => {
  const [lead, ...rest] = projects.featured
  const { safescout, publications } = research

  return (
    <>
      <Hero aria-labelledby="hero-title">
        <Container>
          <HeroCopy>
            <Eyebrow>{profile.eyebrow}</Eyebrow>
            <h1 id="hero-title">
              <span>{profile.headline[0]}</span>
              <em>{profile.headline[1]}</em>
            </h1>
            <p className="intro">{profile.intro}</p>
            <div>
              <Actions>
                <Button to="/research/">
                  View research <Arrow size={14} />
                </Button>
                <Button to="#publications" variant="secondary">
                  Publications <Arrow dir="down" size={14} />
                </Button>
              </Actions>
              <Now aria-label="Currently">
                <li>PhD researcher, University of York</li>
                <li>Senior Software Engineer, Dashing Distribution Software</li>
              </Now>
            </div>
          </HeroCopy>
        </Container>
        <Stage>
          <TerrainFigure label="An illustrative animation of a drone surveying a terrain map and choosing to inspect uncertain, high-risk areas first." />
        </Stage>
      </Hero>

      <Container>
        <Metrics data-reveal>
          {profile.metrics.map(m => (
            <div key={m.label}>
              <dt>{m.label}</dt>
              <dd>
                {m.value}
                <small>{m.unit}</small>
              </dd>
            </div>
          ))}
        </Metrics>
      </Container>

      <Section id="research">
        <Container>
          <Spotlight>
            <SectionHeading eyebrow="Research · SafeScout" title="Teaching autonomous systems when to look again">
              My PhD asks how a drone surveying a landslide can tell when it is unsure, judge what a miss would cost,
              and spend its limited flight time where it matters most.
            </SectionHeading>
            <blockquote data-reveal>
              {safescout.question}
              <footer>Research question · {safescout.status}</footer>
            </blockquote>
          </Spotlight>
          <InspectionLoop steps={safescout.loop} />

          <SubHead id="publications">Peer-reviewed publications</SubHead>
          <PubGrid>
            {publications.map((p, i) => (
              <PublicationCard key={p.doi} pub={p} showSummary={false} index={i} />
            ))}
          </PubGrid>
          <SectionFoot>
            <TextLink to="/research/">Research in detail</TextLink>
          </SectionFoot>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="Path" title="Academia and industry, side by side" />
          <PathGrid>
            <div data-reveal>
              <h3>Education</h3>
              <Degrees>
                {profile.education.map(e => (
                  <li key={e.award}>
                    <div className="row">
                      <h4>{e.award}</h4>
                      <time>{e.period}</time>
                    </div>
                    <p>{e.details[0]}</p>
                  </li>
                ))}
              </Degrees>
            </div>
            <div data-reveal style={{ "--i": 1 }}>
              <h3>Industry</h3>
              <Degrees>
                {experience.roles.map(r => (
                  <li key={r.title}>
                    <div className="row">
                      <h4>{r.title}</h4>
                      <time>{r.period}</time>
                    </div>
                    <p>{experience.company}</p>
                  </li>
                ))}
              </Degrees>
            </div>
          </PathGrid>
          <SectionFoot>
            <TextLink to="/experience/">Experience and education</TextLink>
          </SectionFoot>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading
            eyebrow="How it fits together"
            title="Three threads, one question: does it work when it matters?"
          />
          <Threads>
            {profile.themes.map((t, i) => (
              <li key={t.title} data-reveal style={{ "--i": i }}>
                <h3>{t.title}</h3>
                <p>{t.body}</p>
              </li>
            ))}
          </Threads>
        </Container>
      </Section>

      <Section id="work">
        <Container>
          <SectionHeading eyebrow="Selected engineering" title="Systems built for real operations">
            Alongside research, I design and build software for the electronic components distribution industry. Client
            details stay private, so each case study focuses on the problem, the architecture and the decisions.
          </SectionHeading>
          <WorkGrid>
            <ProjectCard project={lead} wide />
            {rest.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i % 2} />
            ))}
          </WorkGrid>
          <SectionFoot>
            <TextLink to="/projects/">All projects, including earlier work</TextLink>
          </SectionFoot>
        </Container>
      </Section>

      <Section>
        <Container>
          <AboutGrid>
            <div className="photo" data-reveal>
              <StaticImage
                src="../images/profile/Hari_Bhandari.png"
                alt="Hari Bhandari standing by a waterfall"
                layout="fullWidth"
                aspectRatio={0.8}
                transformOptions={{ cropFocus: "center" }}
                placeholder="blurred"
                formats={["auto", "webp", "avif"]}
                breakpoints={[360, 540, 720, 960]}
                quality={78}
                style={{ height: "100%" }}
              />
            </div>
            <div className="copy" data-reveal style={{ "--i": 1 }}>
              <Eyebrow>A little about me</Eyebrow>
              <h2>From Nepal to York, by way of a lot of software.</h2>
              <p>{profile.motivation}</p>
              <div>
                <TextLink to="/about/">More about me</TextLink>
              </div>
            </div>
          </AboutGrid>
        </Container>
      </Section>

      <Section>
        <Container>
          <Cta data-reveal>
            <Eyebrow>Say hello</Eyebrow>
            <h2>
              Working on safer autonomy? <em>Let's talk.</em>
            </h2>
            <p>
              I'm always glad to hear from fellow researchers, potential collaborators and engineering teams, or anyone
              who simply wants to compare notes.
            </p>
            <Actions>
              <Button to="/contact/">
                Get in touch <Arrow size={14} />
              </Button>
              <Button to={profile.links.linkedin} variant="secondary">
                LinkedIn <Arrow dir="upRight" size={14} />
              </Button>
            </Actions>
          </Cta>
        </Container>
      </Section>
    </>
  )
}

export default IndexPage

export const Head = () => <Seo pathname="/" jsonLd={personJsonLd} />
