import { useState } from 'react';

function Searchbar() {
  const [showMoreOptions, setShowMoreOptions] = useState(false);

  const toggleMoreOptions = () => {
    setShowMoreOptions(!showMoreOptions);
  };

  const industryTypes = [
    { name: 'Technology', posted_days: 10 },
    { name: 'Finance', posted_days: 20 },
    { name: 'Healthcare', posted_days: 5 },
    { name: 'Retail', posted_days: 15 },
    { name: 'Manufacturing', posted_days: 30 },
    { name: 'Education', posted_days: 8 },
    { name: 'Logistics', posted_days: 12 },
    { name: 'Energy', posted_days: 18 },
    { name: 'Agriculture', posted_days: 25 },
  ].sort((a, b) => b.posted_days - a.posted_days);

  return (
    <div className="p-6 bg-gradient-to-r from-[#002244] to-[#4682B4]">
      <div className="container mx-auto px-4">
        <div className="mt-4 shadow-md p-4 flex flex-col md:flex-row">
          <div className="flex-grow mr-3   flex items-center mb-2 md:mb-0">
            <input
              className="w-full p-3  rounded-md border-slate-200 focus:outline-none bg-white text-[#002244] placeholder-gray-400"
              type="text"
              placeholder="Job title or keyword"
            />
          </div>
          <div className="flex-grow flex items-center mb-2 md:mb-0">
            <input
              className="w-full p-3 rounded-md border-slate-200 focus:outline-none bg-white text-[#002244] placeholder-gray-400"
              type="text"
              placeholder="Add Country or City"
            />
          </div>
        </div>

        <div className="flex flex-col bg-[#002244] shadow-md p-4 mt-4 border-t-2 border-slate-700">
          <div className="flex flex-wrap gap-4">
            <input
              className="w-full md:w-1/4 p-3 border border-slate-200 rounded-md focus:outline-none bg-white text-[#002244] placeholder-gray-400"
              type="text"
              placeholder="Min Salary"
            />
            <input
              className="w-full md:w-1/4 p-3 border border-slate-200 rounded-md focus:outline-none bg-white text-[#002244] placeholder-gray-400"
              type="text"
              placeholder="Max Salary"
            />
            <select className="w-full md:w-1/4 py-2 border-slate-200 focus:outline-none bg-white text-[#002244]">
              <option value="">Job Type</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="contract">Contract</option>
            </select>
            <select className="w-full md:w-1/4 py-2 border-slate-200 focus:outline-none bg-white text-[#002244]">
              <option value="">Salary Type</option>
              <option value="hourly">Hourly</option>
              <option value="annual">Annual</option>
            </select>
          </div>

          {showMoreOptions && (
            <div className="flex flex-wrap gap-4 mt-4">
              <select className="w-full md:w-1/4 py-2 border-slate-200 focus:outline-none bg-white text-[#002244]">
                <option value="">Posted in the</option>
                <option value="last-10-days">Last 10 days</option>
                <option value="last-20-days">Last 20 days</option>
                <option value="last-30-days">Last 30 days</option>
              </select>
              <select className="w-full md:w-1/4 py-2 border-slate-200 focus:outline-none bg-white text-[#002244]">
                <option value="">Search by industry</option>
                {industryTypes.map((type) => (
                  <option key={type.name} value={type.name}>
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
            <button className="bg-[#194162] text-white px-4 py-2 rounded-full hover:bg-[#20517b] transition-colors duration-300">
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Searchbar;