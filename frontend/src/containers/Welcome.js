import React from 'react'
import { useHistory } from "react-router-dom"

import { Grid, Header, Icon, Button } from 'semantic-ui-react'

function Welcome() {
  const history = useHistory()

  const handleLogOut = ()=> {
    window.localStorage.removeItem('token-ea')
    history.push('/')
  }

  return (
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header icon data-testid="welcomeText">
        <Icon name='building' />
        Welcome
      </Header>
      <Grid.Row>
        <Button 
          onClick={handleLogOut}
          data-testid="logoutBtn"
        >
          Log out
        </Button>
      </Grid.Row>
    </Grid.Column>
  )
}

export default Welcome