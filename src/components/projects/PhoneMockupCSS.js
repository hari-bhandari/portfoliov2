import styled from 'styled-components'
import media from "../../styles/media";
export const LaptopContainer = styled.div`
display: inline-block;
  width: 100%;
  margin: 0 auto;
  padding: 2em;
`
export const LaptopBody = styled.div`
display: inline-block;

   position: relative;
  width: 30vw;
  height: 340px;
  margin: 0 auto;
  min-width: 300px;
  border: 15px solid #3f3f41;
  border-top: 20px solid #3f3f41;
  border-radius: 14px 14px 0 0;
  margin: 0 0 90px 0;
  box-shadow: 0 0 0 1px #d1d2d4;  
  @media (max-width: 856px) {
  width: 80%;
  height: 200px;
  }
  &:before{
   content: "";
  bottom: -35px;
  background: #e6e8e7;
  height: 20px;
  width: calc(30vw + 70px);
  min-width: 370px;
  border-radius: 0 0 10px 10px;
  position: absolute;
  left: 50%;
  -webkit-transform: translateX(-50%);
          transform: translateX(-50%);
  }
  @media (max-width: 856px) {
  width: 100%;
  }
  
  
  &:after{
  content: "";
  top: -12px;
  width: 3px;
  height: 3px;
  background: #e6e8e7;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  -webkit-transform: translateX(-50%);
          transform: translateX(-50%);
  }

  
  
`

export const Iframe=styled.iframe`
  height: 100%;
  width: 100%;
  border: none;
  border-radius: 1%;
  overflow: hidden;
`
