import React from "react"
import PropTypes from "prop-types"

import { ProjectContent, ProjectDetail, ProjectWrapper } from "./ProjectCSS"

const Project = ({ title, desc, links, preview }) => {
  return (
    <ProjectWrapper>
      <ProjectContent>
        <ProjectDetail>
          <div className="project__detail-container">
            <span>{title}</span>
            <p>{desc}</p>
            {links}
          </div>
        </ProjectDetail>

        {preview}
      </ProjectContent>
    </ProjectWrapper>
  )
}

Project.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  links: PropTypes.node.isRequired,
  preview: PropTypes.node.isRequired,
}

export default Project
