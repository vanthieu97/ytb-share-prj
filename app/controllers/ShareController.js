const axios = require('axios')
const SharedVideo = require('../models/SharedVideo')
const { YOUTUBE_API_KEY } = require('../../constant')

const getVideoData = async (urls) => {
  let str = urls.map(({ url }) => url).join(',')
  const { status, data } = await axios(
    `https://www.googleapis.com/youtube/v3/videos?id=${str}&key=${YOUTUBE_API_KEY}&part=snippet,statistics`,
  )
  if (status !== 200 || data.items.length !== urls.length) {
    return null
  }
  return data.items.map(({ id, snippet, statistics }, index) => ({
    url: id,
    title: snippet.title,
    desc: snippet.description,
    viewCount: statistics.viewCount,
    likeCount: statistics.likeCount,
    sharedBy: urls[index].sharedBy,
  }))
}

const getSharedVideos = async (req, res) => {
  const page = parseInt(req.query.page) || 0
  try {
    const data = await SharedVideo.find({})
      .skip(10 * page)
      .limit(10)
    if (!data.length) {
      return res.json({ total: 0, data: [] })
    }
    const videoData = await getVideoData(data)
    const total = await SharedVideo.countDocuments({})
    res.json({ total, data: videoData })
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
    const response = await axios(`https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${YOUTUBE_API_KEY}`)
    if (response.status !== 200 || !response.data.pageInfo.totalResults) {
      return res.status(404).send({ msg: 'Your URL is not Youtube Video URL!' })
    }
    const shared = await SharedVideo.findOne({ url: id })
    if (shared) {
      return res.status(409).send({ msg: 'Your URL is existed!' })
    }
    const sharedVideo = new SharedVideo({ url: id, sharedBy: email })
    await sharedVideo.save()
    res.send({ msg: 'Your URL shared successfully!' })
  } catch (error) {
    res.status(500).send({ msg: 'Something went wrong!' })
  }
}

module.exports = { getSharedVideos, addShareVideo }
