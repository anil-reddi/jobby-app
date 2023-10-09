import {AiFillStar} from 'react-icons/ai'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const SimilarJobCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = jobDetails

  return (
    <li className="job-card-container">
      <div className="logo-and-title-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
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
      <h1 className="description-heading">Description</h1>
      <p className="job-description">{jobDescription}</p>
      <div className="location-and-package-container">
        <div className="icon-type-container">
          <IoLocationSharp className="type-icon" />
          <p className="type-text">{location}</p>
        </div>
        <div className="icon-type-container">
          <BsFillBriefcaseFill className="type-icon" />
          <p className="type-text">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}
export default SimilarJobCard
