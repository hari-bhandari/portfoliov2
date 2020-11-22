import styled from "styled-components";
import mixins from "../../styles/mixins";
import theme from "../../styles/theme";
const { colors } = theme;
export const StyledContainer = styled.div`
  ${mixins.flexBetween};
  background-color: ${colors.darkBlue};
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;\
  right: 0;
  z-index: 99;
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
