import {AiFillStar} from 'react-icons/ai'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'

import './index.css'

const JobCard = props => {
  const {jobDetails} = props
  const {
    id,
    rating,
    title,
    location,
    packagePerAnnum,
    jobDescription,
    companyLogoUrl,
    employmentType,
  } = jobDetails

  return (
    <li className="job-card">
      <Link to={`/jobs/${id}`} className="job-link">
        <div className="logo-and-title-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div className="title-and-rating-container">
            <h1 className="job-title">{title}</h1>
            <div className="rating-container">
              <AiFillStar className="star-icon" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-and-package-container">
          <div className="icon-type-container">
            <IoLocationSharp className="type-icon" />
            <p className="type-text">{location}</p>
          </div>
          <div className="icon-type-container">
            <BsFillBriefcaseFill className="type-icon" />
            <p className="type-text">{employmentType}</p>
          </div>
          <p className="package-text">{packagePerAnnum}</p>
        </div>
        <hr className="line" />
        <h1 className="description-heading">Description</h1>
        <p className="job-description">{jobDescription}</p>
      </Link>
    </li>
  )
}
export default JobCard
