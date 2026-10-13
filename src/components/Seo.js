import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import profile from "../content/profile.json"

const Seo = ({ title, description, pathname = "/", jsonLd, children }) => {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          titleTemplate
          description
          siteUrl
          image
        }
      }
    }
  `)
  const meta = site.siteMetadata
  const fullTitle = title ? meta.titleTemplate.replace("%s", title) : `${meta.title} · ${profile.role}`
  const desc = description || meta.description
  const url = `${meta.siteUrl}${pathname}`
  const image = `${meta.siteUrl}${meta.image}`

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />
      <meta name="author" content="Hari Bhandari" />
      <meta name="theme-color" content="#0c0d0f" media="(prefers-color-scheme: dark)" />
      <meta name="theme-color" content="#f5f3ee" media="(prefers-color-scheme: light)" />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Hari Bhandari" />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Hari Bhandari. Researching safer AI. Building dependable software." />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={image} />

      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
      {children}
    </>
  )
}

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Hari Bhandari",
  url: "https://haribhandari.me/",
  jobTitle: ["PhD Researcher in Safe AI", "Senior Software Engineer"],
  worksFor: { "@type": "Organization", name: "Dashing Distribution Software" },
  affiliation: { "@type": "CollegeOrUniversity", name: "University of York" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "University of York" },
  knowsAbout: ["Software architecture", "AI safety", "Computer vision", "Autonomous systems", "Robotics"],
  sameAs: [profile.links.linkedin, profile.links.github],
}

export default Seo
