import React from 'react'
import { Link } from 'react-router-dom'
import './styles.scss'

const NotFound = () => {
  return (
    <div className="not-found-wrapper">
      <div>Page Not Found</div>
      <Link to="/">home page</Link>
    </div>
  )
}

export default NotFound
