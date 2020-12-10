import "core-js/stable"
import "regenerator-runtime/runtime"
import mongoose from 'mongoose'

import dbHandler from '../dbHandler'
import { mockRequest, mockResponse } from '../interceptor'
import {
  userLogin,
  userRegister,
} from '../../controllers/user'

const userData = {
  email: 'test@test.com',
  password: 'anypassword'
}

describe('Test userRegister Method', ()=> {
  beforeAll(async () => await dbHandler.connect())
  afterEach(async () => await dbHandler.clearDatabase())
  afterAll(async () => await dbHandler.closeDatabase())

  test('Register Valid User', async ()=> {
    const req = mockRequest()
    const res = mockResponse()

    req.body = userData
    await userRegister(req, res)

    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith({ success: true, message: 'user created' })
  })

  test('Register Duplicate User', async()=> {
    const req = mockRequest()
    const res = mockResponse()

    req.body = userData
    await userRegister(req, res)
    
    const req2 = mockRequest()
    const res2 = mockResponse()

    req2.body = userData    
    await userRegister(req2, res2)
    expect(res2.status).toHaveBeenCalledWith(403)
    expect(res2.json).toHaveBeenCalledWith({
      success: false,
      message: 'Duplicate email',
      location: 'VALIDATE_DUPLICATE_USER',
    })
  })
})

describe('Test userLogin Method', ()=> {
  beforeAll(async () =>{
    await dbHandler.connect()
    const req = mockRequest()
    const res = mockResponse()
    req.body = userData
    await userRegister(req, res)
  }) 
  afterAll(async () => {
    await dbHandler.clearDatabase()
    await dbHandler.closeDatabase()
  })

  test('UserLogin', async()=> {
    const req = mockRequest()
    const res = mockResponse()
    req.body = userData
    await userLogin(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        message: expect.any(String),
        data: expect.any(Object)
      })
    )
  })
  test('fail to login with incorrect password', async()=> {
    const req = mockRequest()
    const res = mockResponse()
    req.body = {...userData, password: 'wrongpassword'}
    await userLogin(req, res)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Authorization Fail',
      location: 'USER_LOGIN'
    })
  })

  test('user does not exist', async()=> {
    const req = mockRequest()
    const res = mockResponse()
    req.body = { email: 'nobody@teset.com', password: 'somepassword' }
    await userLogin(req, res)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Authorization Fail',
      location: 'USER_LOGIN'
    })
  })
})