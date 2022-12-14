import React, { useState } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../../actions/user_action';
import { useNavigate } from 'react-router-dom';
import Auth from '../../../hoc/auth';

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [checkPassword, setCheckPassword] = useState("")
  const [name, setName] = useState("")

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if(password !== checkPassword){
      return alert('비밀번호가 같지 않습니다.')
    }
    let body = {
      name: name,
      email: email,
      password: password,
    }

    dispatch(registerUser(body))
      .then(response => {
        if(response.payload.success) {
          navigate('/login')
        } else {
          alert('error')
        }
      })
  }

  return (
    <Wrapper>
      <FormWrapper action="" onSubmit={onSubmitHandler}>
        <label htmlFor="">E-mail</label>
        <input type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
        <label htmlFor="">Name</label>
        <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} />
        <label htmlFor="">Password</label>
        <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
        <label htmlFor="">Confirm Password</label>
        <input type="password" value={checkPassword} onChange={(e) => { setCheckPassword(e.target.value) }} />
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

export default Auth(RegisterPage, false)