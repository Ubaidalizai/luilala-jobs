import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import FutureImg from '../assets/future.png';

const reviewData = [
  { rating: 5, date: '22 Feb 2024', review: 'I have enjoyed doing my choice of course. The content is very informative and the instructor is knowledgeable.', name: 'John Doe' },
  { rating: 4, date: '15 Mar 2024', review: 'The course was well-structured and the materials were easy to follow. I learned a lot of new skills.', name: 'Jane Smith' },
  { rating: 5, date: '05 April 2024', review: 'Excellent course! The instructor was very engaging and the content was top-notch. Highly recommended.', name: 'Michael Johnson' },
  { rating: 4, date: '10 May 2024', review: 'The course content was informative, but I felt the pacing could be improved.', name: 'Sarah Lee' },
  { rating: 5, date: '22 June 2024', review: 'Excellent course! The instructor was very knowledgeable and the content was engaging.', name: 'David Kim' },
  { rating: 4, date: '01 July 2024', review: 'The course was helpful, but I would have liked more hands-on exercises.', name: 'Emily Chen' }
];

export default function Rating() {
  const [currentIndex, setCurrentIndex] = useState(0);
 
  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviewData.length) % reviewData.length);
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviewData.length);
  };

  return (
    <>
      <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl mx-auto">
          <div className="flex flex-col lg:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-8 bg-[#002244] text-white flex-shrink-0">
              <h2 className="text-2xl font-bold">Excellent</h2>
              <div className="flex items-center space-x-2 mt-4">
                {[...Array(5)].map((_, index) => (
                  <FaStar key={index} />
                ))}
                <div>4.5 out of 5 stars</div>
              </div>
              <div className='mt-2'>Based on 3,186 reviews</div>
              <div className="flex mt-2 items-center space-x-2">
                <FaStar className="text-[#fff]" />
                <span>Trusted on Trustpilot</span>
              </div>
            </div>
            <div className="px-4 py-4 flex-grow">
              <div className="relative">
                <div className="space-y-8">
                  <div className="bg-gray-100 px-4 py-4 rounded-lg">
                    <div className="flex space-x-2 mb-2 items-center text-[#1a3857]">
                      {[...Array(5)].map((_, index) => (
                        <FaStar key={index} />
                      ))}
                    </div>
                    <div className="text-gray-500">{reviewData[currentIndex].date}</div>
                    <div className="mt-2">{reviewData[currentIndex].review}</div>
                    <div className="mt-4 text-gray-700 font-bold">{reviewData[currentIndex].name}</div>
                  </div>
                </div>
                <div className="absolute top-1/2 transform -translate-y-1/2 flex justify-between w-full px-4">
                  <button className="bg-white rounded-full p-2 shadow-md hover:bg-gray-200 transition-colors" onClick={handlePrevClick}>
                    <FaChevronLeft />
                  </button>
                  <button className="bg-white rounded-full p-2 shadow-md hover:bg-gray-200 transition-colors" onClick={handleNextClick}>
                    <FaChevronRight />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="future p-4 rounded-lg w-full max-w-4xl mx-auto flex items-center flex-col">
        <h1 className="text-4xl mt-8 font-bold text-gray-800 mb-4">Featured Providers</h1>
        <img src={FutureImg} alt="Featured Providers" className="w-full rounded-md" />
      </div>
    </>
  );
}