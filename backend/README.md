# Backend

## Setup
1. Add an environment file '.env' at the root of backend project
2. Add the require variables as shown in the example below
```
NODE_ENV="development"
SESSION_SECRET="exampleSecret"
PORT="3001"

MONGODB_DEV="mongodb://mongo:27017/ea_auth"
MONGODB_TEST="mongodb://mongo:27017/ea_auth_test"
```

## Runing backend
### Running with docker
1. ensure the the mongodb url has the naming format below
`mongodb://mongo:{port}/{database_name}`
2. run `docker-compose up` at the root of the backend folder
3. backend should be accessible at port 3001

### Running using npm script
1. ensure that you have mongoDB install on your server

you may check if mongoDB is downloaded with the command below
`mongo --version`
2. ensure the the mongodb url has the naming format below
`mongodb://localhost:{port}/{database_name}`
3. run `npm start` at the root of the backend folder

## Running Test
1. ensure that MONGODB_TEST is defined in the '.env' file
2. update `dbName` with the database name defined for the test database under 'jest.mongodb-config.js' file.
```js
module.exports = {
  mongodbMemoryServerOptions: {
    instance: {
      dbName: 'database_name_for_testing'
    },
  ...
}
```
3. run `npm test`


## Future Improvements
- Testing for middlewares and controllers
- Authentication Logic for MicroServices using OAuth
