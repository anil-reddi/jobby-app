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

const FiltersItem = props => {
  const renderEmploymentTypeList = () => {
    const {updateEmploymentTypesChecked} = props

    return employmentTypesList.map(eachType => {
      const updateTypesList = () =>
        updateEmploymentTypesChecked(eachType.employmentTypeId)

      return (
        <li className="filters-list" key={eachType.employmentTypeId}>
          <input
            type="checkbox"
            className="checkbox-input"
            id={eachType.employmentTypeId}
            onChange={updateTypesList}
          />
          <label htmlFor={eachType.employmentTypeId} className="filter-label">
            {eachType.label}
          </label>
        </li>
      )
    })
  }

  const renderEmploymentTypes = () => (
    <>
      <h1 className="filter-heading">Type of Employment</h1>
      <ul className="filters-item">{renderEmploymentTypeList()}</ul>
    </>
  )

  const renderSalaryRangesList = () => {
    const {updateSalaryRangeId, activeSalaryRangeId} = props

    return salaryRangesList.map(eachRange => {
      const onChangeRange = () => updateSalaryRangeId(eachRange.salaryRangeId)
      const isChecked = eachRange.salaryRangeId === activeSalaryRangeId

      return (
        <li className="filters-list" key={eachRange.salaryRangeId}>
          <input
            type="radio"
            className="checkbox-input"
            name="salary ranges"
            id={eachRange.salaryRangeId}
            onChange={onChangeRange}
            checked={isChecked}
          />
          <label htmlFor={eachRange.salaryRangeId} className="filter-label">
            {eachRange.label}
          </label>
        </li>
      )
    })
  }

  const renderSalaryRangesTypes = () => (
    <>
      <h1 className="filter-heading">Salary Range</h1>
      <ul className="filters-item">{renderSalaryRangesList()}</ul>
    </>
  )

  return (
    <div className="filter-item-container">
      {renderEmploymentTypes()}
      <hr className="line" />
      {renderSalaryRangesTypes()}
    </div>
  )
}
export default FiltersItem
