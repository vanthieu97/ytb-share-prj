import path from 'path'
import express from 'express'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import routes from './routes'
import db from './config/db'

db.connect()

const app = express()
const port = 3018

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())
app.use(session({ secret: 'REMITANO', cookie: { maxAge: 60 } }))

routes(app)

app.use(express.static(path.join(__dirname, 'public')))

app.use(morgan('combined'))

app.listen(port, () => console.log(`App listen at http://localhost:${port}`))
