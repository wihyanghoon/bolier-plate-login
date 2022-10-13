import React, { useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import Auth from '../../../hoc/auth';

function LandingPage() {
  const navigate = useNavigate()
  useEffect(() => {
    axios.get('/api/hello')
      .then(response => console.log(response.data))
  }, [])

  const onClickHandler = () => {
    axios.get('/api/users/logout')
      .then(response => {
        if(response.data.success){
          navigate('/login')
        } else {
          alert('error')
        }
      })
  }
  return (
    <Wrapper>
      <h2>시작페이지</h2>
      <button onClick={onClickHandler}>로그아웃</button>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default Auth(LandingPage, null)