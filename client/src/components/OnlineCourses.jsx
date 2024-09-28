
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OnlineCourses() {
  const [data, setData] = useState([]);
  const navigate = useNavigate(); // Hook to navigate programmatically

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:3000/api/v1/cours/categories');
        setData(res.data.result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleSeeAllCourses = () => {
    navigate('/onlinecourses'); // Navigate to '/onlinecourses'
  };

  return (
    <>
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl text-center mt-8 font-bold mb-4">Online Courses</h1>
        <h2 className="text-2xl font-semibold text-center mt-4 mb-12">Course Categories</h2>
        <div className="container grid grid-cols-1 justify-center items-center md:grid-cols-2 lg:grid-cols-5 gap-4">
          {data.map((course, index) => (
            <div key={index} className="relative rounded-md overflow-hidden">
              <img src={course.image} alt="Online Course" className="w-full h-48 object-cover" />
              <div className="absolute bottom-0 text-xm bg-gray-100 m-2 rounded-full right-0 mb-2 text-[#002244] px-4 py-2 text-center">
                <p className="font-bold">{course.category} Course</p>
              </div>
              <div className="absolute bottom-0 w-full h-full top-[5%] right-0 bg-black bg-opacity-50 text-white p-2 text-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <p className="font-bold">{course.count} Courses</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center mb-16">
        <button
          className="bg-[#002244] hover:bg-[#1a3857] text-white font-bold py-4 px-8 rounded-full"
          onClick={handleSeeAllCourses} // Trigger navigation on click
        >
          See All Courses
        </button>
      </div>
    </>
  );
}

