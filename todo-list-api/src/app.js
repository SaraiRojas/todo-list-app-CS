const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/authentication.routes.js')
const taksRoutes = require('./routes/task.routes.js')

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api', taksRoutes)

module.exports = app
