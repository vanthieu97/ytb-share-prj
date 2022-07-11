import shareRouter from './share'
import authRouter from './auth'

const routes = (app) => {
  app.use('/api/share', shareRouter)
  app.use('/api/auth', authRouter)
}

export default routes
