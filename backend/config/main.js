import dotenv from 'dotenv'
dotenv.config({ silent: true })

const envVar = {
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT,
  secret: process.env.SESSION_SECRET,
  database: process.env.MONGODB_DEV,
  databaseTest: process.env.MONGODB_TEST,
}

export default envVar