
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function JobAlerts() {
  const [liveJobs, setLiveJobs] = useState(0);
  const [employers, setEmployers] = useState(0);
  const [titleOrKeyword, setTitleOrKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Fetch the number of live jobs and employers
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [liveJobsRes, employersRes] = await Promise.all([
          axios.get('http://127.0.0.1:3000/api/v1/job/liveJobsLength'),
          axios.get('http://127.0.0.1:3000/api/v1/job/companyLength'),
        ]);

        setLiveJobs(liveJobsRes.data);
        setEmployers(employersRes.data);
      } catch (error) {
        console.error('Error fetching live jobs and employers:', error);
      }
    };
    fetchData();
  }, []);

  // Handle form submission to create a job alert
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/jobAlert/',
        {
          titleOrKeyword,  // Ensure this matches the expected field name
          location,        // Ensure this matches the expected field name
          email,           // Ensure this is a valid email
        },
        
          {withCredentials: true} // Ensures the cookie is sent
      );

      console.log('Response:', response.data); // Debugging: Log response data

      if (response.data.status === 201) {
        setMessage('Job alert created successfully!');
      } else {
        setMessage(response.data.message || 'Job alert created, but no matching jobs found.');
      }
    } catch (error) {
      // Log detailed error response
      console.error('Error:', error.response?.data || error.message);

      if (error.response?.status === 500) {
        setMessage('Internal Server Error. Please try again later.');
      } else if (error.response?.status === 401) {
        setMessage('Authentication failed. Please log in again.');
      } else {
        setMessage('Error creating job alert. Please try again.');
      }
    }
  };

  return (
    <>
      <div className="bg-white py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gray-600 text-sm">
            Search {liveJobs} jobs from {employers} companies
          </p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Never miss an opportunity with Job Alerts
              </h1>
              <p className="text-gray-600 mt-4">
                Stay on top of your job search and always be sure you are the first to know about new roles.
              </p>
            </div>
            <div className="bg-gray-100 rounded-lg p-6 shadow-md">
              <h2 className="text-2xl font-bold text-gray-800">Create Job Alert</h2>
              <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="keywords" className="block text-gray-700 font-medium">
                    Keywords/Job Title
                  </label>
                  <input
                    id="keywords"
                    type="text"
                    value={titleOrKeyword}
                    onChange={(e) => setTitleOrKeyword(e.target.value)}
                    placeholder="e.g. Administrator"
                    className="mt-2 block w-full border-gray-300 p-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="location" className="block text-gray-700 font-medium">
                    Location
                  </label>
                  <input
                    id="location"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. London"
                    className="mt-2 block w-full border-gray-300 p-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-700 font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="mt-2 block w-full border-gray-300 p-2 rounded-md shadow-sm focus:ring-[#1c4980] focus:border-[#1c4980]"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#1c4980] text-white py-2 px-4 rounded-md hover:bg-[#2a6aad] focus:outline-none focus:ring-2 focus:ring-[#1c4980] focus:ring-offset-2"
                >
                  Create Job alert
                </button>
                {message && <div className="text-gray-600 text-sm mt-4">{message}</div>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

