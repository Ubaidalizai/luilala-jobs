import React from 'react';
import recursting1 from '../assets/recursting1.png';

const Recursting = () => {
  return (
    <div className="flex bg-gray-200  items-center justify-center">
      <div className="bg-gray-200   rounded-lg shadow-lg p-8 w-full flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
          <h3 className="text-3xl font-bold mb-4 text-gray-800">Recruiting?</h3>
          <p className="text-gray-600 md:w-2/3 mb-6">
            Advertise your jobs to millions of monthly users and search 20.1 million CVs in our database.
          </p>
          
        </div>
        <button className="bg-blue-500 mr-16 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300 ease-in-out">
            Start Recruiting Now
          </button>
        <div className="md:w-1/4 flex justify-center">
          <img src={recursting1} alt="CV" className="w-[2000px] rounded-md " />
        </div>
      </div>
    </div>
  );
};

export default Recursting;