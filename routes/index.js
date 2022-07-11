const shareRouter = require('./share')
const authRouter = require('./auth')

const routes = (app) => {
  app.use('/api/share', shareRouter)
  app.use('/api/auth', authRouter)
}

module.exports = routes
