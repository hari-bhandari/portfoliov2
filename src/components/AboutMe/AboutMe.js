import React from "react"
import { StyledAboutSection, StyledPic, StyledText } from "./AboutMeCSS"
import PageHeader from "../../commons/PageHeader"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage,getImage } from "gatsby-plugin-image"

const AboutMe = () => {

  const data = useStaticQuery(graphql`
    {
    aboutJson {
        about
        aboutSecond
        intro
        skills
      }
  
   allFile(filter: {relativeDirectory: {eq: "profile"}}) {
        edges {
          node {
            id
            childrenImageSharp {
              gatsbyImageData(width: 400, placeholder: BLURRED)
            }
          }
        }
      }
}
  `)
  const about = data.aboutJson
  const image=getImage(data.allFile.edges[0].node.childrenImageSharp[0].gatsbyImageData)

  return (
    <StyledAboutSection id="about">
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
            <GatsbyImage className={'My Profile'}
                         alt={'Profile Picture'}
                         image={image}
            />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  )
}

export default AboutMe
