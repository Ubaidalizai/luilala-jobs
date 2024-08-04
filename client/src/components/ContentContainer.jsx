import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import CoursesSection from './CoursesSection';

const ContentContainer = () => {
  const [showCategory, setShowCategory] = useState(true);
  const [showType, setShowType] = useState(false);
  const [showDuration, setShowDuration] = useState(false);

  const handleCategoryToggle = () => {
    setShowCategory((prevState) => !prevState);
  };

  const handleTypeToggle = () => {
    setShowType((prevState) => !prevState);
  };

  const handleDurationToggle = () => {
    setShowDuration((prevState) => !prevState);
  };

  const courseNames = [
    'Introduction to Programming',
    'Data Structures and Algorithms',
    'Web Development Fundamentals',
    'Machine Learning for Beginners',
    'Cybersecurity Essentials',
    'Mobile App Development',
    'Database Management Systems',
    'Artificial Intelligence and Robotics'
  ];

  const courseTypes = [
    'Online',
    'In-Person',
    'Hybrid',
    'Self-Paced',
    'Instructor-Led',
    'Hands-On',
    'Video-Based',
    'Interactive'
  ];

  const courseDurations = [
    '1 week',
    '1 month',
    '3 months',
    '6 months',
    '1 year',
    '2 years',
    '4 years',
    'Lifetime Access'
  ];

  return (
    <div className="flex flex-col lg:flex-row p-4 lg:p-12 gap-4">
      <div className="w-full lg:w-1/4 bg-[#fff] p-4 lg:p-12 border-r border-gray-200">
        <div className="mb-4 lg:mb-8 mt-4 flex items-center justify-between">
          <div className="font-bold mb-2">Category</div>
          <button
            className={`px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 focus:outline-none ${
              showCategory ? 'bg-gray-300' : ''
            }`}
            onClick={handleCategoryToggle}
          >
            {showCategory ? <FaChevronDown /> : <FaChevronUp />}
          </button>
        </div>
        {showCategory && (
          <div className="mt-2 mb-4">
            <ul className="space-y-2">
              {courseNames.map((courseName, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-blue-600 hover:text-blue-800 focus:outline-none"
                  >
                    {courseName}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="mb-4 lg:mb-8 mt-4 flex items-center justify-between">
          <div className="font-bold mb-2">Type</div>
          <button
            className={`px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 focus:outline-none ${
              showType ? 'bg-gray-300' : ''
            }`}
            onClick={handleTypeToggle}
          >
            {showType ? <FaChevronDown /> : <FaChevronUp />}
          </button>
        </div>
        {showType && (
          <div className="my-4">
            <ul className="space-y-2">
              {courseTypes.map((courseType, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-blue-600 hover:text-blue-800 focus:outline-none"
                  >
                    {courseType}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="mb-4 flex items-center justify-between">
          <div className="font-bold mb-2">Duration</div>
          <button
            className={`px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 focus:outline-none ${
              showDuration ? 'bg-gray-300' : ''
            }`}
            onClick={handleDurationToggle}
          >
            {showDuration ? <FaChevronDown /> : <FaChevronUp />}
          </button>
        </div>
        {showDuration && (
          <div className="my-4">
            <ul className="space-y-2">
              {courseDurations.map((courseDuration, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-blue-600 hover:text-blue-800 focus:outline-none"
                  >
                    {courseDuration}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="w-full lg:w-3/4 p-4">
        <CoursesSection />
      </div>
    </div>
  );
};

export default ContentContainer;