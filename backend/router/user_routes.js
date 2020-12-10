import express from 'express'
import {
  userLogin,
  userRegister,
} from '../controllers/user'

const userRouter = express.Router()

userRouter.route('/register')
  .post(userRegister)

userRouter.route('/login')
  .post(userLogin)

export default userRouter 