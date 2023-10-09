import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'

import Header from '../Header'
import JobCard from '../JobCard'
import FiltersItem from '../FiltersItem'
import ProfileCard from '../ProfileCard'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    profileDetails: {},
    jobsList: [],
    employmentTypesChecked: [],
    searchInput: '',
    activeSalaryRangeId: '',
    jobsApiStatus: apiStatusConstants.initial,
    profileApiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProfileDetails()
    this.getJobs()
  }

  updateEmploymentTypesChecked = typeId => {
    const {employmentTypesChecked} = this.state
    let updatedList = employmentTypesChecked
    if (employmentTypesChecked.includes(typeId)) {
      updatedList = employmentTypesChecked.filter(
        eachType => eachType !== typeId,
      )
    } else {
      updatedList = [...updatedList, typeId]
    }
    this.setState({employmentTypesChecked: updatedList}, this.getJobs)
  }

  updateSalaryRangeId = activeSalaryRangeId => {
    this.setState({activeSalaryRangeId}, this.getJobs)
  }

  getJobs = async () => {
    this.setState({jobsApiStatus: apiStatusConstants.inProgress})

    const {
      searchInput,
      activeSalaryRangeId,
      employmentTypesChecked,
    } = this.state
    const employTypes = employmentTypesChecked.join(',')
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employTypes}&minimum_package=${activeSalaryRangeId}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const {jobs} = data
      const updatedData = jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobsList: updatedData,
        jobsApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({jobsApiStatus: apiStatusConstants.failure})
    }
  }

  getProfileDetails = async () => {
    this.setState({profileApiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const profileDetails = data.profile_details
      const updatedData = {
        name: profileDetails.name,
        profileImageUrl: profileDetails.profile_image_url,
        shortBio: profileDetails.short_bio,
      }

      this.setState({
        profileDetails: updatedData,
        profileApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({profileApiStatus: apiStatusConstants.failure})
    }
  }

  renderSearchBar = searchBarId => {
    const {searchInput} = this.state
    return (
      <div className="search-bar-container" id={searchBarId}>
        <input
          type="search"
          className="search-input"
          value={searchInput}
          onChange={event => this.setState({searchInput: event.target.value})}
        />
        <button
          type="button"
          className="search-btn"
          data-testid="searchButton"
          onClick={() => this.getJobs()}
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  renderSideBar = () => {
    const {
      profileDetails,
      profileApiStatus,
      employmentTypesChecked,
      activeSalaryRangeId,
    } = this.state
    return (
      <div className="side-bar-container">
        {this.renderSearchBar('smallSearchBar')}
        <ProfileCard
          profileDetails={profileDetails}
          profileApiStatus={profileApiStatus}
          getProfileDetails={this.getProfileDetails}
        />
        <hr className="line" />
        <FiltersItem
          updateSalaryRangeId={this.updateSalaryRangeId}
          updateEmploymentTypesChecked={this.updateEmploymentTypesChecked}
          activeSalaryRangeId={activeSalaryRangeId}
          employmentTypesChecked={employmentTypesChecked}
        />
      </div>
    )
  }

  renderNoJobsView = () => (
    <div className="no-jobs-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs-image"
      />
      <h1 className="no-jobs-heading">No Jobs Found</h1>
      <p className="no-jobs-description">
        We could not find any jobs. Try other Filters
      </p>
    </div>
  )

  renderJobsList = () => {
    const {jobsList} = this.state
    return (
      <>
        {jobsList.length > 0 ? (
          <ul className="jobs-list">
            {jobsList.map(eachJob => (
              <JobCard key={eachJob.id} jobDetails={eachJob} />
            ))}
          </ul>
        ) : (
          this.renderNoJobsView()
        )}
      </>
    )
  }

  renderJobsLoaderView = () => (
    <div className="jobs-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobsFailureView = () => (
    <div className="jobs-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="job-failure-image"
      />
      <h1 className="failure-view-heading">Oops! Something Went Wrong</h1>
      <p className="failure-view-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={() => this.getJobs()}
      >
        Retry
      </button>
    </div>
  )

  renderJobsOnApiStatus = () => {
    const {jobsApiStatus} = this.state

    switch (jobsApiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderJobsLoaderView()
      case apiStatusConstants.failure:
        return this.renderJobsFailureView()
      case apiStatusConstants.success:
        return this.renderJobsList()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="jobs-page-container">
        <Header />
        <div className="jobs-page">
          {this.renderSideBar()}
          <div className="jobs-container">
            {this.renderSearchBar('largeSearchBar')}
            {this.renderJobsOnApiStatus()}
          </div>
        </div>
      </div>
    )
  }
}
export default Jobs
