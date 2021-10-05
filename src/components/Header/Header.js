import React from "react"
import Container from "../../styles/container"
import { Head, HeaderCopy, HeaderSubCopy, HeaderText } from "./HeaderCss"
import { HeroCard } from "../Cards/CodingCard"
import ReactTypingEffect from "react-typing-effect"
import { graphql, useStaticQuery } from "gatsby"

const Header = ({ bgColor }) => {
  const value = useStaticQuery(graphql`
    {
      allHeaderJson {
        edges {
          node {
            subCopy
            subtitle
            name
            intro
          }
        }
      }
    }
  `)
  const data = value.allHeaderJson.edges[0].node


  return (
    <Head bgColor={bgColor} id={"home"}>
      <Container>
        <div className="header__container">
          <div className={"intro"}>
            <HeaderSubCopy style={{ color: "white" }}>
              {data.intro}
            </HeaderSubCopy>
            <HeaderText >{data.name}</HeaderText>
            <HeaderCopy >
              A{" "}
              <ReactTypingEffect
                typingDelay={500}
                eraseSpeed={100}
                eraseDelay={500}
                text={data.subtitle}
              />
            </HeaderCopy>
            <HeaderSubCopy >
              {data.subCopy}
            </HeaderSubCopy>
          </div>
          <div className="coding-block">
            <HeroCard />
          </div>
        </div>
      </Container>
    </Head>
  )
}

export default Header
