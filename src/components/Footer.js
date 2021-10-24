import React from "react"
import styled from "styled-components"
import { Container, theme, media } from "../styles"

const StyledFooter = styled.footer`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: ${theme.colors.darkBlueLighter};
  padding-left: 1rem;
  padding-right: 1rem;
  ${media.largeUp} {
    padding-left: 100px;
    padding-right: 100px;
  }
`

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  padding-top: 25px;
  padding-bottom: 25px;
  ${media.medium} {
    padding-top: 20px;
    padding-bottom: 20px;
  }
  ${media.small} {
    flex-direction: column;
  }
`

const FooterCopy = styled.span`
  font-size: 14px;
  color: ${theme.colors.light};
  text-align: center;
  &:first-of-type {
    ${media.small} {
      margin-bottom: 20px;
    }
  }
  ${media.medium} {
    font-size: 16px;
  }
  a {
    color: ${theme.colors.yellow};
    text-decoration: underline;
    &:hover {
      color: ${theme.colors.light};
    }
  }
`

const Footer = () => {
  return (
    <StyledFooter>
      <StyledContainer>
        <FooterCopy>
          Hari Bhandari, {new Date().getFullYear()}. Made using Gatsby& React
          with Love.{" "}
        </FooterCopy>
      </StyledContainer>
    </StyledFooter>
  )
}

export default Footer
