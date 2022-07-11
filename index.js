const path = require('path')
const express = require('express')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const cors = require('cors')
const routes = require('./routes')
const db = require('./config/db')

db.connect()

const app = express()
const port = 3018

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())
app.use(
  session({
    secret: 'REMITANO',
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

app.use(morgan('combined'))

app.use(express.static(path.join(__dirname, 'build')))

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(port, () => console.log(`App listen at http://localhost:${port}`))