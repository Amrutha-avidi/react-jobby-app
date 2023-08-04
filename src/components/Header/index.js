import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {FiLogOut} from 'react-icons/fi'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const Header = props => {
  const logout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="header-con">
      <div className="small">
        <Link to="/">
          <img
            className="small-logo-img"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>
        <ul>
          <li className="item">
            <Link to="/">
              <button type="button" className="icon-button">
                <AiFillHome className="icon" />
              </button>
            </Link>
          </li>

          <li className="item">
            <Link to="/jobs">
              <button type="button" className="icon-button">
                <BsFillBriefcaseFill className="icon" />
              </button>
            </Link>
          </li>
          <button type="button" className="icon-button" onClick={logout}>
            <FiLogOut className="icon" />
          </button>
        </ul>
      </div>
      <div className="large">
        <Link to="/">
          <img
            className="large-logo-img"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>
        <ul className="header-links-con">
          <li className="item">
            <Link
              className="header-links"
              style={{textDecoration: 'none'}}
              to="/"
            >
              Home
            </Link>
          </li>
          <li className="item">
            <Link
              className="header-links"
              style={{textDecoration: 'none'}}
              to="/jobs"
            >
              Jobs
            </Link>
          </li>
        </ul>
        <div>
          <button className="logout-button" type="button" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}
export default withRouter(Header)
