const { Router } = require('express')
const authController = require('../app/controllers/AuthController')

const router = Router()

router.post('/', authController.auth)
router.post('/login', authController.loginOrRegister)
router.post('/logout', authController.logout)

module.exports = router
