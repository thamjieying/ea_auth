import React, { useState } from 'react'

import { Grid, Header, Message, Button } from 'semantic-ui-react'

import LoginForm from '../components/Login'
import SignUpForm from '../components/SignUp'
import Notification from '../components/Notification'

function HomePage() {
  const [showSignUp, setShowSignUp] = useState(false) 
  const [showNotification, setShowNotification] = useState(false)
  const [notificationMsg, setNotificationMsg] = useState('')
  const [notificationStatus, setNotificationStatus] = useState('')

  const notify = (status, message) => {
    setNotificationMsg(message)
    setNotificationStatus(status)
    setShowNotification(true)
    setTimeout(() => {
      setShowNotification(false)
      setNotificationMsg('')
      setNotificationStatus('')
    }, 3000);
  }

  const renderNotification = () => {
    return showNotification ?
      <Notification status={notificationStatus} message={notificationMsg} /> :
      null
  }

  const renderForm = () => {
    return showSignUp ? 
      <SignUpForm setShowSignUp={setShowSignUp} notify={notify}/> : 
      <LoginForm setShowSignUp={setShowSignUp} notify={notify}/>
  }

  return (
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header 
        as='h2' 
        color={showSignUp ? 'teal': 'green'}
        textAlign='center'>
        {showSignUp ? 'Sign Up' : 'Log-in'}
      </Header>
      {renderForm()}
      <Message>
        {showSignUp ? 'Already have an account ' : 'Register for New Account '}
        <Button onClick={() => setShowSignUp(!showSignUp)}>
          {showSignUp ? 'Log-in' : 'Sign Up'}
        </Button>
      </Message>
      {renderNotification()}
    </Grid.Column>
  )
}

export default HomePage;