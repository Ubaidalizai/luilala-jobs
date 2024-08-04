import { useState } from 'react';
import newStar from '../assets/newStar.png';
import CVLibraryInfo from './CVLibraryInfo';

function Hero() {
  const [showMoreOptions, setShowMoreOptions] = useState(false);

  const toggleMoreOptions = () => {
    setShowMoreOptions(!showMoreOptions);
  };

  return (
    <div className="bg-gradient-to-r from-[#002244] to-[#001122] h-auto px-4 py-8 pb-16">
      <div className="container mx-auto px-6 sm:px-8">
        <div className="text-center flex flex-col items-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Find Your Dream Job</h1>
          <img
            className="mx-8 mt-4 w-16 h-16"
            loading="lazy"
            alt="Star icon"
            src={newStar}
          />
        </div>
        
        <div className="mt-8  rounded-lg shadow-md p-6 flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-grow w-full sm:w-[auto] flex items-center">
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg> */}
            <input
              className="ml-2 w-full  py-4 p-4 rounded-md focus:outline-none bg-white text-[#002244] placeholder-gray-400"
              type="text"
              placeholder="Job title or keyword"
            />
          </div>
          <div className="flex-grow w-full sm:w-[auto]  flex items-center">
            {/* <svg
            //   xmlns="http://www.w3.org/2000/svg"
            //   fill="none"
            //   viewBox="0 0 24 24"
            //   strokeWidth={1.5}
            //   stroke="currentColor"
            //   className="w-6 h-6 text-white"
            // >
            //   <path
            //     strokeLinecap="round"
            //     strokeLinejoin="round"
            //     d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            //   />
            //   <path
            //     strokeLinecap="round"
            //     strokeLinejoin="round"
            //     d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
            //   />
            // </svg> */}
            <input
              className="ml-2 w-full py-4 p-4 rounded-md focus:outline-none bg-white text-[#002244] placeholder-gray-400"
              type="text"
              placeholder="Add Country or City"
            />
          </div>
        </div>

        {showMoreOptions && (
          <div className="mt-4 flex flex-col sm:flex-row items-center gap-4  rounded-lg shadow-md p-6">
            <input
              className="ml-2 w-full py-3 p-4 rounded-md focus:outline-none  bg-white text-[#002244] placeholder-gray-400"
              type="text"
              placeholder="Minimum Salary"
            />
            <input
              className="ml-2 w-full py-3 p-4 rounded-md focus:outline-none  bg-white text-[#002244] placeholder-gray-400"
              type="text"
              placeholder="Maximum Salary"
            />
            <select className="ml-2 w-full py-3 p-4 rounded-md focus:outline-none  bg-white text-[#002244]">
              <option value="">Select Job Type</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="contract">Contract</option>
            </select>
            <select className="ml-2 w-full py-3 p-4 rounded-md focus:outline-none  bg-white text-[#002244]">
              <option value="">Select Salary Type</option>
              <option value="hourly">Hourly</option>
              <option value="annual">Annual</option>
            </select>
          </div>
        )}

        <div className="mt-6 flex flex-col sm:flex-row justify-end gap-4">
          <button className="bg-[#194162] text-white px-8 py-4 rounded-full hover:bg-[#20517b] transition-colors duration-300 shadow-lg">
            Search
          </button>
          <button
            className="bg-[#194162] text-white px-8 py-4 rounded-full hover:bg-[#20517b] transition-colors duration-300 shadow-lg"
            onClick={toggleMoreOptions}
          >
            {showMoreOptions ? 'Less Options' : 'More Options'}
          </button>
        </div>
      </div>
      <CVLibraryInfo />
    </div>
  );
}

export default Hero;