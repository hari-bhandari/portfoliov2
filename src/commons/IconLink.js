import React from "react"
import PropTypes from "prop-types"
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa"

const IconLink = ({ label, className, href, Icon }) => {
  return (
    <a
      target="__blank"
      aria-label={label}
      title={label}
      className={className}
      href={href}
    >
      {Icon === "github" ? <FaGithub /> : <FaExternalLinkAlt />}
    </a>
  )
}

IconLink.defaultProps = {
  label: "Icon Link",
}

IconLink.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  href: PropTypes.string,
}

export default IconLink
