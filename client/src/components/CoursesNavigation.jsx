import React, { useState } from 'react';
import Navimg from '../assets/coursesNav.png';
import { Link, useLocation } from 'react-router-dom';
import { FaMinus } from 'react-icons/fa';

const CoursesNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const getLinkClass = (path) => {
    return location.pathname === path
      ? 'text-gray-900 font-semibold'
      : 'text-gray-700 hover:text-gray-900';
  };

  return (
    <nav className="bg-white shadow-md p-4 sm:px-6 lg:px-8 flex justify-between items-center">
      <div className="logo">
        <img src={Navimg} alt="Courses Navigation" className="max-h-10 sm:max-h-12" />
      </div>
      <div className="hidden sm:flex links space-x-4 sm:space-x-6">
        <Link to="/courseshome" className={getLinkClass('/courseshome')}>
          Courses Home
        </Link>
        <Link to="/onlinecourses" className={getLinkClass('/onlinecourses')}>
          Online Courses
        </Link>
        <Link to="/stafftraining" className={getLinkClass('/stafftraining')}>
          Staff Training
        </Link>
      </div>
      <div className="buttons flex space-x-2 sm:space-x-4">
        <button className="bg-[#002244] text-white py-2 px-3 rounded-md hover:bg-[#001122] text-sm sm:py-2 sm:px-4 sm:text-base">
          Courses Sign in
        </button>
        <button
          className="sm:hidden block text-gray-600 hover:text-gray-800 p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
      {isMenuOpen && (
        <div
          className="sm:hidden fixed top-0 left-0 w-full h-[120vh] bg-gray-100 shadow-md p-4 z-10 flex flex-col"
          role="menu"
        >
          <div
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="cursor-pointer flex justify-end text-left mb-4"
          >
            <FaMinus />
          </div>
          <div className="flex flex-col space-y-4">
            <Link
              to="/courseshome"
              className={`block py-2 px-4 text-gray-700 hover:text-gray-900 ${getLinkClass('/courseshome')}`}
            >
              Courses Home
            </Link>
            <Link
              to="/onlinecourses"
              className={`block py-2 px-4 text-gray-700 hover:text-gray-900 ${getLinkClass('/onlinecourses')}`}
            >
              Online Courses
            </Link>
            <Link
              to="/stafftraining"
              className={`block py-2 px-4 text-gray-700 hover:text-gray-900 ${getLinkClass('/stafftraining')}`}
            >
              Staff Training
            </Link>
            <button className="block py-2 px-4 text-white bg-[#002244] hover:bg-[#001122] rounded-md">
              Courses Sign in
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default CoursesNavigation;