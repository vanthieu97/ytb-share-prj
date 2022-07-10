import { Router } from 'express'
import authController from '../app/controllers/AuthController'

const router = Router()

router.post('/login', authController.loginOrRegister)
router.post('/logout', authController.logout)

export default router
