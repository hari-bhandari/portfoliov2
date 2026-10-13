import React from "react"
import styled from "styled-components"
import { StaticImage } from "gatsby-plugin-image"
import profile from "../content/profile.json"
import skills from "../content/skills.json"
import Seo, { personJsonLd } from "../components/Seo"
import { Container, Eyebrow, PageHero, Prose, Section, SectionHeading, Tag, Tags, TextLink, bp } from "../components/ui"

const Intro = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
  gap: clamp(32px, 6vw, 96px);
  align-items: start;

  ${bp.md} {
    grid-template-columns: 1fr;
  }

  .photo {
    border-radius: var(--radius);
    overflow: hidden;
    border: 1px solid var(--line);
    aspect-ratio: 4 / 5;
    position: sticky;
    top: calc(var(--nav-h) + 24px);

    ${bp.md} {
      position: static;
      max-width: 440px;
    }
  }
`

const Motivation = styled.blockquote`
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(26px, 3vw, 38px);
  line-height: 1.3;
  letter-spacing: -0.015em;
  max-width: 34ch;
  padding-left: clamp(20px, 3vw, 32px);
  border-left: 2px solid var(--accent);
`

const Tiers = styled.div`
  display: grid;
  gap: 0;
  border-top: 1px solid var(--line);

  > div {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 2.2fr);
    gap: 16px 48px;
    padding: 32px 0;
    border-bottom: 1px solid var(--line);

    ${bp.md} {
      grid-template-columns: 1fr;
    }
  }
  h3 {
    font-size: 18px;
    margin-bottom: 6px;
  }
  p {
    font-size: 15px;
    color: var(--text-muted);
  }
`

const AboutPage = () => (
  <>
    <PageHero>
      <Container>
        <Eyebrow>About</Eyebrow>
        <h1>Researcher, engineer, builder</h1>
      </Container>
    </PageHero>

    <Section>
      <Container>
        <Intro>
          <Prose data-reveal>
            {profile.about.map(p => (
              <p key={p}>{p}</p>
            ))}
          </Prose>
          <div className="photo" data-reveal style={{ "--i": 1 }}>
            <StaticImage
              src="../images/profile/Hari_Bhandari.png"
              alt="Hari Bhandari standing by a waterfall"
              layout="fullWidth"
              aspectRatio={0.8}
              placeholder="blurred"
              formats={["auto", "webp", "avif"]}
              breakpoints={[360, 540, 720, 960]}
              quality={78}
              style={{ height: "100%" }}
            />
          </div>
        </Intro>
      </Container>
    </Section>

    <Section>
      <Container>
        <Eyebrow>Why it matters to me</Eyebrow>
        <div style={{ marginTop: 28 }} data-reveal>
          <Motivation>{profile.motivation}</Motivation>
        </div>
      </Container>
    </Section>

    <Section>
      <Container>
        <SectionHeading eyebrow="Skills" title="What I work with">
          Grouped by how I actually use them, rather than as one long list.
        </SectionHeading>
        <Tiers>
          {skills.map((t, i) => (
            <div key={t.tier} data-reveal style={{ "--i": i }}>
              <div>
                <h3>{t.tier}</h3>
                <p>{t.note}</p>
              </div>
              <Tags>
                {t.items.map(s => (
                  <Tag key={s}>{s}</Tag>
                ))}
              </Tags>
            </div>
          ))}
        </Tiers>
        <div style={{ marginTop: 40, display: "flex", gap: 32, flexWrap: "wrap" }}>
          <TextLink to="/experience/#education">Education</TextLink>
          <TextLink to="/research/">Research</TextLink>
          <TextLink to="/contact/">Get in touch</TextLink>
        </div>
      </Container>
    </Section>
  </>
)

export default AboutPage

export const Head = () => (
  <Seo
    title="About"
    description="About Hari Bhandari: software engineer and architect at Dashing Distribution Software, AI Safety PhD researcher at the University of York, originally from Nepal."
    pathname="/about/"
    jsonLd={personJsonLd}
  />
)
