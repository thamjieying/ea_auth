import "core-js/stable";
import "regenerator-runtime/runtime";
import mongoose from 'mongoose'

import dbHandler from '../dbHandler'
import UserModel from '../../models/user'

const userData = {
  email: 'test@test.com', 
  password: 'anypassword'
}

describe('User Model Test', ()=> {
  beforeAll(async()=> await dbHandler.connect())
  afterEach(async()=> await dbHandler.clearDatabase())
  afterAll(async()=> await dbHandler.closeDatabase())

  test('Saving New User', async ()=> {
    const validUser = new UserModel(userData)
    const savedUser = await validUser.save()
    
    expect(savedUser._id).toBeDefined()
    expect(savedUser.email).toBe(userData.email)
    expect(savedUser.password).toBe(userData.password)
  })

  test('Saving User with fields not defined', async ()=> {
    const invalidUserData = {...userData, name: 'testing'}
    const userWithInvalidField = new UserModel(invalidUserData)
    const savedUser = await userWithInvalidField.save()

    expect(savedUser._id).toBeDefined()
    expect(savedUser.name).toBeUndefined()
  })

  test('Saving User without Email', async()=> {
    const userWithoutEmail = new UserModel({ password: 'somepassword' })
    try {
      await userWithoutEmail.save()
    } catch (error) {
      expect(error).toBeInstanceOf(mongoose.Error.ValidationError)
      expect(error.errors.email).toBeDefined()
    }
  })

  test('Saving User Duplicate Email', async()=> {
    const user1 = new UserModel(userData)
    const user2 = new UserModel(userData)
    try {
      await user1.save()
      await user2.save()
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
    }
  })

  test('Saving User without Password', async()=> {
    const userWitoutPassWord = new UserModel({ email: 'test@test.com' })

    try {
      await userWitoutPassWord.save()
    } catch (error) {
      expect(error).toBeInstanceOf(mongoose.Error.ValidationError)
      expect(error.errors.password).toBeDefined()
    }

  })
})