import styled, { keyframes } from "styled-components"

export const LoaderContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  top: 0;
  left: 0;
  background: #292970;
  display: -webkit-box;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  -webkit-box-align: stretch;
  align-items: stretch;
  -webkit-box-pack: center;
  justify-content: center;
  align-content: center;
`
export const FlexClass = styled.div`
  min-height: 60pt;
`
const loading = keyframes`
  0% {
    width: 50pt;
    height: 50pt;
    margin-top: 0;
  }
  25% {
    height: 4pt;
    margin-top: 23pt;
  }
  50% {
    width: 4pt;
  }
  75% {
    width: 50pt;
  }
  100% {
    width: 50pt;
    height: 50pt;
    margin-top: 0;
  } 
`

export const Loaders = styled.div`
  width: 50pt;
  height: 50pt;
  border-radius: 100%;
  border: #ffffff 4pt solid;
  margin-left: auto;
  margin-right: auto;
  background-color: transparent;
  -webkit-animation: ${loading} 1s infinite;
  animation: ${loading} 1s infinite;
`
