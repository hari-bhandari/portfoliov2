import React from "react"
import styled from "styled-components"
import profile from "../content/profile.json"
import Seo from "../components/Seo"
import ContactForm from "../components/ContactForm"
import { Arrow, Container, Eyebrow, Lede, PageHero, Section, bp } from "../components/ui"

const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.4fr);
  gap: clamp(40px, 7vw, 112px);

  ${bp.md} {
    grid-template-columns: 1fr;
  }
`

const Channels = styled.ul`
  list-style: none;
  border-top: 1px solid var(--line);
  align-self: start;

  a {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    padding: 22px 0;
    border-bottom: 1px solid var(--line);
    transition: color 0.3s var(--ease);
  }
  a:hover {
    color: var(--accent);
  }
  strong {
    display: block;
    font-family: var(--font-display);
    font-weight: 400;
    font-size: 28px;
    letter-spacing: -0.01em;
  }
  span {
    font-size: 14px;
    color: var(--text-muted);
  }
  svg {
    transition: transform 0.4s var(--ease);
  }
  a:hover svg {
    transform: translate(3px, -3px);
  }
`

const ContactPage = () => (
  <>
    <PageHero>
      <Container>
        <Eyebrow>Contact</Eyebrow>
        <h1>Let's talk</h1>
        <Lede>
          Whether it's engineering, research collaboration or something else entirely, I'm happy to hear from you.
          LinkedIn or the form below both reach me directly.
        </Lede>
      </Container>
    </PageHero>

    <Section>
      <Container>
        <Grid>
          <Channels data-reveal>
            <li>
              <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">
                <div>
                  <strong>LinkedIn</strong>
                  <span>/in/haribhandari1010</span>
                </div>
                <Arrow dir="upRight" size={18} />
              </a>
            </li>
            <li>
              <a href={profile.links.github} target="_blank" rel="noopener noreferrer">
                <div>
                  <strong>GitHub</strong>
                  <span>@hari-bhandari</span>
                </div>
                <Arrow dir="upRight" size={18} />
              </a>
            </li>
          </Channels>
          <div data-reveal style={{ "--i": 1 }}>
            <ContactForm />
          </div>
        </Grid>
      </Container>
    </Section>
  </>
)

export default ContactPage

export const Head = () => <Seo title="Contact" description="Get in touch with Hari Bhandari." pathname="/contact/" />
