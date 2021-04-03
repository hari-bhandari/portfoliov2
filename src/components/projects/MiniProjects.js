import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"

import { CreativeCodingWrapper } from "./MiniProjectsCSS"
import MiniProject from "./MiniProject"

import Grid from "../../commons/Grid"
import PageHeader from "../../commons/PageHeader"
import Button from "../../commons/Button"

const MiniProjects = () => {
  const [showAll, setShowAll] = useState(false)

  const miniProjects = useStaticQuery(graphql`
    {
      allUnFeaturedProjectsJson {
        edges {
          node {
            id
            demo
            picture
            title
            github
          }
        }
      }
    }
  `)

  const handleShowAll = () => {
    setShowAll(true)
  }

  return (
    <CreativeCodingWrapper>
      <PageHeader>More Coding Projects</PageHeader>

      <Grid collapseHeight="700px" showAll={showAll}>
        {miniProjects.allUnFeaturedProjectsJson.edges.map(({ node }) => (
          <MiniProject key={node.id} node={node} />
        ))}
        {!showAll && (
          <Button onClick={handleShowAll} className="showall__button">
            Show all
          </Button>
        )}
      </Grid>
    </CreativeCodingWrapper>
  )
}

export default MiniProjects
