import React, { useEffect, useState } from 'react'
import axios from '../../axios-settings'
import Loading from '../../components/Loading'
import Notification from '../../components/Notification'
import { getErrorMsg } from '../../shared/utility'
import './styles.scss'

const Home = () => {
  const [loading, setLoading] = useState(false)
  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(0)

  const getVideos = async (value) => {
    setLoading(true)
    try {
      const { data } = await axios(`/share?page=${value}`)
      setLoading(false)
      setTotal(data.total)
      setList(data.data)
    } catch (error) {
      setLoading(false)
      Notification.error(getErrorMsg(error))
    }
  }

  useEffect(
    () => {
      getVideos(page)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  const onPageChange = (value) => {
    setPage(value)
    getVideos(value)
  }

  const renderPagination = () => {
    let arr = [],
      maxPage = Math.ceil(total / 10)
    if (maxPage <= 1) {
      return null
    }
    if (maxPage <= 6 || page < 2) {
      arr = [...Array(Math.min(6, maxPage)).keys()]
    } else if (page >= maxPage - 3) {
      for (let i = maxPage - 7; i < maxPage; i++) {
        arr.push(i)
      }
    } else {
      let count = page - 2
      while (arr.length < 6) {
        arr.push(count++)
      }
    }
    return (
      <>
        {page !== 0 && <div className="page">&laquo;</div>}
        {arr.map((value) => (
          <div key={value} className={`page ${page === value ? 'current' : ''}`} onClick={() => onPageChange(value)}>
            {value + 1}
          </div>
        ))}
        {page !== maxPage - 1 && <div className="page">&raquo;</div>}
      </>
    )
  }

  return loading ? (
    <Loading />
  ) : (
    <div className="home-wrapper">
      <div className="shared-list-wrapper">
        {list.length ? (
          list.map((video) => (
            <div key={video.url} className="shared-video-wrapper">
              <iframe title={video.title} src={`https://www.youtube.com/embed/${video.url}?feature=oembed`} />
              <div className="video-info">
                <h4 className="title" title={video.title}>
                  {video.title}
                </h4>
                <p className="shared-by">Shared by: {video.sharedBy}</p>
                <div className="statistics">
                  <div className="count-wrapper">
                    {video.viewCount} <img src="images/view.svg" alt="like" />
                  </div>
                  <div className="count-wrapper">
                    {video.likeCount} <img src="images/like.svg" alt="dislike" />
                  </div>
                </div>
                <div className="desc">
                  Description:<p title={video.desc}>{video.desc}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-video">No video is shared!</p>
        )}
      </div>
      <div className="pagination">{renderPagination()}</div>
    </div>
  )
}

export default Home
