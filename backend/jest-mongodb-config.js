module.exports = {
  mongodbMemoryServerOptions: {
    instance: {
      dbName: 'ea_auth_test'
    },
    binary: {
      version: '4.0.2', // Version of MongoDB
      skipMD5: true
    },
    autoStart: false
  }
}