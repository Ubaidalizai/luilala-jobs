import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CoursesNavigation from './CoursesNavigation';
import AllCourses from './AllCourses';

export default function OnlineCourse() {
  const [logos, setLogos] = useState([]);

  // Fetch logos from the backend
  useEffect(() => {
    axios.get('http://127.0.0.1:3000/api/v1/employer/logos') // Update the URL with your backend endpoint
      .then(response => {
        setLogos(response.data); // Assume response.data is the array of logo objects
      })
      .catch(error => {
        console.error('Error fetching logos:', error);
      });
  }, []);

  return (
    <div>
      <CoursesNavigation />
      <AllCourses />

      {/* Learn with Confidence Section */}
      <div className="bg-[#fff] p-6 sm:p-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-bold text-center text-gray-900 mb-8 sm:mb-12">
            Learn with confidence
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {logos.slice(0, 5).map((logo, index) => (
              <div key={index}>
                <img src={logo.logo} alt={`Logo ${index + 1}`} className="h-20 sm:h-32 w-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* As Featured In Section */}
      <div className="bg-gray-100 p-6 sm:p-8 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-bold text-center text-gray-900 mb-8 sm:mb-12">
            As featured in ...
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
            {logos.slice(5).map((logo, index) => (
              <div key={index}>
                <a href="#">
                  <img src={logo.logo} alt={`Logo ${index + 6}`} className="h-10 sm:h-12 w-auto" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Certificate ID Section */}
      <div className="bg-[#1a3857] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center mx-auto">
          <div className="text-white font-bold text-2xl sm:text-3xl mx-6 mb-6 text-center">
            Validate a student's qualification. Enter their certificate ID to begin.
          </div>
          <div className="relative flex w-full sm:w-auto">
            <input
              type="search"
              placeholder="Enter certificate ID"
              className="w-full bg-transparent border border-white rounded-md py-2 sm:py-3 pl-4 pr-12 text-white placeholder:text-white focus:outline-none focus:ring-2 focus:ring-[#002244] focus:border-white sm:text-sm"
            />
            <div className="absolute inset-y-0 z-20 cursor-pointer right-0 pr-3 flex items-center ">
              <svg
                className="h-6 sm:h-8 w-6 sm:h-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
