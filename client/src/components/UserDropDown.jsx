// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// export default function UserDropDown() {
//   const navigate = useNavigate(); // Hook to handle navigation

//   // Function to handle "Login" click and navigate to the login page
//   const handleLoginClick = () => {
//     navigate('/login'); // Navigate to the login page
//   };

//   // Function to handle "Register" click and navigate to the register page
//   const handleRegisterClick = () => {
//     navigate('/register'); // Navigate to the register page
//   };

//   return (
//     <div className="flex flex-col sm:flex-row px-8 space-y-4 justify-center items-baseline space-x-4 sm:space-y-0 md:space-x-4 py-2 rounded-md">
      
//       {/* Saved Jobs Option */}
//       <div className="flex items-center space-x-2 hover:text-gray-300 transition-colors duration-300 cursor-pointer">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-5 w-5 md:h-6 md:w-6 text-white"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
//           />
//         </svg>
//         <p className="text-white text-sm md:text-base font-medium">Saved Jobs</p>
//       </div>

//       {/* Register Option */}
//       <div
//         className="flex items-center space-x-2 hover:text-gray-300 transition-colors duration-300 cursor-pointer"
//         onClick={handleRegisterClick} // Navigate to register page on click
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-5 w-5 md:h-6 md:w-6 text-white"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
//           />
//         </svg>
//         <p className="text-white text-sm md:text-base font-medium">Register</p>
//       </div>

//       {/* Recruiting Option */}
//       <div className="flex items-center space-x-2 hover:text-gray-300 transition-colors duration-300 cursor-pointer">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-5 w-5 md:h-6 md:w-6 text-white"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
//           />
//         </svg>
//         <p className="text-white text-sm md:text-base font-medium">Recruiting?</p>
//       </div>

//       {/* Login Option */}
//       <div
//         className="flex items-center space-x-2 hover:text-gray-300 transition-colors duration-300 cursor-pointer"
//         onClick={handleLoginClick} // Navigate to login page on click
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-5 w-5 md:h-6 md:w-6 text-white"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M15 12h.01M3 12h12m-6 6v-6m6-6v6m6 6H9m0 6H5"
//           />
//         </svg>
//         <p className="text-white text-sm md:text-base font-medium">Login</p>
//       </div>
//     </div>
//   );
// }
























































// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// export default function UserDropDown() {
//   const navigate = useNavigate(); // Hook to handle navigation
//   const [favoriteJobs, setFavoriteJobs] = useState([]); // State to store favorite jobs
//   const [isModalOpen, setModalOpen] = useState(false); // State for modal open/close
//   const [error, setError] = useState(''); // State to handle errors

//   // Function to handle "Login" click and navigate to the login page
//   const handleLoginClick = () => {
//     navigate('/login'); // Navigate to the login page
//   };

//   // Function to handle "Register" click and navigate to the register page
//   const handleRegisterClick = () => {
//     navigate('/register'); // Navigate to the register page
//   };

//   // Function to fetch favorite jobs from the backend
//   const fetchFavoriteJobs = async () => {
//     try {
//       const response = await axios.get('http://localhost:3000/api/v1/users/getFavorites', {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('jwt')}`,
//           'Content-Type': 'application/json',
//         },
//         withCredentials: true, // Ensure credentials are sent with the request
//       });
//       setFavoriteJobs(response.data.favoriteJobs); // Set fetched jobs
//       setModalOpen(true); // Open the modal
//       setError(''); // Clear errors if successful
//     } catch (error) {
//       setError('Error fetching favorite jobs');
//       console.error('Error fetching favorite jobs:', error);
//     }
//   };

//   // Function to handle "Saved Jobs" click
//   const handleSavedJobsClick = () => {
//     fetchFavoriteJobs(); // Fetch favorite jobs when clicked
//   };

//   // Function to close the modal
//   const handleCloseModal = () => {
//     setModalOpen(false);
//   };

//   return (
//     <div className="flex flex-col sm:flex-row px-8 space-y-4 justify-center items-baseline space-x-4 sm:space-y-0 md:space-x-4 py-2 rounded-md">

//       {/* Saved Jobs Option */}
//       <div
//         className="flex items-center space-x-2 hover:text-gray-300 transition-colors duration-300 cursor-pointer"
//         onClick={handleSavedJobsClick} // Fetch favorite jobs on click
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-5 w-5 md:h-6 md:w-6 text-white"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 00-6.364 0z"
//           />
//         </svg>
//         <p className="text-white text-sm md:text-base font-medium">Saved Jobs</p>
//       </div>

