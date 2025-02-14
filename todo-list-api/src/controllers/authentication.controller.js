const User = require('../models/user.model.js')

const userRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body

    const getUser = await User.findOne({ email })

    if (getUser) {
      return res.status(400).json({
        message: ['This email is already associated with an account'],
      })
    }

    const newUser = new User({
      username,
      email,
      password: password,
    })

    const user = await newUser.save()

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
