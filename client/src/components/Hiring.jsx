import React from 'react';
import logo5 from '../assets/logo5.png';
import Carousel from '../pages/Carousel';

const Hiring = () => {
  return (
    <div className="bg-white shadow-md p-6 md:p-12 mt-6 md:mt-12 flex flex-col md:flex-row items-center justify-around gap-6 rounded-lg overflow-hidden">
      
      <div className="md:flex md:w-1/3 flex-col items-center justify-center rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="md:w-1/4 image_part">
          <img src={logo5} alt="Hiring Company Logo" className="w-full h-24 object-cover rounded-t-lg" />
        </div>
        <div className="md:w-full flex flex-col items-center text-center text_part p-4 md:p-6 bg-white rounded-b-lg">
          <h1 className="text-xl md:text-2xl font-bold mb-4">Hiring Company</h1>
          <p className="text-gray-700 mb-4">
            We are a leading recruitment agency in the UK and Ireland.
          </p>
          <button className="bg-dark-blue text-white px-4 py-2 rounded-md hover:bg-light-blue transition-colors duration-300">
            Apply Job
          </button>
        </div>
      </div>
      
      <div className="SliderPart w-full md:w-2/3">
        <div className='text-center text-2xl md:text-3xl mb-4'>Companies that are Hiring</div>
        <Carousel />
      </div>
    </div>
  );
};

export default Hiring;