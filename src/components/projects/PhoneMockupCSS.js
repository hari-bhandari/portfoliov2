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
  border: 0.3vw #999 solid;
  box-shadow: 0 0 0.6666666667vw 0 #777;
  border-radius: 1%;
  height: 20vw;
  width: 35.5729166667vw;
  border: 0.3vw #999 solid;
`

