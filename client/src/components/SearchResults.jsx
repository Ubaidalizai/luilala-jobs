
// SearchResults.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const { searchResults, isLoading } = location.state || {};

  const handleViewDetails = (job) => {
    navigate(`/job-details/${job._id}`, { state: { job } });
  };

  return (
    <div className="bg-gradient-to-r from-[#002244] to-[#001122] min-h-screen px-4 py-8 pb-16">
      <div className="container mx-auto px-6 sm:px-8">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Search Results</h2>
        {isLoading ? (
          <p className="text-white text-center">Loading...</p>
        ) : searchResults && searchResults.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {searchResults.map((job) => (
                <div key={job._id} className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-semibold text-[#002244] mb-2">{job.title}</h3>
                  <p className="text-gray-600 mb-2"><strong>Location:</strong> {job.location}</p>
                  <p className="text-gray-600 mb-2"><strong>Company:</strong> {job.empId?.employerName || 'No company information available'}</p>
                  <button
                    className="bg-[#194162] text-white px-4 py-2 rounded-full hover:bg-[#20517b] transition-colors duration-300"
                    onClick={() => handleViewDetails(job)}
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="text-white text-center">No jobs foun.</p>
        )}
      </div>
    </div>
  );
}

export default SearchResults;