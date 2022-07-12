const { auth, loginOrRegister, logout } = require('./AuthController')
const User = require('../models/User')
const { dbConnect, dbDisconnect } = require('../../test-utils/db.utils')
const { getHash } = require('../../utils')

describe('AuthController', () => {
  beforeAll(async () => {
    {
      await dbConnect()
      const user = new User({ email: 'test@gmail.com', password: await getHash('12345678') })
      await user.save()
    }
  })

  afterAll(async () => dbDisconnect())

  test('POST /api/auth with not logged in', async () => {
    const req = { session: { loggedIn: false, destroy: jest.fn() } },
      res = { json: jest.fn() }
    await auth(req, res)
    expect(req.session.destroy).toBeCalled()
    expect(res.json).toBeCalled()
    expect(res.json.mock.calls[0][0]).toEqual({ loggedIn: false })
  })

  test('POST /api/auth with logged in', async () => {
    const req = { session: { loggedIn: true, destroy: jest.fn(), email: 'test@gmail.com' } },
      res = { json: jest.fn() }
    await auth(req, res)
    expect(req.session.destroy).not.toBeCalled()
    expect(res.json).toBeCalled()
    expect(res.json.mock.calls[0][0]).toEqual({ loggedIn: true, email: 'test@gmail.com' })
  })

  test('POST/api/auth/login register success', async () => {
    const req = {
        session: { loggedIn: false, destroy: jest.fn() },
        body: { email: 'test1@gmail.com', password: '11111111' },
      },
      res = {
        status: jest.fn(function () {
          return this
        }),
        json: jest.fn(),
      }
    await loginOrRegister(req, res)
    expect(req.session.loggedIn).toBe(true)
    expect(res.json.mock.calls[0][0]).toEqual({ email: 'test1@gmail.com' })
  })

  test('POST/api/auth/login login success', async () => {
    const req = {
        session: { loggedIn: false, destroy: jest.fn() },
        body: { email: 'test@gmail.com', password: '12345678' },
      },
      res = {
        status: jest.fn(function () {
          return this
        }),
        json: jest.fn(),
      }
    await loginOrRegister(req, res)
    expect(req.session.loggedIn).toBe(true)
    expect(res.json.mock.calls[0][0]).toEqual({ email: 'test@gmail.com' })
    req.body.email = 'test1@gmail.com'
  })

  test('POST/api/auth/login login with incorrect password', async () => {
    const user = new User({ email: 'test@gmail.com', password: await getHash('12345678') })
    await user.save()
    const req = {
        session: { loggedIn: false, destroy: jest.fn() },
        body: { email: 'test@gmail.com', password: '12345679' },
      },
      res = {
        status: jest.fn(function () {
          return this
        }),
        json: jest.fn(),
      }
    await loginOrRegister(req, res)
    expect(res.status.mock.calls[0][0]).toBe(401)
    expect(res.json.mock.calls[0][0]).toEqual({ msg: 'Your password is incorrect!' })
  })

  test('POST /api/auth/logout', async () => {
    const req = { session: { destroy: jest.fn() } },
      res = { json: jest.fn() }
    logout(req, res)
    expect(req.session.destroy).toBeCalled()
    expect(res.json).toBeCalled()
    expect(res.json.mock.calls[0][0]).toEqual({ msg: 'Logout successfully!' })
  })
})
