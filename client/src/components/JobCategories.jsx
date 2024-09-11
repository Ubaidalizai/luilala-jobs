
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error Boundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong.</h2>;
    }

    return this.props.children; 
  }
}

const JobCategories = () => {
  const [trendingJobs, setTrendingJobs] = useState([]);
  const [industryJobs, setIndustryJobs] = useState([]);

  useEffect(() => {
    const fetchTrendingJobs = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:3000/api/v1/job/trendingJob');
        setTrendingJobs(Array.isArray(response.data) ? response.data : []); // Ensure data is an array
      } catch (error) {
        console.error('Error fetching trending jobs:', error);
      }
    };

    const fetchIndustryJobs = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:3000/api/v1/job/industry');
        setIndustryJobs(Array.isArray(response.data) ? response.data : []); // Ensure data is an array
      } catch (error) {
        console.error('Error fetching industry jobs:', error);
      }
    };

    fetchTrendingJobs();
    fetchIndustryJobs();
  }, []);

  const jobCategories = [
    {
      title: 'Trending Jobs',
      jobs: trendingJobs,
    },
    {
      title: 'More industries',
      jobs: industryJobs,
    },
  ];

  return (
    <ErrorBoundary>
      <div className="bg-gray-100 px-6 py-8">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-4">Browse Jobs</h2>
          {jobCategories.map((category, index) => (
            <div key={index} className="mb-8">
              <h3 className="text-xl font-bold mb-2">{category.title}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {Array.isArray(category.jobs) && category.jobs.length > 0 ? (
                  category.jobs.map((job, i) => (
                    <div
                      key={i}
                      className="bg-white shadow-md rounded-md p-4 hover:bg-gray-200 transition-colors duration-300 cursor-pointer"
                    >
                      {job}
                    </div>
                  ))
                ) : (
                  <div>No jobs available</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default JobCategories;
