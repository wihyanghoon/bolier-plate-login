import React, { useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'

function LandingPage() {
  useEffect(() => {
    axios.get('/api/hello')
    .then(response => console.log(response.data))
  }, [])
  return (
    <Wrapper>시작페이지</Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default LandingPage