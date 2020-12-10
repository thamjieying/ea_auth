import React, { useState } from 'react'
import axios from 'axios'

import { Button, Form, Segment } from 'semantic-ui-react'

import config from '../config/main'

const SignUpForm = (props) => {
  const { setShowSignUp, notify } = props
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')



  const clearForm = () => {
    setEmail('')
    setPassword('')
  }

  const handleSignup = async(event) => {
    event.preventDefault();
    const form = {
      email, 
      password, 
    }
    let response 
    try {
      response = await axios({
        method: 'post', 
        url: config.url + '/user/register', 
        data: form
      })
      if (response && response.data.success) {
        // notification 
        notify('positive', 'User Created Successfully. Please Login')
        clearForm()
        setShowSignUp(false)
      }
    }catch(error){
      console.error('error signing up', error.response)
      const errorData = error.response && error.response.data
      notify('error', (errorData && errorData.message) || error.message)
    }
  }

  return (
    <Form size='large' onSubmit={handleSignup}>
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

        <Button color='teal' fluid size='large' type='submit'>
          SignUp
        </Button>
      </Segment>
    </Form>
  )

}

export default SignUpForm