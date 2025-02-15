const mongoose = require('mongoose')

const MONGODB_URL =
  'mongodb+srv://sararsandoval:Chocococo9@todo-list-db.v2jvs.mongodb.net/?retryWrites=true&w=majority&appName=todo-list-db'

const dbConnection = async () => {
  try {
    await mongoose.connect(MONGODB_URL)
    console.log('MongoDB connected')
  } catch (err) {
    throw new Error(err)
  }
}

module.exports = dbConnection
