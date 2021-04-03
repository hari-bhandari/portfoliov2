import React, { useState, useEffect } from "react"
import Helmet from "react-helmet"
import PropTypes from "prop-types"
import anime from "animejs"

import { StyledLoader } from "./LoaderCSS"
import IconLoader from "./LoaderLogo"
const Loader = () => {
  const animate = () => {
    const loader = anime.timeline({
      loop: true,
    })

    loader
      .add({
        targets: "#logo path",
        delay: 300,
        duration: 1500,
        easing: "easeInOutQuart",
        strokeDashoffset: [anime.setDashoffset, 0],
      })
      .add({
        targets: "#logo #B",
        duration: 700,
        easing: "easeInOutQuart",
        opacity: 1,
      })
      .add({
        targets: "#logo",
        delay: 500,
        duration: 300,
        easing: "easeInOutQuart",
        opacity: 0,
        scale: 0.4,
      })
      .add({
        targets: ".loader",
        duration: 200,
        easing: "easeInOutQuart",
        opacity: 1,
        zIndex: -1,
      })
  }

  useEffect(() => {
    const timeout = setTimeout(() => {}, 500)
    animate()
    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="logo-wrapper">
      <IconLoader />
    </div>
  )
}

Loader.propTypes = {
  finishLoading: PropTypes.func.isRequired,
}

export default Loader
