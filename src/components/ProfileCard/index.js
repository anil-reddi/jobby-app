import Loader from 'react-loader-spinner'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const ProfileCard = props => {
  const renderProfileView = () => {
    const {profileDetails} = props
    const {name, profileImageUrl, shortBio} = profileDetails

    return (
      <div className="profile-container">
        <img src={profileImageUrl} alt="profile" className="profile-img" />
        <h1 className="name">{name}</h1>
        <p className="bio">{shortBio}</p>
      </div>
    )
  }

  const renderFailureView = () => {
    const {profileDetails} = props
    return (
      <div className="failure-container">
        <button type="button" className="retry-btn" onClick={profileDetails}>
          Retry
        </button>
      </div>
    )
  }

  const renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" width="50" height="50" />
    </div>
  )

  const {profileApiStatus} = props

  switch (profileApiStatus) {
    case apiStatusConstants.inProgress:
      return renderLoaderView()
    case apiStatusConstants.failure:
      return renderFailureView()
    case apiStatusConstants.success:
      return renderProfileView()
    default:
      return null
  }
}
export default ProfileCard
