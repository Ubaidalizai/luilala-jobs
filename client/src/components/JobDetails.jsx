// JobDetails.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

function JobDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { job } = location.state || {};

  if (!job) {
    return <p className="text-center text-white">No job details available.</p>;
  }

  return (
    <div className="bg-gradient-to-r from-[#002244] to-[#001122] min-h-screen flex flex-col items-center px-4 py-8 pb-16">
      <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative">
          <img
            src={job.empId?.logo || 'https://via.placeholder.com/600x200'} // Placeholder or company logo
            alt={job.empId?.employerName}
            className="w-full h-56 object-cover"
          />
          <button
            className="absolute top-4 left-4 bg-[#194162] text-white p-2 rounded-full shadow-lg hover:bg-[#20517b] transition duration-300"
            onClick={() => navigate(-1)} // Navigate back to the search results
          >
            <FaArrowLeft />
          </button>
        </div>
        <div className="p-6">
          <h3 className="text-3xl font-bold text-[#002244] mb-4">{job.title}</h3>
          <div className="flex flex-wrap items-center mb-6">
            <p className="text-gray-600 text-lg mr-4">
              <strong>Company:</strong> {job.empId?.employerName || 'No company information available'}
            </p>
            <p className="text-gray-600 text-lg mr-4">
              <strong>Location:</strong> {job.location}
            </p>
            <p className="text-gray-600 text-lg">
              <strong>Country:</strong> {job.country}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-800 mb-2"><strong>Keyword:</strong> {job.keyword}</p>
              <p className="text-gray-800 mb-2"><strong>Job Type:</strong> {job.jobType}</p>
              <p className="text-gray-800 mb-2"><strong>Salary Type:</strong> {job.salaryType}</p>
            </div>
            <div>
              <p className="text-gray-800 mb-2"><strong>Minimum Salary:</strong> ${job.minSalary}</p>
              <p className="text-gray-800 mb-2"><strong>Maximum Salary:</strong> ${job.maxSalary}</p>
            </div>
          </div>
          <button
            className="mt-8 bg-[#194162] text-white w-full py-3 rounded-full text-lg shadow-lg hover:bg-[#20517b] transition duration-300"
            onClick={() => navigate(-1)}
          >
            Back to Search Results
          </button>
        </div>
      </div>
    </div>
    ); 
    
}

export default JobDetails;
