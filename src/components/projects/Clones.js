import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"

import { CreativeCodingWrapper } from "./MiniProjectsCSS"
import MiniProject from "./MiniProject"

import Grid from "../../commons/Grid"
import PageHeader from "../../commons/PageHeader"
import Button from "../../commons/Button"

const Clones = () => {
  const [showAll, setShowAll] = useState(false)

  const miniProjects = useStaticQuery(graphql`
    {
      allClonesProjectsJson {
        edges {
          node {
            demo
            github
            id
            picture
            title
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
      <PageHeader>Admired web giants clones</PageHeader>

      <Grid collapseHeight="450px" showAll={showAll}>
        {miniProjects.allClonesProjectsJson.edges.map(({ node }) => (
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

export default Clones
