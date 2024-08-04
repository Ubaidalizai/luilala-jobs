import React, { useState, useEffect } from 'react';
import logo1 from '../assets/flog1.png';
import logo2 from '../assets/flogo2.png';
import logo3 from '../assets/flogo3.png';
import logo4 from '../assets/flogo4.png';
import logo5 from '../assets/flogo5.png';
import logo6 from '../assets/flogo6.png';
import logo7 from '../assets/flogo8.png';
import logo8 from '../assets/flogo9.png';
import Logo9 from '../assets/firstLogo.png';
import Logo10 from '../assets/secondLogo.png';
import Logo11 from '../assets/thirdLogo.png';
import Logo12 from '../assets/fourthLof.png';
import Logo13 from '../assets/fifthLogo.png';
import Logo14 from '../assets/bbc.png';
import Logo15 from '../assets/guardian.png';
import Logo16 from '../assets/itv.png';
import Logo17 from '../assets/vogue.png';
import logo20 from '../assets/logo20.png';
import logo21 from '../assets/logo21.png';
import logo24 from '../assets/logo24.png';
import logo25 from '../assets/logo25.png';
import logo26 from '../assets/logo26.png';
import logo27 from '../assets/logo28.png';
import logo28 from '../assets/logo29.png';

const FuturedCompanys = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const logos = [
    logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8, Logo9, Logo10,
    Logo11,logo20,logo21,logo24,logo25,logo26,logo27,logo28, Logo12, Logo13, Logo14, Logo15, Logo16, Logo17
  ];
  const slidesPerPage = 4;
  const slideInterval = 10; // Change the slide every 10 seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % Math.ceil(logos.length / slidesPerPage));
    }, slideInterval * 1000);

    return () => clearInterval(interval);
  }, [logos.length, slidesPerPage, slideInterval]);

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + Math.ceil(logos.length / slidesPerPage)) % Math.ceil(logos.length / slidesPerPage));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % Math.ceil(logos.length / slidesPerPage));
  };

  const getCurrentLogos = () => {
    const startIndex = currentSlide * slidesPerPage;
    return logos.slice(startIndex, startIndex + slidesPerPage);
  };

  return (
    <div className="bg-gray-100 p-16">
      <div className="container w-full p-2 ">
        <h2 className="text-4xl  text-center font-bold mb-10">Featured companies</h2>
        <div className="relative">
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 text-gray-600 font-bold py-2 px-4 rounded-r-lg"
            onClick={handlePrevSlide}
          >
            Prev
          </button>
          <div className="bg-white shadow-lg rounded-lg grid grid-cols-2 md:grid-cols-4 gap-6 p-6">
            {getCurrentLogos().map((logo, index) =>  (
              <div key={index} className="flex gap-x-4 flex-col items-center">
                <img src={logo} alt={`Logo ${index + 1}`} className="w-full h-24 object-contain" />
                <a href="#" className="block bg-gray-800 text-white font-bold py-2 px-4 rounded-b-lg hover:bg-gray-700 mt-2">
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