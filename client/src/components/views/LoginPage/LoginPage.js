import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../actions/user_action';
import { useNavigate } from 'react-router-dom';
import Auth from '../../../hoc/auth'; //hoc

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const onSubmitHandler = (e) => {
    e.preventDefault();

    let body = {
      email: email,
      password: password,
    }

    dispatch(loginUser(body))
      .then(response => {
        if (response.payload.loginSuccess) {
          navigate('/')
        } else {
          alert(response.payload.message)
        }
      })
  }
  return (
    <Wrapper>
      <FormWrapper action="" onSubmit={onSubmitHandler}>
        <label htmlFor="">E-mail</label>
        <input type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} />
        <label htmlFor="">Password</label>
        <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
        <br />
        <button type='submit'>Login</button>
      </FormWrapper>
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

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
`


export default Auth(LoginPage, false)