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
       allFile(filter: {relativeDirectory: {eq: "unFeaturedProjects"}}) {
        edges {
          node {
            id
            childrenImageSharp {
              gatsbyImageData(width: 300, placeholder: BLURRED)
            }
            relativePath
          }
        }
      }
    }
  `)

  const handleShowAll = () => {
    setShowAll(true)
  }
  const images = miniProjects.allFile.edges.map(({node}) => ({image:node.childrenImageSharp[0].gatsbyImageData,src:node.relativePath}))

  return (
    <CreativeCodingWrapper>
      <PageHeader>More Coding Projects</PageHeader>

      <Grid collapseHeight="700px" showAll={showAll}>
        {miniProjects.allUnFeaturedProjectsJson.edges.map(({ node }) => {
          const image=images.find(img=>img.src===node.picture)
          return (
            <MiniProject key={node.id} node={node} image={image.image} />
          )
        })}
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
