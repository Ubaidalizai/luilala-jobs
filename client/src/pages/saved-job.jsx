
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function SavedJobsPage() {

  const [savedJobs, setSavedJobs] = useState([]); // State to store saved jobs
  const [loading, setLoading] = useState(true);   // State to handle loading status
  const [error, setError] = useState('');         // State to handle errors

  // Fetch saved jobs from the API when the component mounts
  useEffect(() => {
    const fetchSavedJobs = async () => {
      
      try {
        const response = await axios.get('http://localhost:3000/api/v1/users/getFavorites', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });
        setSavedJobs(response.data.favoriteJobs); // Set the fetched jobs
        setLoading(false); // Turn off the loading state
      } catch (error) {
        setError('Failed to fetch saved jobs. Please try again.');
        setLoading(false); // Turn off the loading state even on failure
      }
    };

    fetchSavedJobs();
  }, []);

  // Formatting the salary to display with a sign and range
  const formatSalary = (min, max, sign, type) => {
    return `${sign}${min} - ${sign}${max} ${type}`;
  };

  // Conditionally rendering content based on loading, error, and data state
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Your Saved Jobs</h1>

        {/* Loading State */}
        {loading && <p className="text-lg text-blue-500">Loading saved jobs...</p>}

        {/* Error State */}
        {error && <p className="text-lg text-red-500">{error}</p>}

        {/* Jobs List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedJobs.length > 0 ? (
            savedJobs.map(job => (
              <div
                key={job._id}
                className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105"
              >
                {/* <div className="flex items-center space-x-4">
                  
                  <img
                    src={`https://via.placeholder.com/50`} // Replace this with actual logo URL
                    alt="Company Logo"
                    className="w-16 h-16 object-cover rounded-full"
                  />
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">{job.title}</h2>
                    <p className="text-gray-500 text-sm">{job.location}</p>
                  </div>
                </div> */}

                <p className="text-gray-600 mt-4">{job.description}</p>

                <div className="mt-4">
                  <p className="text-sm text-gray-500">
                    <strong>Location:</strong> {job.city}, {job.country}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Salary:</strong> {formatSalary(job.minSalary, job.maxSalary, job.salarySign, job.salaryType)}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Job Type:</strong> {job.jobType}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Keywords:</strong> {job.keyword}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Posted On:</strong> {new Date(job.liveTime).toLocaleDateString()}
                  </p>
                </div>

                {/* Buttons for More Details and Apply */}
                <div className="mt-6 flex justify-between items-center">
                  <button
                    onClick={() => window.open(`/apply/${job._id}`, '_blank')}
                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition duration-300"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))
          ) : (
            !loading && <p className="text-lg text-gray-600">No saved jobs found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

