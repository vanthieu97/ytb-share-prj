import React, { useContext, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../../Auth.context'
import Notification from '../../Notification'
import { getErrorMsg } from '../../../shared/utility'
import './styles.scss'

const Header = () => {
  const formRef = useRef()
  const { state, auth, login, logout } = useContext(AuthContext)
  const { loading, loggedIn, email, error } = state

  useEffect(
    () => {
      auth()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  useEffect(() => {
    if (error) {
      Notification.error(getErrorMsg(error))
    }
  }, [error])

  const onClickLogin = (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    login({
      email: data.get('email'),
      password: data.get('password'),
    })
  }

  const onClickLogout = (e) => {
    e.preventDefault()
    logout()
  }

  return (
    <header className="header-wrapper">
      <div className="header">
        <Link to="/" className="web-info">
          <div className="logo">
            <img src="images/logo.svg" alt="logo" />
          </div>
          <span className="web-name">Funny Movies</span>
        </Link>
        <div className="web-user">
          {loggedIn ? (
            <div className="user-info">
              <span>{email}</span>
              <Link to="/share">
                <input type="button" value="Share a movie" />
              </Link>
              <input type="button" value="Logout" onClick={onClickLogout} disabled={loading} />
            </div>
          ) : (
            <form ref={formRef} onSubmit={onClickLogin}>
              <input type="email" name="email" placeholder="email" required />
              <input
                type="password"
                name="password"
                placeholder="password"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                required
              />
              <input type="submit" value="Login/Register" disabled={loading} />
            </form>
          )}
        </div>
      </div>
    </header>
  )
}

export default React.memo(Header)
