import React, { useState, useEffect } from 'react';
import axios from 'axios';


const FuturedCompanys = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [logos, setLogos] = useState([]);

  const slidesPerPage = 4;
  const slideInterval = 10; // Change the slide every 10 seconds
  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get(
        'http://127.0.0.1:3000/api/v1/employer/logos'
      );
      const allLogos = data.data.map((logo) => logo.logo);
      setLogos(allLogos);
    };
    
    const interval = setInterval(() => {
      setCurrentSlide(
        (prevSlide) => (prevSlide + 1) % Math.ceil(logos.length / slidesPerPage)
      );
    }, slideInterval * 1000);

    fetchData();
    return () => clearInterval(interval);
  }, [logos.length, slidesPerPage, slideInterval]);

  const handlePrevSlide = () => {
    setCurrentSlide(
      (prevSlide) =>
        (prevSlide - 1 + Math.ceil(logos.length / slidesPerPage)) %
        Math.ceil(logos.length / slidesPerPage)
    );
  };

  const handleNextSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide + 1) % Math.ceil(logos.length / slidesPerPage)
    );
  };

  const getCurrentLogos = () => {
    const startIndex = currentSlide * slidesPerPage;

    return logos.slice(startIndex, startIndex + slidesPerPage);
  };
  return (
    <div className="bg-gray-100 p-16">
      <div className="container w-full p-2 ">
        <h2 className="text-4xl  text-center font-bold mb-10">
          Featured companies
        </h2>
        <div className="relative">
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 text-gray-600 font-bold py-2 px-4 rounded-r-lg"
            onClick={handlePrevSlide}
          >
            Prev
          </button>
          <div className="bg-white shadow-lg rounded-lg grid grid-cols-2 md:grid-cols-4 gap-6 p-6">
            {getCurrentLogos().map((logo, index) => (
              <div key={index} className="flex gap-x-4 flex-col items-center">
                <img
                  src={logo}
                  alt={`Logo ${index + 1}`}
                  className="w-full h-24 object-contain"
                />
                <a
                  href="#"
                  className="block bg-gray-800 text-white font-bold py-2 px-4 rounded-b-lg hover:bg-gray-700 mt-2"
                >
                  12 Courses
                </a>
              </div>
            ))}
          </div>
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 text-gray-600 font-bold py-2 px-4 rounded-l-lg"
            onClick={handleNextSlide}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default FuturedCompanys;
