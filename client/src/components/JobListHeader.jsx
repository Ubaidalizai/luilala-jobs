import React, { useState } from 'react';
import JobCard from './JobCard';

function JobListHeader({ jobs }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState('mostRecent');

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSortOrderChange = (order) => {
    setSortOrder(order);
    setDropdownOpen(false);
  };

  const sortedJobs = () => {
    if (!Array.isArray(jobs) || jobs.length === 0) {
      return [];
    }

    if (sortOrder === 'highToLow') {
      return [...jobs].sort((a, b) => b.salary - a.salary);
    } else {
      return [...jobs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
  };

  const filteredJobs = sortedJobs();

  return (
    <section className="job-list-header p-4 bg-gray-100 rounded-lg shadow-md">
    <div className="flex items-center justify-between mb-4">
      <h1 className="text-2xl font-bold text-gray-800">Recommended Jobs</h1>
      <div className="relative">
        <button
          className="bg-white px-4 py-2 rounded-lg shadow-md flex items-center space-x-2 focus:outline-none"
          onClick={toggleDropdown}
        >
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 9l4-4 4 4m0 6l-4 4-4-4"
            />
          </svg>
          <span className="text-gray-600">Filter</span>
        </button>
        <div
          className={`dropdown-content ${
            dropdownOpen ? 'block' : 'hidden'
          } absolute right-0 mt-2 bg-white p-4 rounded-lg shadow-lg w-48`}
        >
          <div
            className="flex items-center space-x-2 mb-2 cursor-pointer"
            onClick={() => handleSortOrderChange('mostRecent')}
          >
            <div
              className={`w-4 h-4 rounded ${
                sortOrder === 'mostRecent' ? 'bg-gray-400' : 'bg-gray-300'
              }`}
            ></div>
            <span className="text-gray-600">Most recent</span>
          </div>
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => handleSortOrderChange('highToLow')}
          >
            <div
              className={`w-4 h-4 rounded ${
                sortOrder === 'highToLow' ? 'bg-gray-400' : 'bg-gray-300'
              }`}
            ></div>
            <span className="text-gray-600">Salary: High to Low</span>
          </div>
        </div>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {filteredJobs.map((job) => (
        <div key={job.title} className="bg-white p-4 rounded-lg shadow-md">
          <JobCard job={job} />
        </div>
      ))}
    </div>
  </section>
  );
}

export default JobListHeader;