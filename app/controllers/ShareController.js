const axios = require('axios')
const SharedVideo = require('../models/SharedVideo')
const { LIKE, DISLIKE } = require('../../constant')

const getSharedVideos = async (req, res) => {
  const email = req.cookies.email
  const page = parseInt(req.query.page) || 0
  try {
    const data = await SharedVideo.find({})
      .skip(10 * page)
      .limit(10)
    if (!data.length) {
      return res.json({ total: 0, data: [] })
    }
    const total = await SharedVideo.countDocuments({})
    let list
    if (!email) {
      list = data.map(({ url, title, desc, likeCount, dislikeCount }) => ({
        url,
        title,
        desc,
        likeCount,
        dislikeCount,
        vote: '',
      }))
    } else {
      list = data.map(({ url, title, desc, likes, dislikes, likeCount, dislikeCount }) => ({
        url,
        title,
        desc,
        likeCount,
        dislikeCount,
        vote: likes.includes(email) ? LIKE : dislikes.includes(email) ? DISLIKE : '',
      }))
    }
    res.json({ total, data: list })
  } catch (error) {
    return res.status(500).send({ msg: 'Something went wrong!' })
  }
}

const addShareVideo = async (req, res) => {
  const email = req.cookies.email
  if (!email) {
    return res.status(401).json({ msg: 'You must login to share your video!' })
  }
  const { url } = req.body
  if (!url) {
    return res.status(400).send({ msg: 'Your URL is invalid!' })
  }
  const object = new URL(url)
  let id
  if (object.host === 'www.youtube.com') {
    id = object.searchParams.get('v')
  } else if (object.host === 'youtu.be') {
    id = object.pathname.slice(1)
  }
  if (!id) {
    return res.status(404).send({ msg: 'Your URL is not Youtube Video URL!' })
  }
  try {
    const { status, data } = await axios(
      `https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${process.env.YOUTUBE_API_KEY}&part=snippet,statistics`,
    )
    if (status !== 200 || !data.pageInfo.totalResults) {
      return res.status(404).send({ msg: 'Your URL is not Youtube Video URL!' })
    }
    const shared = await SharedVideo.findOne({ url: id })
    if (shared) {
      return res.status(409).send({ msg: 'Your URL is existed!' })
    }
    const sharedVideo = new SharedVideo({
      url: id,
      sharedBy: email,
      title: data.items[0].snippet.title,
      desc: data.items[0].snippet.description,
    })
    await sharedVideo.save()
    res.send({ msg: 'Your URL shared successfully!' })
  } catch (error) {
    res.status(500).send({ msg: 'Something went wrong!' })
  }
}

const voteVideo = async (req, res) => {
  const email = req.cookies.email
  if (!email) {
    return res.status(401).json({ msg: 'You must login to vote video!' })
  }
  const { url, vote } = req.body
  if (!url) {
    return res.status(400).send({ msg: 'Your URL is invalid!' })
  }
  if (!vote || ![LIKE, DISLIKE].includes(vote)) {
    return res.status(400).send({ msg: 'Your vote is invalid!' })
  }
  try {
    const video = await SharedVideo.findOne({ url })
    if (!video) {
      return res.status(404).send({ msg: 'Your URL is not existed!' })
    }
    if (video.likes.includes(email) || video.dislikes.includes(email)) {
      return res.status(409).send({ msg: 'You voted this video!' })
    }
    if (vote === LIKE) {
      await SharedVideo.updateOne(
        { _id: video.id },
        {
          likeCount: video.likeCount + 1,
          likes: [...video.likes, email],
        },
      )
    } else {
      await SharedVideo.updateOne(
        { _id: video.id },
        {
          dislikeCount: video.dislikeCount + 1,
          dislikes: [...video.dislikes, email],
        },
      )
    }
    res.json({ msg: 'Vote video successfully!' })
  } catch (error) {
    res.status(500).send({ msg: 'Something went wrong!' })
  }
}

module.exports = { getSharedVideos, addShareVideo, voteVideo }
