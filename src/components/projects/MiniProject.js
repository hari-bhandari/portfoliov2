import React from "react"
import PropTypes from "prop-types"
import { IconButton } from "../../commons/Button"
import { CardFooter } from "../../commons/Card"
import { CCard } from "./MiniProjectsCSS"
import { GatsbyImage,getImage } from "gatsby-plugin-image"

const MiniProject = ({ node,image}) => {
  let img = getImage(image)
  return (
    <CCard key={node.id}>
      <a
        name={node.title}
        aria-label={node.title}
        className="thumbnail-a"
        href={node.demo}
        target="__blank"
      >
        <GatsbyImage
                     alt={`Project Picture of ${node.title}`}
                     image={img} className={'gatsby-image-wrapper'}
        />
      </a>
      <CardFooter justify="space-between" align="center" nowrap>
        <h4>{node.title}</h4>
        <div>
          <IconButton
            label={`Live Demo - ${node.title}`}
            href={node.demo}
            icon="window-maximize"
          />
          <IconButton
            label={`Source Code - ${node.title}`}
            href={node.github}
            Icon={"github"}
          />
        </div>
      </CardFooter>
    </CCard>
  )
}

MiniProject.propTypes = {
  node: PropTypes.object.isRequired,
}

export default MiniProject
