const { Router } = require('express')
const shareController = require('../app/controllers/ShareController')

const router = Router()

router.get('/', shareController.getSharedVideos)
router.post('/', shareController.addShareVideo)
router.post('/vote', shareController.voteVideo)

module.exports = router
