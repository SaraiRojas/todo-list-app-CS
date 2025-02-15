const { Router } = require('express')
const {
  userRegister,
  logIn,
  validateToken,
} = require('../controllers/authentication.controller.js')

const router = Router()

router.post('/register', userRegister)
router.post('/login', logIn)
router.get('/validateToken', validateToken)

module.exports = router
