import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import {BiLinkExternal} from 'react-icons/bi'
import './index.css'
import SimilarJobs from '../SimilarJobs'
import Header from '../Header'

const jobItemDetailsApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobItemDetailsApiStatus: jobItemDetailsApiStatusConstants.initial,
    jobItemDetails: [],
    similarJobData: [],
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    this.setState({
      jobItemDetailsApiStatus: jobItemDetailsApiStatusConstants.inProgress,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const jobItemDetailsUrl = `https://apis.ccbp.in/jobs/${id}`
    const jobItemDetailsOptions = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(jobItemDetailsUrl, jobItemDetailsOptions)
    if (response.ok === true) {
      const dataObtained = await response.json()
      console.log(dataObtained)
      const formattedJobItemDetailsData = [dataObtained.job_details].map(
        eachItem => ({
          companyLogoUrl: eachItem.company_logo_url,
          companyWebsiteUrl: eachItem.company_website_url,
          employmentType: eachItem.employment_type,
          id: eachItem.id,
          jobDescription: eachItem.job_description,
          lifeAtCompany: {
            description: eachItem.life_at_company.description,
            imageUrl: eachItem.life_at_company.image_url,
          },
          location: eachItem.location,
          packagePerAnnum: eachItem.package_per_annum,
          rating: eachItem.rating,
          skills: eachItem.skills.map(eachSkill => ({
            name: eachSkill.name,
            imageUrl: eachSkill.image_url,
          })),
          title: eachItem.title,
        }),
      )

      const formattedSimilarJobsData = dataObtained.similar_jobs.map(
        eachJob => ({
          companyLogoUrl: eachJob.company_logo_url,
          employmentType: eachJob.employment_type,
          id: eachJob.id,
          jobDescription: eachJob.job_description,
          location: eachJob.location,
          rating: eachJob.rating,
          title: eachJob.title,
        }),
      )

      this.setState({
        jobItemDetailsApiStatus: jobItemDetailsApiStatusConstants.success,
        jobItemDetails: formattedJobItemDetailsData,
        similarJobData: formattedSimilarJobsData,
      })
    } else {
      this.setState({
        jobItemDetailsApiStatus: jobItemDetailsApiStatusConstants.failure,
      })
    }
  }

  renderJobItemDetails = () => {
    const {jobItemDetails, similarJobData} = this.state
    if (jobItemDetails.length >= 1) {
      const {
        companyLogoUrl,
        companyWebsiteUrl,
        employmentType,
        jobDescription,
        lifeAtCompany,
        location,
        packagePerAnnum,
        rating,
        skills,
        title,
      } = jobItemDetails[0]

      return (
        <div className="main">
          <div className="details-con">
            <div className="first-part">
              <img
                className="company-logo"
                src={companyLogoUrl}
                alt="job details company logo"
              />
              <div className="title-rating-con">
                <h1 className="title">{title}</h1>
                <div className="rating-container">
                  <AiFillStar className="star-icon" />
                  <p className="rating">{rating}</p>
                </div>
              </div>
            </div>
            <div className="location-salary">
              <div className="location-employment-con">
                <div className="location-container">
                  <MdLocationOn className="location-type-icon" />
                  <p className="paragraph">{location}</p>
                </div>
                <div className="employment-container">
                  <BsBriefcaseFill className="emp-icon" />
                  <p className="paragraph">{employmentType}</p>
                </div>
              </div>
              <div className="salary-con">
                <p className="salary">{packagePerAnnum}</p>
              </div>
            </div>
            <hr className="h-line" />
            <div className="second-part">
              <div className="second-head">
                <h1 className="sub-head">Description</h1>
                <a className="web-link" href={companyWebsiteUrl}>
                  Visit
                  <BiLinkExternal />
                </a>
              </div>
              <p className="description">{jobDescription}</p>
            </div>
            <div className="third-part">
              <h1 className="sub-head">Skills</h1>
              <ul className="skills-con">
                {skills.map(each => (
                  <li className="skill-item" key={each.name}>
                    <img
                      className="skill-image"
                      src={each.imageUrl}
                      alt={each.name}
                    />
                    <p className="skill-name">{each.name}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="fourth-part">
              <h1 className="sub-head">Life at Company</h1>
              <div className="company-life-description">
                <p className="company-description">
                  {lifeAtCompany.description}
                </p>
                <img
                  className="company-life-img"
                  src={lifeAtCompany.imageUrl}
                  alt="life at company"
                />
              </div>
            </div>
          </div>
          <div className="similar">
            <h1 className="sub-head">Similar Jobs</h1>
            <ul className="similar-job-list-con">
              {similarJobData.map(eachJob => (
                <SimilarJobs
                  similarJobData={eachJob}
                  key={eachJob.id}
                  employmentType={employmentType}
                />
              ))}
            </ul>
          </div>
        </div>
      )
    }
    return null
  }

  retryJobItemDetails = () => {
    this.getJobItemDetails()
  }

  renderJobItemDetailsFailure = () => (
    <div className="job-item-detail-failed-view">
      <img
        className="failed-image"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="failed-view-head">Oops! Something Went Wrong</h1>
      <p className="failed-view-para">
        We cannot seem to find the page you are looking for.
      </p>
      <button type="button" onClick={this.retryJobItemDetails}>
        Retry
      </button>
    </div>
  )

  renderJobItemDetailsLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderApiStatus = () => {
    const {jobItemDetailsApiStatus} = this.state
    switch (jobItemDetailsApiStatus) {
      case jobItemDetailsApiStatusConstants.success:
        return this.renderJobItemDetails()
      case jobItemDetailsApiStatusConstants.failure:
        return this.renderJobItemDetailsFailure()
      case jobItemDetailsApiStatusConstants.inProgress:
        return this.renderJobItemDetailsLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="job-item-details-con">
        <Header />
        <div className="content-con">{this.renderApiStatus()}</div>
      </div>
    )
  }
}

export default JobItemDetails
