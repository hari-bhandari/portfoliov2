import React, { useEffect, useRef } from "react"
import { StyledAboutSection, StyledPic, StyledText } from "./AboutMeCSS"
import sr from "../../utils/sr"
import { srConfig } from "../../config"
import Image from "../image"
import PageHeader from "../../commons/PageHeader"
import { graphql, useStaticQuery } from "gatsby"

const AboutMe = () => {
  const data = useStaticQuery(graphql`
    {
      aboutJson {
        about
        aboutSecond
        intro
        skills
      }
    }
  `)
  const about = data.aboutJson

  const revealContainer = useRef(null)

  useEffect(() => {
    sr.reveal(revealContainer.current, srConfig())
  }, [])

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <PageHeader>About Me</PageHeader>
      <div className="inner">
        <StyledText>
          <div>
            <p>{about.intro}</p>

            <p>{about.about}</p>

            <p>{about.aboutSecond}</p>

            <p>Here are a few technologies I've been working with recently:</p>
          </div>

          <ul className="skills-list">
            {about.skills &&
              about.skills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <Image src={"me.jpg"} />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  )
}

export default AboutMe
