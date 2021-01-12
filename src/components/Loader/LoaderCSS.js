import styled from "styled-components";
import mixins from "../../styles/mixins";
import theme from "../../styles/theme";
const { colors } = theme;
export const StyledContainer = styled.div`
  ${mixins.flexCenter};
  background-color: ${colors.darkBlue};
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
  body{
    background-color:#041732 ;
  }

  .logo-wrapper {
    width: max-content;
    max-width: 100px;
    transition: var(--transition);
    opacity: ${props => (props.isMounted ? 1 : 0)};

    svg {
      display: block;
      width: 100%;
      height: 100%;
      margin: 0 auto;
      fill: none;
      user-select: none;

      #B {
        opacity: 0;
      }
    }
  }

\` ;
`;
export const StyledLogo = styled.div`
  width: max-content;
  max-width: 400px;
  transition: ${theme.transition};
  opacity: ${props => (props.isMounted ? 1 : 0)};
  svg {
    width: 100%;
    height: 100%;
    display: block;
    margin: 0 auto;
    fill: none;
    user-select: none;
    #B {
      opacity: 0;
    }
  }
`;
