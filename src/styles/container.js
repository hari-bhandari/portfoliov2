import styled from "styled-components";
import theme from './theme';
import media from './media';
import mixins from "../styles/mixins";
const Container = styled.div`
  ${mixins.flexCenter};
  padding-top: 90px;
  padding-bottom: 90px;
  margin: 0 auto;
  width: 100%;
  max-width: ${theme.maxWidth};

  ${media.medium} {
    padding-top: 70px;
    padding-bottom: 70px;
  }

  ${media.small} {
    padding-top: 60px;
    padding-bottom: 60px;
  }
`;

export default Container;
