import React from "react"
import styled from "styled-components"
import research from "../content/research.json"
import profile from "../content/profile.json"
import Seo from "../components/Seo"
import TerrainFigure from "../components/scene/TerrainFigure"
import { InspectionLoop, Note, PubGrid, PublicationCard, Roadmap } from "../components/research"
import { Container, Eyebrow, Lede, PageHero, Section, SectionHeading, Tag, Tags, bp } from "../components/ui"

const SceneFrame = styled.div`
  position: relative;
  height: clamp(360px, 52vw, 620px);
  margin-top: clamp(40px, 6vw, 72px);
  border-radius: var(--radius);
  border: 1px solid var(--line);
  overflow: hidden;
  background: radial-gradient(90% 80% at 60% 40%, var(--bg-soft), var(--bg));

  figcaption {
    left: 24px;
    right: 24px;
    bottom: 20px;
  }
`

const Question = styled.blockquote`
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(28px, 3.4vw, 44px);
  line-height: 1.22;
  letter-spacing: -0.015em;
  max-width: 28ch;
`

const Split = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: clamp(32px, 6vw, 96px);
  align-items: start;

  ${bp.md} {
    grid-template-columns: 1fr;
  }
`

const Stack = styled.div`
  display: grid;
  gap: 18px;
  color: var(--text-muted);
  font-size: 18px;
  line-height: 1.7;

  p:first-child {
    color: var(--text);
  }
`

const Label = styled.h3`
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin: 0 0 20px;
`

const Metrics = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  border-top: 1px solid var(--line);

  ${bp.sm} {
    grid-template-columns: 1fr;
  }

  li {
    padding: 14px 16px 14px 0;
    border-bottom: 1px solid var(--line);
    font-size: 16px;
  }
`

const ResearchPage = () => {
  const s = research.safescout

  return (
    <>
      <PageHero>
        <Container>
          <Eyebrow>Research</Eyebrow>
          <h1>Safer decisions under uncertainty</h1>
          <Lede>
            I'm a PhD researcher in the {s.programme}, supervised by {s.supervisors}. My work sits where computer vision
            meets safety: how autonomous systems can know what they don't know, and act on it.
          </Lede>
          <SceneFrame>
            <TerrainFigure
              variant="wide"
              label="Illustrative animation: a drone surveys a terrain map and prioritises uncertain areas where a missed hazard would be most costly."
            />
          </SceneFrame>
        </Container>
      </PageHero>

      <Section aria-labelledby="safescout">
        <Container>
          <SectionHeading eyebrow={`${s.name} · ${s.status}`} title={s.title} id="safescout" />
          <Split>
            <Question data-reveal>{s.question}</Question>
            <Stack data-reveal style={{ "--i": 1 }}>
              {s.problem.map(p => (
                <p key={p}>{p}</p>
              ))}
              <p>{profile.motivation}</p>
              <Note>{s.honesty}</Note>
            </Stack>
          </Split>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="Approach" title="Where to look next">
            The central loop: perception that reports its own uncertainty, weighed against what a miss would cost,
            deciding how to spend a limited flight budget.
          </SectionHeading>
          <InspectionLoop steps={s.loop} />
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="Plan" title="Research roadmap">
            The planned direction. It will change as the work develops.
          </SectionHeading>
          <Roadmap items={s.roadmap} />
          <div style={{ marginTop: 72 }} data-reveal>
            <Label>How progress will be measured</Label>
            <Metrics>
              {s.metrics.map(m => (
                <li key={m}>{m}</li>
              ))}
            </Metrics>
          </div>
        </Container>
      </Section>

      <Section id="publications">
        <Container>
          <SectionHeading eyebrow="Peer-reviewed" title="Publications">
            My undergraduate research on deep learning for underwater object detection, with Dr Pengcheng Liu, led to
            two peer-reviewed publications.
          </SectionHeading>
          <PubGrid>
            {research.publications.map((p, i) => (
              <PublicationCard key={p.doi} pub={p} index={i} />
            ))}
          </PubGrid>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="Interests" title="What I'm thinking about" />
          <Tags data-reveal>
            {research.interests.map(t => (
              <Tag key={t}>{t}</Tag>
            ))}
          </Tags>
        </Container>
      </Section>
    </>
  )
}

export default ResearchPage

const scholarly = {
  "@context": "https://schema.org",
  "@graph": research.publications.map(p => ({
    "@type": "ScholarlyArticle",
    headline: p.title,
    author: p.authors.map(name => ({ "@type": "Person", name })),
    datePublished: p.year,
    isPartOf: { "@type": "Periodical", name: p.venue },
    sameAs: `https://doi.org/${p.doi}`,
    identifier: { "@type": "PropertyValue", propertyID: "DOI", value: p.doi },
  })),
}

export const Head = () => (
  <Seo
    title="Research"
    description="SafeScout, PhD research on risk-aware active perception for autonomous UAV landslide assessment, and peer-reviewed publications on underwater object detection."
    pathname="/research/"
    jsonLd={scholarly}
  />
)
