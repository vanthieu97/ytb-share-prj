import React from 'react'
import './styles.scss'

const Share = () => {
  return (
    <div className="share-wrapper">
      <div className="share-title">
        <span>Share a Youtube movie</span>
      </div>
      <form className="share-content">
        <div className="field-wrapper">
          <span className="label">Youtube URL:</span>
          <input type="url" name="url" placeholder="Youtube URL" className="field" />
        </div>
        <div className="field-wrapper no-label">
          <input type="submit" value="Share" className="field" />
        </div>
      </form>
    </div>
  )
}

export default Share
