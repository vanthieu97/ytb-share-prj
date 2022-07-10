import React from 'react'
import { Link } from 'react-router-dom'
import './styles.scss'

const Header = () => {
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
          {true ? (
            <form>
              <input type="email" name="email" placeholder="email" required />
              <input
                type="password"
                name="password"
                placeholder="password"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                required
              />
              <input type="submit" value="Login/Register" />
            </form>
          ) : (
            <div className="user-info">
              <span>Welcome vanthieunguyen234@gmail.com</span>
              <input type="button" value="Share a movie" />
              <input type="button" value="Logout" />
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default React.memo(Header)