//       {/* Register Option */}
//       <div
//         className="flex items-center space-x-2 hover:text-gray-300 transition-colors duration-300 cursor-pointer"
//         onClick={handleRegisterClick} // Navigate to register page on click
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-5 w-5 md:h-6 md:w-6 text-white"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
//           />
//         </svg>
//         <p className="text-white text-sm md:text-base font-medium">Register</p>
//       </div>

//       {/* Recruiting Option */}
//       <div className="flex items-center space-x-2 hover:text-gray-300 transition-colors duration-300 cursor-pointer">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-5 w-5 md:h-6 md:w-6 text-white"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
//           />
//         </svg>
//         <p className="text-white text-sm md:text-base font-medium">Recruiting?</p>
//       </div>

//       {/* Login Option */}
//       <div
//         className="flex items-center space-x-2 hover:text-gray-300 transition-colors duration-300 cursor-pointer"
//         onClick={handleLoginClick} // Navigate to login page on click
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-5 w-5 md:h-6 md:w-6 text-white"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M15 12h.01M3 12h12m-6 6v-6m6-6v6m6 6H9m0 6H5"
//           />
//         </svg>
//         <p className="text-white text-sm md:text-base font-medium">Login</p>
//       </div>

//       {/* Modal for Favorite Jobs */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
//           <div className="bg-white p-8 rounded-lg w-11/12 md:w-1/2 shadow-xl">
//             <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Saved Jobs</h2>
//             <ul className="space-y-4 max-h-96 overflow-y-auto">
//               {favoriteJobs.length > 0 ? (
//                 favoriteJobs.map((job) => (
//                   <li key={job._id} className="p-4 bg-gray-100 rounded-lg shadow">
//                     <h3 className="font-semibold text-lg">{job.title}</h3>
//                     <p className="text-gray-600">{job.description}</p>
//                   </li>
//                 ))
//               ) : (
//                 <p className="text-gray-600">No saved jobs found.</p>
//               )}
//             </ul>
//             {error && <p className="text-red-500 mt-4">{error}</p>}
//             <button
//               onClick={handleCloseModal}
//               className="mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded transition duration-300"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function UserDropDown() {
  const navigate = useNavigate(); // Hook to handle navigation
  const [error, setError] = useState(''); // State to handle errors

  // Function to handle "Login" click and navigate to the login page
  const handleLoginClick = () => {
    navigate('/login'); // Navigate to the login page
  };

  // Function to handle "Register" click and navigate to the register page
  const handleRegisterClick = () => {
    navigate('/register'); // Navigate to the register page
  };

  // Function to handle "Saved Jobs" click and navigate to saved jobs page
  const handleSavedJobsClick = async () => {
    try {
      // Check if the user is authenticated by fetching favorite jobs
      const response = await axios.get('http://localhost:3000/api/v1/users/getFavorites', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true, // Ensure credentials are sent with the request
      });

      // If the request is successful, navigate to the saved jobs page
      navigate('/saved-jobs');
    } catch (error) {
      setError('Error fetching favorite jobs, please log in.');
      console.error('Error fetching favorite jobs:', error);
      // Optionally, navigate to the login page if the user is not authenticated
      navigate('/login');
    }
  };

  return (
    <div className="flex flex-col sm:flex-row px-8 space-y-4 justify-center items-baseline space-x-4 sm:space-y-0 md:space-x-4 py-2 rounded-md">

      {/* Saved Jobs Option */}
      <div
        className="flex items-center space-x-2 hover:text-gray-300 transition-colors duration-300 cursor-pointer"
        onClick={handleSavedJobsClick} // Navigate to saved jobs page on click
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 md:h-6 md:w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 00-6.364 0z"
          />
        </svg>
        <p className="text-white text-sm md:text-base font-medium">Saved Jobs</p>
      </div>

      {/* Register Option */}
      <div
        className="flex items-center space-x-2 hover:text-gray-300 transition-colors duration-300 cursor-pointer"
        onClick={handleRegisterClick} // Navigate to register page on click
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 md:h-6 md:w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
          />
        </svg>
        <p className="text-white text-sm md:text-base font-medium">Register</p>
      </div>

      {/* Recruiting Option */}
      <div className="flex items-center space-x-2 hover:text-gray-300 transition-colors duration-300 cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 md:h-6 md:w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
        <p className="text-white text-sm md:text-base font-medium">Recruiting?</p>
      </div>

      {/* Login Option */}
      <div
        className="flex items-center space-x-2 hover:text-gray-300 transition-colors duration-300 cursor-pointer"
        onClick={handleLoginClick} // Navigate to login page on click
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 md:h-6 md:w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12h.01M3 12h12m-6 6v-6m6-6v6m6 6H9m0 6H5"
          />
        </svg>
        <p className="text-white text-sm md:text-base font-medium">Login</p>
      </div>

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}
