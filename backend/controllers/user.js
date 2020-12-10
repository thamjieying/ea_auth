import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import User from '../models/user'
import config from '../config/main'

const saltRounds = 10

const userRegister = async (req, res, next) => {
  const formData = req.body
  // Verify Duplicate email
  let user
  try {
    user = await User.findOne({ email: formData.email })
    if(user) {
      return res.status(403).json({
        success: false,
        message: 'Duplicate email',
        location: 'VALIDATE_DUPLICATE_USER',
      })
    }
  } catch (error) {
    console.error('err validataion', error)
    return res.status(400).json({
      success: false,
      message: "Server Error, Please Try Again.",
      location: 'VALIDATE_DUPLICATE_USER'
    })
  }
  // create new user
  try {
    // hash password
    const hashPassword = await bcrypt.hash(formData.password, saltRounds)

    user = await User.create({
      email: formData.email, 
      password: hashPassword,
      active: true
    })
  } catch (error) {
    console.error('error creating user', error)
    res.status(400).json({
      success: false,
      message: "Server Error, Please Try Again.", 
      location: 'CREATE_USER'
    })
    return
  }
  console.log('USER CREATED')
  res.status(201).json({ success: true, message: 'user created' })
}

//login Routes
const userLogin = async (req, res, next) => {
  const { email, password } = req.body
  let user
  try {
    user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({
        success: false, 
        message: 'Authorization Fail',
        location: 'USER_LOGIN'
      })
    }
    if (!user.active) {
      return res.status(401).json({
        success: false,
        message: 'Authorization Fail',
        location: 'USER_LOGIN'
      })
    }
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Server Error: ' + error.message,
      location: 'USER_LOGIN'
    })
  }

  // compare password
  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: 'Authorization Fail',
      location: 'USER_LOGIN'
    })
  }

  const payload = {
    _id: user._id,
    username: user.email
  }

  // create a token 
  const token = jwt.sign(payload, config.secret, { expiresIn: "1h" })

  return res.status(200).json({
    success: true, 
    message: 'Login Success', 
    data: {
      token, 
      user: payload
    }
  })
}

export {
  userRegister,
  userLogin,
}
