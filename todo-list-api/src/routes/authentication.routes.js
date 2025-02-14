const { Router } = require('express')
const { userRegister } = require('../controllers/authentication.controller.js')

const router = Router()

router.post('/register', userRegister)

module.exports = router
