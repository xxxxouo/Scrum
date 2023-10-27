import React from 'react'
import styled, { keyframes } from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`
const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`
const Img = styled.img`
  border-radius: 50%;
  animation: ${rotate} 2s linear infinite;
  width:${({size})=> size || '16px'};
  height:${({size})=> size || '16px'};
`
function PageLoader() {
  return (
    <Wrapper>
      <Img src="/images/loading.jpg" size='80px' alt="" ></Img>
    </Wrapper>
  )
}

export default PageLoader