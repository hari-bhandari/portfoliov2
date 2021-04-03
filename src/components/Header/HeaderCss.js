import media from "../../styles/media"
import theme from "../../styles/theme"
import styled from "styled-components"
export const Head = styled.header`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: ${props =>
    props.bgColor ? props.bgColor : theme.colors.darkBlue};
  padding-left: 1rem;
  padding-right: 1rem;

  ${media.largeUp} {
    padding-left: 100px;
    padding-right: 100px;
  }
`

export const HeaderText = styled.h1`
  margin-bottom: 5px;
  max-width: 900px;
  ${media.medium} {
    max-width: 700px;
  }

  ${media.small} {
    max-width: 500px;
  }
`

export const HeaderCopy = styled.h3`
  max-width: 900px;
  margin-bottom: 15px;

  ${media.medium} {
    font-size: 30px;
  }
`

export const HeaderSubCopy = styled.h5`
  font-size: 20px;
  color: ${theme.colors.gray};
  max-width: 480px;
  margin-bottom: 10px;

  ${media.medium} {
    font-size: 18px;
  }
`

export const HeaderLink = styled.a`
  color: ${theme.colors.yellow};
  /* text-shadow: -1px -1px 0 ${theme.colors.yellow}, 1px -1px 0 ${theme.colors
    .yellow}, -1px 1px 0 ${theme.colors.yellow}, 1px 1px 0 ${theme.colors
    .yellow}; */

  line-height: 44px;

  ${media.medium} {
    font-size: 32px;
  }

  &:hover {
    color: ${theme.colors.darkBlue};
    text-shadow: -1px -1px 0 ${theme.colors.yellow},
      1px -1px 0 ${theme.colors.yellow}, -1px 1px 0 ${theme.colors.yellow},
      1px 1px 0 ${theme.colors.yellow};
    cursor: pointer;
  }
`
