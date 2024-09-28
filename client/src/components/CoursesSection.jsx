import React, { useState, useEffect } from 'react';

const CoursesSection = ({ selectedCategories, selectedTypes, selectedDurations }) => {
  const [coursesData, setCoursesData] = useState([]);

  useEffect(() => {
    const fetchCoursesData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:3000/api/v1/cours/search-cours?${queryParams.toString()}');
        const data = await response.json();
       
        setCoursesData(data.courses);
      } catch (error) {
        console.error('Error fetching courses data:', error);
      }
    };

    fetchCoursesData();
  }, []);

  // Filter courses based on selected filters
  const filteredCourses = coursesData.filter((course) => {
    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.includes(course.category);
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(course.type);
    const matchesDuration = selectedDurations.length === 0 || selectedDurations.includes(course.duration);
    
    return matchesCategory && matchesType && matchesDuration;
  });

  return (
    
    <div
    
      
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: 'repeat(4, 1fr)',
        gap: '16px',
        height: '100%',
      }}
      className="w-full h-screen overflow-hidden relative"
      
    >
 

        
      {filteredCourses.map((course, index) => (
        
        <div
          key={index}
          
          className="bg-white shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
        >
        
          <div className="p-6 flex flex-col justify-between h-full">
            
            
            {/* Logo */}
            <div className="flex justify-center mb-4">
              <img
                src={course.image}
                alt={`${course.name} image`}
                className="w-full h-56 object-cover"
              />
            </div>

            {/* Title */}
            <h2 className="text-2xl font-semibold mb-4 leading-tight" style={{ color: '#FEe450' }}>
              {course.name}
            </h2>

            {/* Course Details */}
            <div className="mb-4">
              <p className="text-gray-700">{course.category}</p>
              <p className="text-gray-700">{course.type}</p>
              <p className="text-gray-700">{course.duration}</p>
              <p className="text-gray-700">{course.description}</p>
                <p className="text-gray-700">${course.price}</p>
              <p className="text-gray-700">Rating: {course.rating}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CoursesSection;













