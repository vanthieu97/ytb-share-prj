import express from 'express'
import shareController from '../app/controllers/ShareController'

const router = express.Router()

router.get('/', shareController.getSharedVideos)
router.post('/', shareController.addShareVideo)

export default router
