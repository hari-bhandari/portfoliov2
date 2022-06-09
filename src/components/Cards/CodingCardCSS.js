import styled from "styled-components"

import { slideDownKeyframe } from "../CssAnimations"
import theme from "../../styles/theme"
export const HeroCardWrapper = styled.div`
  width: calc(100%);
  background: ${theme.colors.dark};
  position: relative;
  animation: ${slideDownKeyframe} 0.3s cu bic-bezier(0.25, 0.46, 0.45, 0.94) 0s
    forwards;
`
export const CodeCardWrapper = styled.div`
  padding: 30px 35px;
  border-radius: 10px;
  background-color: ${theme.dark};
  box-shadow: ${theme.boxShadow};
  pre {
    font-size: 1rem;
    font-family: ${theme.fontFamily};
    color: white;
  }
`

export const ColorPaletteWrapper = styled.div`
  position: absolute;
  bottom: -40px;
  left: 20%;
  display: flex;
  justify-content: space-around;
  background-color: ${theme.dark};
  box-shadow: ${theme.boxShadow};
  padding: 8px;
  border-radius: 5px;
  svg {
    height: 3em;
    width: 3em;
    margin-left: 1.5em;
    color: white;
    cursor: pointer;
    &:hover{
      color: #8579f9;
    }
  }
  .selected {
    border-style: solid;
    color: #8579f9;
  }
`

