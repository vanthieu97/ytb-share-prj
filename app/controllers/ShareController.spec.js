require('dotenv').config()
const { getSharedVideos, addShareVideo, voteVideo } = require('./ShareController')
const SharedVideo = require('../models/SharedVideo')
const { dbConnect, dbDisconnect } = require('../../test-utils/db.utils')
const { DISLIKE, LIKE } = require('../../constant')

describe('ShareController', () => {
  beforeAll(async () => {
    {
      await dbConnect()
      const video = new SharedVideo({
        url: '9zV2Fl7cEdk',
        title: 'Title',
        desc: 'Description',
        sharedBy: 'test@gmail.com',
      })
      await video.save()
    }
  })

  afterAll(async () => dbDisconnect())

  test('GET /api/share get list shared video', async () => {
    const req = { query: {}, session: {} },
      res = {
        status: jest.fn(function () {
          return this
        }),
        json: jest.fn(),
      }
    await getSharedVideos(req, res)
    expect(res.json.mock.calls[0][0].total).toBe(1)
    expect(res.json.mock.calls[0][0].data[0].vote).toBe('')
  })

  test('POST /api/share add new shared video without login', async () => {
    const req = { body: {}, session: {} },
      res = {
        status: jest.fn(function () {
          return this
        }),
        json: jest.fn(),
      }
    await addShareVideo(req, res)
    expect(res.status.mock.calls[0][0]).toBe(401)
  })

  test('POST /api/share add new shared video with empty url', async () => {
    const req = { body: { url: '' }, session: { email: 'test@gmail.com' } },
      res = {
        status: jest.fn(function () {
          return this
        }),
        json: jest.fn(),
      }
    await addShareVideo(req, res)
    expect(res.status.mock.calls[0][0]).toBe(400)
  })

  test('POST /api/share add new shared video with invalid url', async () => {
    const req = { body: { url: 'invalid url' }, session: { email: 'test@gmail.com' } },
      res = {
        status: jest.fn(function () {
          return this
        }),
        json: jest.fn(),
      }
    await addShareVideo(req, res)
    expect(res.status.mock.calls[0][0]).toBe(500)
  })

  test('POST /api/share add new shared video with not youtube url', async () => {
    const req = { body: { url: 'https:/youtu.be/not-youtube-url' }, session: { email: 'test@gmail.com' } },
      res = {
        status: jest.fn(function () {
          return this
        }),
        json: jest.fn(),
      }
    await addShareVideo(req, res)
    expect(res.status.mock.calls[0][0]).toBe(404)
  })

  test('POST /api/share add new shared video with existed url', async () => {
    const req = { body: { url: 'https:/youtu.be/9zV2Fl7cEdk' }, session: { email: 'test@gmail.com' } },
      res = {
        status: jest.fn(function () {
          return this
        }),
        json: jest.fn(),
      }
    await addShareVideo(req, res)
    expect(res.status.mock.calls[0][0]).toBe(409)
  })

  test('POST /api/share add new shared video success', async () => {
    const req = { body: { url: 'https:/youtu.be/ENkgqQlbc8Y' }, session: { email: 'test@gmail.com' } },
      res = {
        status: jest.fn(function () {
          return this
        }),
        json: jest.fn(),
      }
    await addShareVideo(req, res)
    expect(res.json.mock.calls[0][0]).toEqual({ msg: 'Your URL shared successfully!' })
  })

  test('POST /api/vote vote video without login', async () => {
    const req = { body: { url: 'ENkgqQlbc8Y', vote: LIKE }, session: {} },
      res = {
        status: jest.fn(function () {
          return this
        }),
        json: jest.fn(),
      }
    await voteVideo(req, res)
    expect(res.status.mock.calls[0][0]).toBe(401)
  })

  test('POST /api/vote vote video with empty url', async () => {
    const req = { body: { url: '', vote: LIKE }, session: { email: 'test@gmail.com' } },
      res = {
        status: jest.fn(function () {
          return this
        }),
        json: jest.fn(),
      }
    await voteVideo(req, res)
    expect(res.status.mock.calls[0][0]).toBe(400)
    expect(res.json.mock.calls[0][0]).toEqual({ msg: 'Your URL is empty!' })
  })

  test('POST /api/vote vote video with invalid vote', async () => {
    const req = { body: { url: '9zV2Fl7cEdk', vote: 'invalid' }, session: { email: 'test@gmail.com' } },
      res = {
        status: jest.fn(function () {
          return this
        }),
        json: jest.fn(),
      }
    await voteVideo(req, res)
    expect(res.status.mock.calls[0][0]).toBe(400)
    expect(res.json.mock.calls[0][0]).toEqual({ msg: 'Your vote is invalid!' })
  })

  test('POST /api/vote vote video with not existed url', async () => {
    const req = { body: { url: 'wrong-url', vote: LIKE }, session: { email: 'test@gmail.com' } },
      res = {
        status: jest.fn(function () {
          return this
        }),
        json: jest.fn(),
      }
    await voteVideo(req, res)
    expect(res.status.mock.calls[0][0]).toBe(404)
    expect(res.json.mock.calls[0][0]).toEqual({ msg: 'Your URL is not existed!' })
  })

  test('POST /api/vote vote video with voted user', async () => {
    const video = new SharedVideo({
      url: 'xzBA-j5x31I',
      title: 'Title',
      desc: 'Description',
      sharedBy: 'test@gmail.com',
      likes: ['test@gmail.com'],
      likeCount: 1,
      dislikeCount: 100,
    })
    await video.save()
    const req = { body: { url: 'xzBA-j5x31I', vote: LIKE }, session: { email: 'test@gmail.com' } },
      res = {
        status: jest.fn(function () {
          return this
        }),
        json: jest.fn(),
      }
    await voteVideo(req, res)
    expect(res.json.mock.calls[0][0]).toEqual({ msg: 'You voted this video!' })
  })

  test('POST /api/vote vote video successfully', async () => {
    const req = { body: { url: '9zV2Fl7cEdk', vote: LIKE }, session: { email: 'test@gmail.com' } },
      res = {
        status: jest.fn(function () {
          return this
        }),
        json: jest.fn(),
      }
    await voteVideo(req, res)
    expect(res.json.mock.calls[0][0]).toEqual({ msg: 'Vote video successfully!' })
  })
})
