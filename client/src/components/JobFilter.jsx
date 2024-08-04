import React, { useState } from 'react';

function JobFilter({ onFilterChange }) {
  const [filters, setFilters] = useState({
    jobTypes: {
      fullTime: false,
      partTime: false,
      internship: false,
      projectWork: false,
      volunteering: false,
    },
    salaryRange: [0, 1000],
  });

  const handleJobTypeChange = (type) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      jobTypes: {
        ...prevFilters.jobTypes,
        [type]: !prevFilters.jobTypes[type],
      },
    }));
  };

  const handleSalaryRangeChange = (e) => {
    const value = e.target.value.split(',').map(Number);
    setFilters((prevFilters) => ({
      ...prevFilters,
      salaryRange: value,
    }));
  };

  const applyFilters = () => {
    onFilterChange(filters);
  };

  return (
    <div className="job-filter p-4 bg-gray-100 rounded-lg shadow-md mb-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Filter Jobs</h2>

      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Job Type</h3>
        <div className="grid grid-cols-2 gap-2">
          {Object.keys(filters.jobTypes).map((type) => (
            <label key={type} className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={filters.jobTypes[type]}
                onChange={() => handleJobTypeChange(type)}
              />
              {type.charAt(0).toUpperCase() + type.slice(1).replace(/([A-Z])/g, ' $1')}
            </label>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Salary Range</h3>
        <input
          type="range"
          min="0"
          max="1000"
          step="10"
          value={filters.salaryRange}
          onChange={handleSalaryRangeChange}
          className="w-full"
        />
        <div className="flex justify-between text-gray-600">
          <span>${filters.salaryRange[0]}</span>
          <span>${filters.salaryRange[1]}</span>
        </div>
      </div>

      <button
        onClick={applyFilters}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
      >
        Apply Filters
      </button>
    </div>
  );
}

export default JobFilter;
