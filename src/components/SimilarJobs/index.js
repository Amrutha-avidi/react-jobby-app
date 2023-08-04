import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobs = props => {
  const {similarJobData} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    title,
    rating,
  } = similarJobData

  return (
    <li>
      <div className="first-part">
        <img
          className="company-logo"
          src={companyLogoUrl}
          alt="similar job company logo"
        />
        <div className="title-rating-con">
          <h1 className="title">{title}</h1>
          <div className="rating-container">
            <AiFillStar className="star-icon" />
            <p className="rating">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="sub-head">Description</h1>
      <p className="description">{jobDescription}</p>
      <div className="location-employment-con">
        <div className="location-container">
          <MdLocationOn className="location-type-icon" />
          <p className="paragraph">{location}</p>
        </div>
        <div className="similar-employment-container">
          <BsBriefcaseFill className="similar-employment-icon" />
          <p className="paragraph">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}
export default SimilarJobs
