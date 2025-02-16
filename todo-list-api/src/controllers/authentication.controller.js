const User = require('../models/user.model.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { TOKEN_SECRET } = require('../config.js')
const createAccessToken = require('../lib/jwt.js')

const userRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body

    const getUser = await User.findOne({ email })

    if (getUser) {
      return res.status(400).json({
        message: ['This email is already associated with an account'],
      })
    }

    const encryptedPassword = await bcrypt.hash(password, 12)

    const newUser = new User({
      username,
      email,
      password: encryptedPassword,
    })

    const user = await newUser.save()

    const token = await createAccessToken({
      id: user._id,
    })

    console.log(token)

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
    })

    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const logIn = async (req, res) => {
  try {
    const { email, password } = req.body
    const getUser = await User.findOne({ email })

    if (!getUser)
      return res.status(400).json({
        message: ['Invalid credentials'],
      })

    const isPasswordEqual = await bcrypt.compare(password, getUser.password)
    if (!isPasswordEqual) {
      return res.status(400).json({
        message: ['Invalid credentials'],
      })
    }

    const token = await createAccessToken({
      id: getUser._id,
      username: getUser.username,
    })

    res.cookie('token', token, {
      httpOnly: process.env.NODE_ENV !== 'development',
      secure: true,
      sameSite: 'none',
    })

    res.json({
      id: getUser._id,
      username: getUser.username,
      email: getUser.email,
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

const validateToken = async (req, res) => {
  const { token } = req.headers.cookies
  if (!token) return res.send(false)

  jwt.verify(token, TOKEN_SECRET, async (error, user) => {
    if (error) return res.sendStatus(401)

    const userFound = await User.findById(user.id)
    if (!userFound) return res.sendStatus(401)

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    })
  })
}

module.exports = { userRegister, logIn, validateToken }
