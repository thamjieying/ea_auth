'use strict'
import express from 'express'
import mongoose from 'mongoose'

import config from './config/main'
import checkAuth from './middleware/check_auth'

// import routes
import userRoute from './router/user_routes'

const startDb = async() => {
  const mongoURI = config.database
  console.log('Database URI', mongoURI)
  mongoose.set('useCreateIndex', true);
  await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  console.log('Database Connected')
}

const startWebServer = async() => {
  const app = express()
  const port = config.port

  await startDb()

  // MIDDLEWARES
  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())
  app.use((req, res, next)=> {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', '*')
    if(req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH')
      return res.status(200).json({})
    }
    next()
  })
  
  // ROUTES
  app.get('/', checkAuth, (req, res) => res.send('Hello World') ) // test routes
  app.use('/user', userRoute)


  // ERROR HANDLING
  app.use((err, req, res, next) => {
    console.log('test')
    res.status(err.status || 500).json({
      error: {
        message: err.nessage
      }
    })
  })
  
  app.set('port', port)
  app.listen(port, ()=> {
    console.log(`App listening at http://localhost:${port}`)
  })
}

startWebServer()