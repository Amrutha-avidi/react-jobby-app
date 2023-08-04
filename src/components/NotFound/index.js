import './index.css'

const notFoundUrl =
  'https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png'

const NotFound = () => (
  <>
    <div className="not-found-con">
      <img className="not-found-img" src={notFoundUrl} alt="not found" />
      <h1 className="not-found-head">Page Not Found</h1>
      <p className="not-found-para">
        We are sorry, the page you requested could not be found
      </p>
    </div>
  </>
)

export default NotFound
