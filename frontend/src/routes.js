import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'


import { isAuthenticated } from './helper/auth'

// containers 
import HomePage from './containers/HomePage'
import Welcome from './containers/Welcome'


// Login Route
const LoginRoute = ({ component: Component, ...rest }) => (
  <Route 
    {...rest}
    render={props =>
      !isAuthenticated()
        ? (<Component {...props} />)
        : (<Redirect to='/welcome' />)
    }
  />
)

// Authenticated Routes
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route 
    {...rest}
    render={props =>
      isAuthenticated()
        ? (<Component {...props} />)
        : (<Redirect to='/' />)
    }
  />
)


function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <LoginRoute exact path='/' component={HomePage} />
        <PrivateRoute exact path='/welcome' component={Welcome} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes