
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

function Searchbar() {
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [minSalary, setMinSalary] = useState('');
  const [maxSalary, setMaxSalary] = useState('');
  const [jobType, setJobType] = useState('');
  const [salaryType, setSalaryType] = useState('');
  const [industry, setIndustry] = useState('');
  const [postedDays, setPostedDays] = useState('');
  const [industryTypes, setIndustryTypes] = useState([]); // State to hold fetched industry types

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch industry types from the backend
    fetch('http://127.0.0.1:3000/api/v1/employer/industries')  // Adjust the endpoint based on your backend route
      .then((response) => response.json())
      .then((data) => {
        setIndustryTypes(data);  // Store the fetched industry types in state
      })
      .catch((error) => console.error('Error fetching industry types:', error));
  }, []);

  const toggleMoreOptions = () => {
    setShowMoreOptions(!showMoreOptions);
  };

  const handleSearch = () => {
    const queryParams = new URLSearchParams({
      keyword,
      location,
      minSalary,
      maxSalary,
      jobType,
      salaryType,
      industry,
      postedDays,
    }).toString();

    navigate(`/secondSearch-Result?${queryParams}`);
  };

  return (
    <div className="p-6 bg-gradient-to-r from-[#002244] to-[#4682B4]">
      <div className="container mx-auto px-4">
        <div className="mt-4 shadow-md p-4 flex flex-col md:flex-row">
          <div className="flex-grow mr-3 flex items-center mb-2 md:mb-0">
            <input
              className="w-full p-3 rounded-md border-slate-200 focus:outline-none bg-white text-[#002244] placeholder-gray-400"
              type="text"
              placeholder="Job title or keyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
          <div className="flex-grow flex items-center mb-2 md:mb-0">
            <input
              className="w-full p-3 rounded-md border-slate-200 focus:outline-none bg-white text-[#002244] placeholder-gray-400"
              type="text"
              placeholder="Add Country or City"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col bg-[#002244] shadow-md p-4 mt-4 border-t-2 border-slate-700">
          <div className="flex flex-wrap gap-4">
            <input
              className="w-full md:w-1/4 p-3 border border-slate-200 rounded-md focus:outline-none bg-white text-[#002244] placeholder-gray-400"
              type="text"
              placeholder="Min Salary"
              value={minSalary}
              onChange={(e) => setMinSalary(e.target.value)}
            />
            <input
              className="w-full md:w-1/4 p-3 border border-slate-200 rounded-md focus:outline-none bg-white text-[#002244] placeholder-gray-400"
              type="text"
              placeholder="Max Salary"
              value={maxSalary}
              onChange={(e) => setMaxSalary(e.target.value)}
            />
            <select
              className="w-full md:w-1/4 py-2 border-slate-200 focus:outline-none bg-white text-[#002244]"
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
            >
              <option value="">Job Type</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="contract">Contract</option>
            </select>
            <select
              className="w-full md:w-1/4 py-2 border-slate-200 focus:outline-none bg-white text-[#002244]"
              value={salaryType}
              onChange={(e) => setSalaryType(e.target.value)}
            >
              <option value="">Salary Type</option>
              <option value="hourly">Hourly</option>
              <option value="annual">Annual</option>
            </select>
          </div>
          
          {showMoreOptions && (
            <div className="flex flex-wrap gap-4 mt-4">
              <select
                className="w-full md:w-1/4 py-2 border-slate-200 focus:outline-none bg-white text-[#002244]"
                value={postedDays}
                onChange={(e) => setPostedDays(e.target.value)}
              >
                <option value="">Posted in the</option>
                <option value="last-10-days">Last 10 days</option>
                <option value="last-20-days">Last 20 days</option>
                <option value="last-30-days">Last 30 days</option>
              </select>
              <select
                className="w-full md:w-1/4 py-2 border-slate-200 focus:outline-none bg-white text-[#002244]"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
              >
                <option value="">Search by industry</option>
                {industryTypes.map((type) => (
                  <option key={type._id} value={type.name}>
                    {type.name}
                  </option>
                ))}
              </select>
              <select className="w-full md:w-1/4 py-2 border-slate-200 focus:outline-none bg-white text-[#002244]">
                <option value="">Sort by</option>
                <option value="relevance">Relevance</option>
                <option value="date-posted">Date Posted</option>
                <option value="salary">Salary</option>
                <option value="company-name">Company Name</option>
              </select>
            </div>
          )}

          <div className="flex justify-between mt-4">
            <button
              className="bg-[#194162] text-white px-4 py-2 rounded-full hover:bg-[#20517b] transition-colors duration-300"
              onClick={toggleMoreOptions}
            >
              {showMoreOptions ? 'Less Options' : 'More Options'}
            </button>
            <button
              className="bg-[#194162] text-white px-4 py-2 rounded-full hover:bg-[#20517b] transition-colors duration-300"
              onClick={handleSearch}
            > Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Searchbar;
