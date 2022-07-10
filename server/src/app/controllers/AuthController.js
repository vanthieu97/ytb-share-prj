import bcrypt from 'bcrypt'
import { SALT_ROUNDS } from '../../constant'
import User from '../models/User'

const createSession = (req, res) => {
  req.session.loggedIn = true
  res.cookie('email', req.body.email)
}

const loginOrRegister = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) {
      const hash = await bcrypt.genSalt(SALT_ROUNDS).then((salt) => bcrypt.hash(password, salt))
      await new User({ email, password: hash }).save()
      createSession(req, res)
      return res.send({ msg: 'Register successfully!' })
    }
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      return res.status(401).json({ msg: 'Your password is incorrect!' })
    }
    createSession(req, res)
    res.json({ msg: 'Login successfully!' })
  } catch (error) {
    res.status(500).send({ msg: 'Something went wrong!' })
  }
}

const logout = (req, res) => {
  req.session.loggedIn = false
  res.clearCookie('email')
  res.json({ msg: 'Logout successfully!' })
}

export default { loginOrRegister, logout }
