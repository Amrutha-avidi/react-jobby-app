import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const JobItem = props => {
  const {jobItem} = props
  const {
    id,
    title,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
  } = jobItem

  return (
    <Link to={`/jobs/${id}`} style={{textDecoration: 'none'}}>
      <li className="job-item-container">
        <div className="first-part">
          <img
            className="company-logo"
            src={companyLogoUrl}
            alt="company logo"
          />
          <div className="title-and-rating-con">
            <h1 className="title">{title}</h1>
            <div className="rating-con">
              <AiFillStar className="star-icon" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-employment-type-and-salary">
          <div className="location-employment-type-con">
            <div className="location-con">
              <MdLocationOn className="location-type-icon" />
              <p className="para">{location}</p>
            </div>
            <div className="employment-con">
              <BsFillBriefcaseFill className="location-type-icon" />
              <p className="para">{employmentType}</p>
            </div>
          </div>
          <div className="salary-con">
            <p className="salary">{packagePerAnnum}</p>
          </div>
        </div>
        <hr className="h-line" />
        <div className="second-part">
          <p className="description">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobItem
