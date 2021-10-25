import React from "react";
import styled from "styled-components";
import { theme, media } from "../../styles";

const ItemsContainer = styled.div`
  position: fixed;
  display: none;
  flex-direction: column;
  right: 40px;
  bottom: 0;
  justify-content: center;
  align-items: center;
  mix-blend-mode: difference;

  ${media.largeUp} {
    display: flex;
  }

  a {
    line-height: 0;
  }
`;

const Line = styled.div`
  height: 100px;
  width: 2px;
  background-color: white;
  margin-bottom: 15px;
`;

const Email = styled.p`
  writing-mode: vertical-rl;
  color: white;
  mix-blend-mode: difference;
  font-family: ${theme.fonts.RobotoMono};
  margin-bottom: 15px;
`;

const SideItemsRight = () => {
  return (

    <ItemsContainer>
      <a href="mailto:2012bhandari.ha@gmail.com">
        <Email>2012bhandari.ha@gmail.com</Email>
      </a>
      <Line />
    </ItemsContainer>
  );
};

export default SideItemsRight;