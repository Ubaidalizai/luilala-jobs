import React, { useState, useEffect } from 'react';

const CoursesSection = () => {
  const [coursesData, setCoursesData] = useState([]);

  useEffect(() => {
    const fetchCoursesData = async () => {
      try {
        const response = await fetch('http://localhost:5000/data');
        const data = await response.json();
        console.log(data);
        setCoursesData(data);
      } catch (error) {
        console.error('Error fetching courses data:', error);
      }
    };

    fetchCoursesData();
  }, []);

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
      {coursesData.map((course, index) => (
        <div key={index}>
          <div className="relative w-full h-full">
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-opacity-50 flex items-center justify-center">
              <div className="text-white text-2xl font-bold">{course.title}</div>
            </div>
          </div>
          <div className="p-4 bg-white rounded-sm">
            <div className="text-xl font-bold">{course.title}</div>
            <div className="text-gray-600">{course.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CoursesSection;