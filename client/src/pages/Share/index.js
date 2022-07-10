import React, { useState } from 'react'
import axios from '../../axios-settings'
import Notification from '../../components/Notification'
import { getErrorMsg } from '../../shared/utility'
import './styles.scss'

const Share = () => {
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const formData = new FormData(e.target)
      await axios.post('share', { url: formData.get('url') })
      setLoading(false)
      Notification.success('Your URL shared successfully!')
    } catch (error) {
      setLoading(false)
      Notification.error(getErrorMsg(error))
    }
  }

  return (
    <div className="share-wrapper">
      <div className="share-title">
        <span>Share a Youtube movie</span>
      </div>
      <form className="share-content" onSubmit={onSubmit}>
        <div className="field-wrapper">
          <span className="label">Youtube URL:</span>
          <input type="url" name="url" placeholder="Youtube URL" className="field" required />
        </div>
        <div className="field-wrapper no-label">
          <input type="submit" value="Share" className="field" disabled={loading} />
        </div>
      </form>
    </div>
  )
}

export default Share
