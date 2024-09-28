import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function SecondSearchResult() {
  const location = useLocation();
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchCriteria = {
      keyword: queryParams.get('keyword'),
      location: queryParams.get('location'),
      minSalary: queryParams.get('minSalary'),
      maxSalary: queryParams.get('maxSalary'),
      jobType: queryParams.get('jobType'),
      salaryType: queryParams.get('salaryType'),
      industry: queryParams.get('industry'),
      postedDays: queryParams.get('postedDays'),
    };

    fetch(`http://127.0.0.1:3000/api/v1/job/findJob?${location.search}`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.jobs)) {
          setSearchResults(data.jobs);
        } else {
          console.error('Invalid data format. Expected an array.');
          setSearchResults([]); // Reset to empty array on invalid format
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching search results:', error);
        setError('Failed to fetch search results');
        setIsLoading(false);
      });
  }, [location.search]);

  return (
    <div className="p-6 bg-gradient-to-r from-[#002244] to-[#4682B4] min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Jobs Search Results</h1>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-screen">
            <p className="text-white text-xl">Loading...</p>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center min-h-screen">
            <p className="text-red-500 text-xl">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {searchResults.length > 0 ? (
              searchResults.map((result) => (
                <div
                  key={result.id}
                  className="bg-white shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
                >
                  <div className="p-6 flex flex-col justify-between h-full">
                    {/* Logo */}
                    <div className="flex justify-center mb-4">
                      <img
                        src={result.empId.logo}
                        alt={`${result.empId.employerName} logo`}
                        className="w-24 h-24 object-contain"
                      />
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-semibold mb-4 leading-tight" style={{ color: '#FF4500' }}>
                      {result.title}
                    </h2>

                    {/* Job Details */}
                    <div className="mb-4">
                      <p className="text-gray-700">
                        <span className="font-bold">Location:</span> {result.location}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-bold">Company:</span> {result.empId.employerName}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-bold">Salary:</span> ${result.minSalary} - ${result.maxSalary}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-bold">Job Type:</span> {result.jobType}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-bold">Salary Type:</span> {result.salaryType}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-bold">Posted:</span> {result.postedTime} ago
                      </p>
                    </div>

               
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full flex justify-center items-center">
                <p className="text-gray-700 text-xl">No results found</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SecondSearchResult;
