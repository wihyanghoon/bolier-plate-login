import React, { useState } from 'react'
import styled from 'styled-components'

function LoginPgae() {

  const [email, setEmail] = useState("") 
  const [password, setPassword] = useState("") 

  return (
    <Wrapper>
      <FormWrapper action="">
        <label htmlFor="">E-mail</label>
        <input type="text" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
        <label htmlFor="">Password</label>
        <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
        <br />
        <button>Login</button>
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

export default LoginPgae