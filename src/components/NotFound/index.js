import './index.css'

const Notfound = () => (
  <div className="not-found-container">
    <div className="not-found-content-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        alt="not found"
        className="not-found-img"
      />
      <h1 className="heading">Page Not Found</h1>
      <p className="description">
        We are sorry, the page you requested could not be found
      </p>
    </div>
  </div>
)
export default Notfound
