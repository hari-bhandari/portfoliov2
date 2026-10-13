import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import profile from "../content/profile.json"
import { Container, bp } from "./ui"
import { navLinks } from "./Nav"

const Wrap = styled.footer`
  border-top: 1px solid var(--line);
  padding: 56px 0 40px;
  font-size: 15px;
  color: var(--text-muted);
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr;
  gap: 40px;

  ${bp.md} {
    grid-template-columns: 1fr 1fr;
  }
  ${bp.sm} {
    grid-template-columns: 1fr;
  }

  h2 {
    font-size: 26px;
    margin-bottom: 10px;
  }
  h3 {
    font-family: var(--font-mono);
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--text-faint);
    margin-bottom: 14px;
  }
  ul {
    list-style: none;
    display: grid;
    gap: 8px;
  }
  a:hover {
    color: var(--text);
  }
`

const Base = styled.div`
  margin-top: 56px;
  padding-top: 24px;
  border-top: 1px solid var(--line);
  display: flex;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  font-size: 13px;
  color: var(--text-faint);
`

const Footer = () => (
  <Wrap>
    <Container>
      <Grid>
        <div>
          <h2>Hari Bhandari</h2>
          <p>PhD researcher in Safe AI and software engineer, {profile.location}.</p>
        </div>
        <nav aria-label="Footer">
          <h3>Site</h3>
          <ul>
            {navLinks.map(l => (
              <li key={l.to}>
                <Link to={l.to}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h3>Elsewhere</h3>
          <ul>
            <li>
              <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={profile.links.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </Grid>
      <Base>
        <span>© {new Date().getFullYear()} Hari Bhandari</span>
        <span>Built with Gatsby and WebGL</span>
      </Base>
    </Container>
  </Wrap>
)

export default Footer
