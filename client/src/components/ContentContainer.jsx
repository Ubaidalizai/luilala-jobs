import React, { useState, useEffect } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import CoursesSection from './CoursesSection';
import axios from 'axios';

const ContentContainer = () => {
  const [showCategory, setShowCategory] = useState(true);
  const [showType, setShowType] = useState(false);
  const [showDuration, setShowDuration] = useState(false);
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [durations, setDurations] = useState([]);

  // State for selected filters
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedDurations, setSelectedDurations] = useState([]);

  const handleCategoryToggle = () => setShowCategory((prevState) => !prevState);
  const handleTypeToggle = () => setShowType((prevState) => !prevState);
  const handleDurationToggle = () => setShowDuration((prevState) => !prevState);

  const handleCheckboxChange = (value, setSelected, selected) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((item) => item !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const [categoriesRes, typesRes, durationsRes] = await Promise.all([
        axios.get('http://127.0.0.1:3000/api/v1/cours/categories/name'),
        axios.get('http://127.0.0.1:3000/api/v1/cours/types'),
        axios.get('http://127.0.0.1:3000/api/v1/cours/duration'),
      ]);
      setCategories(categoriesRes.data);
      setTypes(typesRes.data);
      setDurations(durationsRes.data);
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row p-4 lg:p-12 gap-4">
      <div className="w-full lg:w-1/4 bg-[#fff] p-4 lg:p-12 border-r border-gray-200">
        {/* Category Section */}
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
              {categories.map((categoryName, index) => (
                <li key={index}>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={selectedCategories.includes(categoryName)}
                      onChange={() =>
                        handleCheckboxChange(categoryName, setSelectedCategories, selectedCategories)
                      }
                    />
                    <span className="text-blue-600 hover:text-blue-800 focus:outline-none">
                      {categoryName}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Type Section */}
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
              {types.map((courseType, index) => (
                <li key={index}>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={selectedTypes.includes(courseType)}
                      onChange={() =>
                        handleCheckboxChange(courseType, setSelectedTypes, selectedTypes)
                      }
                    />
                    <span className="text-blue-600 hover:text-blue-800 focus:outline-none">
                      {courseType}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Duration Section */}
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
              {durations.map((courseDuration, index) => (
                <li key={index}>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={selectedDurations.includes(courseDuration)}
                      onChange={() =>
                        handleCheckboxChange(courseDuration, setSelectedDurations, selectedDurations)
                      }
                    />
                    <span className="text-blue-600 hover:text-blue-800 focus:outline-none">
                      {courseDuration}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Courses Section */}
      <div className="w-full lg:w-3/4 p-4">
        <CoursesSection
          selectedCategories={selectedCategories}
          selectedTypes={selectedTypes}
          selectedDurations={selectedDurations}
        />
      </div>
    </div>
  );
};

export default ContentContainer;
