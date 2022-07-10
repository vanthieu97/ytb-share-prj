import React from 'react'
import './styles.scss'

const data = new Array(10).fill({
  title: 'Movie Title',
  sharedBy: 'vanthieunguyen234@gmail.com',
  likeCount: 89,
  dislikeCount: 12,
  desc: `* Chỉ đơn giản rằng Chang chia sẻ các bài hát mà có thể bạn chưa bao giờ được nghe.
  * Nếu có bất cứ thắc mắc, khiếu nại nào về bản quyền hình ảnh cũng như âm nhạc có trong video mong chủ sở hữu liên hệ trực tiếp qua thông tin bên dưới
  * Nhận phát hành các bản lo-fi, Indie, acoustic, nhạc chill... chỉ cần phù hợp với channel là Support liền ^^`,
  url: 'https://www.youtube.com/embed/DQv1MNqhNqM',
})

const Home = () => {
  return (
    <div className="home-wrapper">
      <div className="shared-list-wrapper">
        {data.map((video) => (
          <div className="shared-video-wrapper">
            <iframe title={video.title} src={`${video.url}?feature=oembed`} />
            <div className="video-info">
              <h4 className="title">{video.title}</h4>
              <p className="shared-by">Shared by: {video.sharedBy}</p>
              <div className="statistics">
                <div className="count-wrapper">
                  {video.likeCount} <img src="images/like.svg" alt="like" />
                </div>
                <div className="count-wrapper">
                  {video.likeCount} <img src="images/dislike.svg" alt="dislike" />
                </div>
              </div>
              <div className="desc">
                Description:<p>{video.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        {[1, 2, 3, 4].map((value) => (
          <div key={value} className="page">
            {value}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
