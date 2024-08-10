import React from 'react';
import Navimg from '../assets/coursesNav.png';
import CoursesNavigation from './CoursesNavigation';
import AllCourses from './AllCourses';
import Logo1 from '../assets/firstLogo.png';
import Logo2 from '../assets/secondLogo.png';
import Logo3 from '../assets/thirdLogo.png';
import Logo4 from '../assets/fourthLof.png';
import Logo5 from '../assets/fifthLogo.png';
import Logo6 from '../assets/bbc.png';
import Logo7 from '../assets/guardian.png';
import Logo8 from '../assets/itv.png';
import Logo9 from '../assets/vogue.png';

export default function OnlineCourse() {
  return (
    <div className="">
      <CoursesNavigation />
      <AllCourses />
      <div className="bg-[#fff] p-6 sm:p-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-bold text-center text-gray-900 mb-8 sm:mb-12">
            Learn with confidence
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            <div>
              <img src={Logo1} alt="" className="h-20 sm:h-32 w-auto" />
            </div>
            <div>
              <img src={Logo2} alt="" className="h-20 sm:h-32 w-auto" />
            </div>
            <div>
              <img src={Logo3} alt="" className="h-20 sm:h-32 w-auto" />
            </div>
            <div>
              <img src={Logo4} alt="" className="h-20 sm:h-32 w-auto" />
            </div>
            <div>
              <img src={Logo5} alt="" className="h-20 sm:h-32 w-auto" />
            </div>
          </div>
        </div>
      </div>
      {/* online section second part logo */}
      <div className="bg-gray-100 p-6 sm:p-8 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-bold text-center text-gray-900 mb-8 sm:mb-12">
            As featured in ...
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
            <div>
              <a href="#">
                <img src={Logo6} alt="" className="h-10 sm:h-12 w-auto" />
              </a>
            </div>
            <div>
              <a href="#">
                <img src={Logo7} alt="" className="h-10 sm:h-12 w-auto" />
              </a>
            </div>
            <div>
              <a href="#">
                <img src={Logo8} alt="" className="h-10 sm:h-12 w-auto" />
              </a>
            </div>
            <div>
              <a href="#">
                <img src={Logo9} alt="" className="h-10 sm:h-12 w-auto" />
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* work for certificate id */}
      <div className="bg-[#1a3857] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center mx-auto">
          <div className="text-white font-bold text-2xl sm:text-3xl mx-6 mb-6 text-center">
            Validate a student's qualification. Enter their certificate ID to
            begin.
          </div>
          <div className="relative flex w-full sm:w-auto">
            <input
              type="search"
              placeholder="Enter certificate ID"
              className="w-full bg-transparent border border-white rounded-md py-2 sm:py-3 pl-4 pr-12 text-white placeholder:text-white focus:outline-none focus:ring-2 focus:ring-[#002244] focus:border-white sm:text-sm"
            />
            <div className="absolute inset-y-0 z-20 cursor-pointer right-0 pr-3 flex items-center ">
              <svg
                className="h-6 sm:h-8 w-6 sm:w-8 text-white"
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
