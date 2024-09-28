// import React, { useEffect, useState } from 'react';
// import ContentContainer from './ContentContainer';
// import '../styles/global.css';

// const coursesData = {
//   animal: ['Animal Behavior', 'Veterinary Science', 'Wildlife Conservation'],
//   education: ['Teaching Methods', 'Educational Psychology', 'Curriculum Development'],
//   politics: ['Political Science', 'International Relations', 'Public Policy'],
//   // Add more categories and courses as needed
// };

// const AllCourses = () => {
  
  
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('');

//   const handleSearchChange = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   const handleCategorySelect = (category) => {
//     setSelectedCategory(category);
//     setSearchQuery(''); // Clear search when a category is selected
//   };

//   const filteredCourses = () => {
//     if (searchQuery) {
//       return Object.keys(coursesData).reduce((acc, category) => {
//         const filtered = coursesData[category].filter((course) =>
//           course.toLowerCase().includes(searchQuery.toLowerCase())
//         );
//         if (filtered.length) {
//           acc[category] = filtered;
//         }
//         return acc;
//       }, {});
//     }
//     return selectedCategory ? { [selectedCategory]: coursesData[selectedCategory] } : coursesData;
//   };

//   return (
//     <div>
//       <div className="bg-white shadow-lg rounded-lg p-6 z-10 lg:p-8">
//         <div className="flex flex-col lg:flex-row items-center justify-between w-full">
//           <h1 className="text-4xl font-bold text-gray-800 mb-6 lg:mb-0">Courses</h1>
//           <div className="relative flex items-center w-full max-w-xl">
//             <input
//               type="search"
//               className="bg-gray-100 border-gray-300 px-12 pr-12 rounded-full py-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
//               placeholder="Search courses..."
//               value={searchQuery}
//               onChange={handleSearchChange}
//             />
//             <span className="absolute right-4 text-gray-500">
//               <svg
//                 className="w-6 h-6"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                 />
//               </svg>
//             </span>
//           </div>
//           <select className="bg-gray-100 rounded-full border-gray-300 px-8 py-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mt-4 lg:mt-0 lg:ml-4">
//             <option value="">Popular course</option>
//             <option value="">Release Date</option>
//             <option value="">Name A-Z</option>
//             <option value="">Price (high to low)</option>
//             <option value="">Price (low to high)</option>
//             <option value="">Rating (high to low)</option>
//             <option value="">Duration (short to long)</option>
//             <option value="">Rating (long to short)</option>
//           </select>
//         </div>
//       </div>
//       <ContentContainer>
//         <div className="app-container p-12 lg:px-20 lg:py-16">
//           <div className="flex flex-col lg:flex-row">
//             <CategoryList
//               categories={Object.keys(coursesData)}
//               onSelectCategory={handleCategorySelect}
//               className="mb-8 lg:mb-0 lg:w-1/4 lg:mr-8"
//             />
//             <CourseList courses={filteredCourses()} className="lg:w-3/4" />
//           </div>
//         </div>
//       </ContentContainer>
//     </div>
//   );
// };

// const CategoryList = ({ categories, onSelectCategory, className }) => (
//   <div className={`category-list ${className}`}>
//     <h2 className="text-2xl font-bold text-gray-800 mb-4">Categories</h2>
//     <ul>
//       {categories.map((category) => (
//         <li
//           key={category}
//           onClick={() => onSelectCategory(category)}
//           className="text-gray-700 hover:text-gray-900 cursor-pointer mb-2"
//         >
//           {category}
//         </li>
//       ))}
//     </ul>
//   </div>
// );

// const CourseList = ({ courses, className }) => (
//   <div className={`course-list ${className}`}>
//     {Object.keys(courses).map((category) => (
//       <div key={category} className="category-section mb-8">
//         <h2 className="text-2xl font-bold text-gray-800 mb-4">{category}</h2>
//         <ul>
//           {courses[category].map((course) => (
//             <li key={course} className="text-gray-700 hover:text-gray-900 mb-2">
//               {course}
//             </li>
//           ))}
//         </ul>
//       </div>
//     ))}
//   </div>
// );

// export default AllCourses;













import React, { useState } from 'react'; 
import ContentContainer from './ContentContainer';
import CoursesSection from './CoursesSection';
import '../styles/global.css';

const AllCourses = () => {


  return (
    <div>
      <div className="bg-white shadow-lg rounded-lg p-6 z-10 lg:p-8">
        <div className="flex flex-col lg:flex-row items-center justify-between w-full">
          <h1 className="text-4xl font-bold text-gray-800 mb-6 lg:mb-0">Courses</h1>
          <div className="relative flex items-center w-full max-w-xl">
            <input
              type="search"
              className="bg-gray-100 border-gray-300 px-12 pr-12 rounded-full py-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
              placeholder="Search courses..."
            
            />
            <span className="absolute right-4 text-gray-500">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </span>
          </div>
          <select
            className="bg-gray-100 rounded-full border-gray-300 px-8 py-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mt-4 lg:mt-0 lg:ml-4"
           
          >
            <option value="">Sort by</option>
            <option value="popular">Popular course</option>
            <option value="release_date">Release Date</option>
            <option value="name_a_z">Name A-Z</option>
            <option value="price_high_low">Price (high to low)</option>
            <option value="price_low_high">Price (low to high)</option>
            <option value="rating_high_low">Rating (high to low)</option>
            <option value="duration_short_long">Duration (short to long)</option>
            <option value="rating_low_high">Rating (low to high)</option>
          </select>
        </div>
      </div>
      <ContentContainer>
      
      </ContentContainer>
    </div>
  );
};

export default AllCourses;



























