require('dotenv').config()
const path = require('path')
const express = require('express')
const session = require('express-session')
const cookieParser = require('cookie-parser')
// const morgan = require('morgan')
const cors = require('cors')
const routes = require('./routes')
const db = require('./config/db')

db.connect()
console.log(process.env)
const app = express()
const port = process.env.PORT || 3018

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())
app.use(
  session({
    secret: process.env.SECRET_KEY,
    cookie: { maxAge: 1000 * 60 * 60 },
  }),
)

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200,
  }),
)

routes(app)

// app.use(morgan('combined'))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'build')))

  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
  })
}

app.listen(port, () => console.log(`App listen at http://localhost:${port}`))
