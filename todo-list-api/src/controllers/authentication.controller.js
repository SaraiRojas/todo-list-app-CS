const User = require('../models/user.model.js')
const bcrypt = require('bcryptjs')
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

    res.cookie('token', token, {
      httpOnly: process.env.NODE_ENV !== 'development',
      secure: true,
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

module.exports = { userRegister }
