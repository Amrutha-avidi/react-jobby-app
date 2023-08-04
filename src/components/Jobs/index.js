import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import JobItem from '../JobItem'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstantsForProfile = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const apiStatusConstantsForJobs = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    profileDetails: [],
    jobList: [],
    employmentTypeInputs: [],
    salaryInput: '',
    profileApiStatus: apiStatusConstantsForProfile.initial,
    jobsApiStatus: apiStatusConstantsForJobs.initial,
    search: '',
  }

  componentDidMount() {
    this.getProfileDetails()
    this.getJobs()
  }

  getProfileDetails = async () => {
    this.setState({profileApiStatus: apiStatusConstantsForProfile.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = [await response.json()]
      const formattedData = data.map(eachDetail => ({
        name: eachDetail.profile_details.name,
        profileImageUrl: eachDetail.profile_details.profile_image_url,
        shortBio: eachDetail.profile_details.short_bio,
      }))

      this.setState({
        profileApiStatus: apiStatusConstantsForProfile.success,
        profileDetails: formattedData,
      })
    } else {
      this.setState({profileApiStatus: apiStatusConstantsForProfile.failure})
    }
  }

  getProfileView = () => {
    const {profileDetails} = this.state

    const {profileImageUrl, name, shortBio} = profileDetails[0]
    return (
      <div className="profile-con">
        <img className="profile-con-img" src={profileImageUrl} alt="profile" />
        <h1 className="profile-con-head">{name}</h1>
        <p className="profile-con-para">{shortBio}</p>
      </div>
    )
  }

  retryProfileDetails = () => {
    this.getProfileDetails()
  }

  getProfileFailureView = () => (
    <div className="failure-button">
      <button
        type="button"
        className="retry-button"
        onClick={this.retryProfileDetails}
      >
        Retry
      </button>
    </div>
  )

  getProfileApiStatus = () => {
    const {profileApiStatus} = this.state

    switch (profileApiStatus) {
      case apiStatusConstantsForProfile.success:
        return this.getProfileView()
      case apiStatusConstantsForProfile.failure:
        return this.getProfileFailureView()
      case apiStatusConstantsForProfile.inProgress:
        return this.getLoadingView()
      default:
        return null
    }
  }

  getJobs = async () => {
    this.setState({jobsApiStatus: apiStatusConstantsForJobs.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {search, employmentTypeInputs, salaryInput} = this.state
    const jobUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeInputs}&minimum_package=${salaryInput}&search=${search}`
    const jobOptions = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(jobUrl, jobOptions)
    if (response.ok === true) {
      const data = await response.json()
      const formattedJobData = data.jobs.map(eachJob => ({
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
        jobsApiStatus: apiStatusConstantsForJobs.success,
        jobList: formattedJobData,
      })
    } else {
      this.setState({jobsApiStatus: apiStatusConstantsForJobs.failure})
    }
  }

  getJobsView = () => {
    const {jobList} = this.state
    const noJobs = jobList.length === 0

    return noJobs ? (
      <div className="no-jobs-con">
        <img
          className="no-jobs-img"
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
        />
        <h1 className="no-jobs-head">No jobs found</h1>
        <p className="no-jobs-para">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    ) : (
      <ul className="job-list-container">
        {jobList.map(eachJobItem => (
          <JobItem key={eachJobItem.id} jobItem={eachJobItem} />
        ))}
      </ul>
    )
  }

  getLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  retryJobItemDetails = () => {
    this.getJobs()
  }

  getJobsFailureView = () => (
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

  getJobApiStatus = () => {
    const {jobsApiStatus} = this.state

    switch (jobsApiStatus) {
      case apiStatusConstantsForJobs.success:
        return this.getJobsView()
      case apiStatusConstantsForJobs.failure:
        return this.getJobsFailureView()
      case apiStatusConstantsForJobs.inProgress:
        return this.getLoadingView()
      default:
        return null
    }
  }

  onGetEmploymentType = event => {
    const {employmentTypeInputs} = this.state
    const typeNotInList = employmentTypeInputs.filter(
      eachType => eachType === event.target.id,
    )
    if (typeNotInList.length === 0) {
      this.setState(
        prevState => ({
          employmentTypeInputs: [
            ...prevState.employmentTypeInputs,
            event.target.id,
          ],
        }),
        this.getJobs,
      )
    } else {
      const filteredData = employmentTypeInputs.filter(
        eachType => eachType !== event.target.id,
      )
      this.setState({employmentTypeInputs: filteredData}, this.getJobs)
    }
  }

  onGetSalaryInput = event => {
    this.setState({salaryInput: event.target.id}, this.getJobs)
  }

  renderEmploymentTypes = () => (
    <ul className="filter-list">
      {employmentTypesList.map(eachType => (
        <li className="filter-label" key={eachType.employmentTypeId}>
          <label>
            <input
              type="checkbox"
              id={eachType.employmentTypeId}
              onChange={this.onGetEmploymentType}
            />
            {eachType.label}
          </label>
        </li>
      ))}
    </ul>
  )

  renderSalaryRange = () => (
    <ul className="filter-list">
      {salaryRangesList.map(eachRange => (
        <li className="filter-label" key={eachRange.salaryRangeId}>
          <label>
            <input
              onChange={this.onGetSalaryInput}
              type="radio"
              id={eachRange.salaryRangeId}
            />
            {eachRange.label}
          </label>
        </li>
      ))}
    </ul>
  )

  onSearchInput = event => {
    this.setState({search: event.target.value})
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getJobs()
    }
  }

  onClickSearchButton = () => {
    this.getJobs()
  }

  render() {
    const {search} = this.state
    return (
      <div>
        <Header />
        <div className="job-con">
          <div className="search-job-list-con">
            <div className="search-con">
              <input
                className="search-input"
                placeholder="Search"
                type="search"
                value={search}
                onChange={this.onSearchInput}
                onKeyDown={this.onEnterSearchInput}
              />
              <button
                className="search-button"
                type="button"
                data-testid="searchButton"
                onClick={this.onClickSearchButton}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <div className="job-list-con">{this.getJobApiStatus()}</div>
          </div>
          <div className="filters-con">
            {this.getProfileApiStatus()}
            <div>
              <hr />
            </div>
            <h1 className="filter-head">Type of Employment</h1>
            {this.renderEmploymentTypes()}
            <div>
              <hr />
            </div>

            <h1 className="filter-head">Salary Range</h1>
            {this.renderSalaryRange()}

            <div className="job-list-con-small">{this.getJobApiStatus()}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
