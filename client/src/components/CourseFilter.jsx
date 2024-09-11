import React, { useState } from 'react';
import ContentContainer from './ContentContainer';
import CoursesSection from './CoursesSection';

const categories = [
  { id: 'all', name: 'All Courses', count: 0 },
  { id: 'admin-secretarial-hr', name: 'Admin / Secretarial / HR', count: 41 },
  { id: 'animal-care', name: 'Animal Care', count: 14 },
  { id: 'beauty', name: 'Beauty', count: 14 },
  { id: 'business', name: 'Business', count: 112 },
  { id: 'cleaning', name: 'Cleaning', count: 6 },
  { id: 'computing', name: 'Computing', count: 56 },
  { id: 'teaching', name: 'Education', count: 39 },
  { id: 'entertainment', name: 'Entertainment', count: 7 },
  { id: 'fashion-design', name: 'Fashion & Design', count: 4 },
  { id: 'finance', name: 'Finance', count: 26 },
  { id: 'fitness', name: 'Fitness', count: 12 },
  { id: 'food-safety', name: 'Food Safety', count: 8 },
  { id: 'health-safety', name: 'Health & Safety', count: 72 },
  { id: 'horticulture', name: 'Horticulture', count: 4 },
  { id: 'hospitality-tourism', name: 'Hospitality & Tourism', count: 11 },
  { id: 'medical', name: 'Medical', count: 37 },
  { id: 'mega-course', name: 'Multi-Course', count: 85 },
  { id: 'personal-development', name: 'Personal Development', count: 43 },
  { id: 'sales-marketing', name: 'Sales / Marketing', count: 47 },
  { id: 'short-courses', name: 'Short Course', count: 36 },
  { id: 'social-care', name: 'Social / Care', count: 22 },
  { id: 'writing', name: 'Writing', count: 12 },
];

const types = [
  { id: 'video', name: 'Video Learning' },
  { id: 'audio', name: 'Audio Learning' },
  { id: 'text', name: 'Text Learning' },
];

const durations = [
  { id: 'any', name: 'Any' },
  { id: '0-0.5', name: '< 30 mins' },
  { id: '0.5-10', name: '30 mins - 10 hours' },
  { id: '10-9999', name: '10 hours +' },
];

const sampleCourses = [
  {
    id: '1',
    title: 'Admin Course 1',
    description: 'Description for Admin Course 1',
    category: 'admin-secretarial-hr',
    type: 'video',
    duration: 1,
  },
  {
    id: '2',
    title: 'Animal Care Course 1',
    description: 'Description for Animal Care Course 1',
    category: 'animal-care',
    type: 'text',
    duration: 5,
  },
  {
    id: '3',
    title: 'Beauty Course 1',
    description: 'Description for Beauty Course 1',
    category: 'beauty',
    type: 'audio',
    duration: 0.5,
  },
  {
    id: '4',
    title: 'Business Course 1',
    description: 'Description for Business Course 1',
    category: 'business',
    type: 'video',
    duration: 12,
  },
  // Add more courses with various categories, types, and durations
];

export default function CourseFilter() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedDuration, setSelectedDuration] = useState('any');

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleTypeChange = (type) => {
    setSelectedTypes((prevTypes) =>
      prevTypes.includes(type)
        ? prevTypes.filter((t) => t !== type)
        : [...prevTypes, type]
    );
  };

  const handleDurationChange = (duration) => {
    setSelectedDuration(duration);
  };

  const filterData = () => {
    return sampleCourses.filter((course) => {
      const isCategoryMatch =
        selectedCategory === 'all' || course.category === selectedCategory;
      const isTypeMatch =
        selectedTypes.length === 0 || selectedTypes.includes(course.type);
      const isDurationMatch =
        selectedDuration === 'any' ||
        (selectedDuration === '0-0.5' && course.duration < 0.5) ||
        (selectedDuration === '0.5-10' &&
          course.duration >= 0.5 &&
          course.duration <= 10) ||
        (selectedDuration === '10-9999' && course.duration > 10);

      return isCategoryMatch && isTypeMatch && isDurationMatch;
    });
  };

  const filteredData = filterData();

  return (
    <div className="container mx-auto my-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="col-span-1">
          <div id="accordion">
            <div className="card">
              <div id="category" className="card-header">
                <h5 className="mb-0">
                  <button
                    className="filter-title"
                    onClick={() => handleCategoryChange('all')}
                  >
                    Category
                  </button>
                </h5>
              </div>
              <div id="categoryData">
                <div className="card-body">
                  <ul className="custom-control">
                    {categories.map((category) => (
                      <li key={category.id}>
                        <button
                          className={
                            selectedCategory === category.id ? 'active' : ''
                          }
                          onClick={() => handleCategoryChange(category.id)}
                        >
                          {category.name} ({category.count})
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="card">
              <div id="type" className="card-header">
                <h5 className="mb-0">
                  <button className="filter-title">Type</button>
                </h5>
              </div>
              <div id="typeData">
                <div className="card-body">
                  {types.map((type) => (
                    <div
                      className="custom-control custom-checkbox"
                      key={type.id}
                    >
                      <input
                        type="checkbox"
                        value={type.id}
                        id={type.id}
                        className="custom-control-input filterTypes"
                        onChange={() => handleTypeChange(type.id)}
                      />
                      <label htmlFor={type.id} className="custom-control-label">
                        {type.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="card">
              <div id="duration" className="card-header">
                <h5 className="mb-0">
                  <button className="filter-title">Duration</button>
                </h5>
              </div>
              <div id="durationData">
                <div className="card-body">
                  {durations.map((duration) => (
                    <div
                      className="custom-control custom-checkbox"
                      key={duration.id}
                    >
                      <input
                        type="radio"
                        name="duration"
                        value={duration.id}
                        id={duration.id}
                        className="custom-control-input"
                        onChange={() => handleDurationChange(duration.id)}
                        checked={selectedDuration === duration.id}
                      />
                      <label
                        htmlFor={duration.id}
                        className="custom-control-label"
                      >
                        {duration.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-3">
          <ContentContainer>
            <CoursesSection courses={filteredData} />
          </ContentContainer>
        </div>
      </div>
    </div>
  );
}
