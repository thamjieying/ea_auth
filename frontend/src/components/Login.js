import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from "react-router-dom"

import { Button, Form, Segment } from 'semantic-ui-react'

import config from '../config/main'

const LoginForm = (props) => {
  const { notify } = props
  const history = useHistory()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault();
    const form = {
      email, password
    }
    let response

    try {
      response = await axios({
        method: 'post', 
        url: config.url + '/user/login',
        data: form
      })

      if(response && response.data.success){
        window.localStorage.setItem('token-ea', response.data.data.token)
        history.push('/welcome')
      }
    } catch (error) {
      console.error('login error', error.response)
      const errorData = error.response && error.response.data
      notify('error', (errorData && errorData.message) || error.message)
    }
  }

  return (
    <Form size='large' onSubmit={handleLogin}>
      <Segment stacked>
        <Form.Input 
          fluid icon='user' 
          iconPosition='left' 
          placeholder='E-mail address' 
          value={email}
          onChange={e=> setEmail(e.target.value)}
        />
        <Form.Input
          fluid
          icon='lock'
          iconPosition='left'
          placeholder='Password'
          type='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <Button 
          color='green' 
          fluid 
          size='large' 
          type='submit'
        >
          Login
        </Button>
      </Segment>
    </Form>
  )
}

export default LoginForm