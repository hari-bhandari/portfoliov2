import styled from 'styled-components'

export const LaptopContainer = styled.div`
  display: block;
  text-align: center;
  margin-bottom: 50px;
  perspective: 700px;
  &hover{
  transform: rotateX(10deg);
  }
`
export const LaptopBody = styled.div`
  display: inline-block;
  background: #eee;
  box-shadow: inset 0 0 0.8vw 0 #333, 0 0 2vw 0 rgba(0, 0, 0, 0.5);
  border-radius: 1vw;
  color: #fff;
  position: relative;
  overflow: hidden;
  transform: rotateX(2deg);
  transition: transform .8s;
`
export const LaptopScreen = styled.div`
  background: #000;
  border: 1vw #999 solid;
  box-shadow: 0 0 0.6666666667vw 0 #777;
  border-radius: 1vw;
  height: 20vw;
  width: 35.5729166667vw;
  border: 0.3vw #999 solid;
`

export const Iframe=styled.iframe`
  height: 100%;
  width: 100%;
  border: none;
  border-radius: 1%;
  overflow: hidden;
`
export const Camera=styled.span`
  position: absolute;
  height: 1vw;
  width: 1vw;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.6);
  box-shadow: inset 0 0 0 4px rgba(0, 0, 0, 0.2);
  z-index: 3;
   top: 0.375vw;
  margin: auto;
`
export const Keyboard=styled.div`
display: block;
  transition: transform .8s;
  margin: 0.5vw auto;
  width: 44.4661458333vw;
  background: #eee;
  height: 1.5vw;
  border-top: 0.3vw #999 solid;
  box-shadow: inset 0 0 0.6666666667vw 0 #777;
  border-bottom-left-radius: 1vw;
  border-bottom-right-radius: 1vw;
  position: relative;
  z-index: 5;`
