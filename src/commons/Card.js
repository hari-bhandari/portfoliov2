import styled from 'styled-components';
import Flex from './Flex';
import {theme} from "../styles";
export const CardFooter = styled(Flex)`
  width: 100%;
  padding: 20px;

  a {
    margin-left: 5px;
  }
`;
export const Card = styled.div`
  margin: 10px;
  flex: 1 1 200px;
  max-width: 300px;
  height: 300px;
  padding: 20px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  text-align: center;
  background-color: ${theme.colors.mayerPurple};
  box-shadow: ${theme.boxShadow};
  border-radius: 10px;
  @media (max-width: 768PX) {
    flex: 1 1 100%;
    margin: 20px auto;
  }
`;