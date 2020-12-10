import jwt from 'jsonwebtoken'
import config from '../config/main'

export default (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || ''
    const token = authHeader.split(' ')[1]

    if(!token) {
      throw new Error('Token not found')
    }

    const decoded = jwt.verify(token, config.secret)

    req.user = decoded
    next()
  } catch (error) {
    res.status(401).json({
      success: false, 
      message: 'Authentication Failed',
      location: 'TOKEN_AUTHENTICATE'
    })
  }
}