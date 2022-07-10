import shareRouter from './share'
import authRouter from './auth'

const routes = (app) => {
  app.use('/share', shareRouter)
  app.use('/auth', authRouter)
}

export default routes
