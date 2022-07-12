const bcrypt = require('bcrypt')
const User = require('../models/User')
const { getHash } = require('../../utils')

const createSession = (req) => {
  req.session.loggedIn = true
  req.session.email = req.body.email
}

const auth = async (req, res) => {
  if (!req.session.loggedIn) {
    req.session.destroy()
    return res.json({
      loggedIn: false,
    })
  }
  res.json({
    loggedIn: true,
    email: req.session.email,
  })
}

const loginOrRegister = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) {
      const hash = await getHash(password)
      await new User({ email, password: hash }).save()
      createSession(req)
      return res.json({ email })
    }
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      return res.status(401).json({ msg: 'Your password is incorrect!' })
    }
    createSession(req)
    res.json({ email })
  } catch (error) {
    res.status(500).send({ msg: 'Something went wrong!' })
  }
}

const logout = (req, res) => {
  req.session.destroy()
  res.json({ msg: 'Logout successfully!' })
}

module.exports = { auth, loginOrRegister, logout }
