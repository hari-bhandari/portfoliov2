import React from "react"
import Seo from "../components/Seo"
import { Arrow, Button, Container, Eyebrow, Lede, PageHero } from "../components/ui"

const NotFoundPage = () => (
  <PageHero style={{ minHeight: "80vh", borderBottom: 0 }}>
    <Container>
      <Eyebrow>404</Eyebrow>
      <h1>This page is outside the survey area</h1>
      <Lede>The page you were looking for doesn't exist, or it has moved.</Lede>
      <div style={{ marginTop: 32 }}>
        <Button to="/">
          Back to the home page <Arrow size={14} />
        </Button>
      </div>
    </Container>
  </PageHero>
)

export default NotFoundPage

export const Head = () => (
  <Seo title="Page not found" pathname="/404/">
    <meta name="robots" content="noindex" />
  </Seo>
)
