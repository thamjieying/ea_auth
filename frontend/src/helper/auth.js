import jwt from 'jsonwebtoken'
import config from '../config/main'

export function isAuthenticated () {

  const token = window.localStorage.getItem('token-ea')
  if (token === null) {
    return false
  } 
  try {
    jwt.verify(token, config.secret)
    return true
  } catch (err) {
    window.localStorage.removeItem('token-ea')
    console.error(err)
    return false
  }
}