import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CoursesNavigation from './CoursesNavigation';
import BackgroundImage from '../assets/bgcourses4.jpg';
import Rating from './Rating';
import OnlineCourses from './OnlineCourses';
import TrainNewSkill from './TrainNewSkill';
import PopulerCourse from './PopulerCourse';
import BackgroundImage2 from '../assets/coursebg2.jpg';
import { FaBookOpen, FaClipboardList, FaUserGraduate } from 'react-icons/fa';

export default function CoursesHome() {
   const [studentCount, setStudentCount] = useState(0);
  const [courseCount, setCourseCount] = useState(0);
  const [lessons, setLessons] = useState(0);
 
  const [logos, setLogos] = useState([]);

  useEffect(() => {
      const fetchCount = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:3000/api/v1/cours/count'); // Replace with your actual API endpoint
        setCourseCount(response.data);
        console.log()
      } catch (error) {
        console.error('Error fetching count:', error);
      }
      };
    
      const fetchCount1 = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:3000/api/v1/cours/lessons'); // Replace with your actual API endpoint
        setLessons(response.data);
        console.log()
      } catch (error) {
        console.error('Error fetching count:', error);
      }
      };
      const fetchCount2 = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:3000/api/v1/cours/student'); // Replace with your actual API endpoint
        setStudentCount(response.data);
        console.log()
      } catch (error) {
        console.error('Error fetching count:', error);
      }
    };

    fetchCount();
    fetchCount1();
    fetchCount2();

    axios.get('http://127.0.0.1:3000/api/v1/employer/logos').then(response => {
      setLogos(response.data)
    })
      .catch(error => {
        console.error('Error fetching logos:', error);
      });
    const lessonsIntervalId = setInterval(() => {
      setStudentCount((prevCount) => {
        if (prevCount >=studentCount ) {
          clearInterval(lessonsIntervalId);
          return prevCount;
        }
        return prevCount + 1;
      });
    }, 4000 / 700);

    const bookCountIntervalId = setInterval(() => {
     setLessons((prevCount) => {
        if (prevCount >= lessons) {
          clearInterval(bookCountIntervalId);
          return prevCount;
        }
        return prevCount + 1;
      });
    }, 4000 / 700);

    const studentCountIntervalId = setInterval(() => {
      setCourseCount((prevCount) => {
        if (prevCount >= courseCount) {
          clearInterval(studentCountIntervalId);
          return prevCount;
        }
        return prevCount + 1;
      });
    }, 4000 / 700);

    return () => {
      clearInterval(lessonsIntervalId);
      clearInterval(bookCountIntervalId);
      clearInterval(studentCountIntervalId);
    };
  },[]);

  return (
    <div>
      <CoursesNavigation />
      <div className="container_Home_courses h-[40rem] bg-cover bg-center relative">
        <div className="flex flex-col items-center justify-center h-full text-white">
          <h1 className=" text-2xl sm:text-4xl p-4 text-center md:text-6xl font-bold mb-4">Change Your Life With A New Skill</h1>
          <h3 className=" text-xl sm:text-2xl md:text-4xl mx-auto w-[80vw] md:w-[60vw] mb-8 text-center">
            Join Over 1,000,000 students and study one of our 760+ career enhancing, confidence boosting courses
          </h3>
          <div className="flex  md:flex-row items-center rounded-full bg-white px-4 py-2 mx-auto w-[90vw] md:w-[70vw] mb-8">
            <input
              type="text"
              placeholder="Search for a course"
              className="flex-1 text-slate-950 border-none focus:outline-none py-2 md:py-0"
            />
            <button className="text-[#002244] rounded-md px-4 py-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <button className="bg-[#001b36] text-white py-4 rounded-full px-4 hover:bg-[#002244] w-full md:w-auto">
              See All Courses
            </button>
            <button className="bg-[#001b36] text-white py-4 rounded-full px-4 hover:bg-[#002244] w-full md:w-auto">
              Unlimited Learning
            </button>
            <button className="bg-[#001b36] text-white py-4 rounded-full px-4 hover:bg-[#002244] w-full md:w-auto">
              Redeem a Voucher
            </button>
          </div>
        </div>
      </div>
      <Rating />
      <OnlineCourses />
      <TrainNewSkill />
      <div className='my-16 w-[90vw] md:w-[80vw] mx-auto text-2xl md:text-4xl p-4 md:p-6 text-white rounded-full text-center bg-[#002244]'>
  All New Skills Academy Courses Come With Lifetime Access!
</div>
      <PopulerCourse />
      <div className="bg-[#fff] p-6 sm:p-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-bold text-center text-gray-900 mb-8 sm:mb-12">
            Learn with confidence
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {logos.slice(0, 5).map((logo, index) => (
              <div key={index}>
                <img src={logo.logo} alt={`Logo ${index + 1}`} className="h-20 sm:h-32 w-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-100 py-8">
        <div className="relative  h-[60rem] sm:h-[40rem] max-w-7xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-b from-darkblue to-[#0b2e4f] opacity-70"></div>
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${BackgroundImage2})` }}></div>
          <div className="relative z-10 top-[35%] left-[5%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-12 sm:px-16 lg:px-24 pt-12 pb-16">
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <p className="text-gray-500">
                <FaBookOpen className="h-8 w-8 mx-auto" />
              </p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{courseCount}</p>
              <p className="text-gray-500">Total courses</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <p className="text-gray-500">
                <FaUserGraduate className="h-8 w-8 mx-auto" />
              </p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{studentCount}</p>
              <p className="text-gray-500">Total Students</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <p className="text-gray-500">
                <FaClipboardList className="h-8 w-8 mx-auto" />
              </p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{lessons}</p>
              <p className="text-gray-500">Total Lessons</p>
            </div>
          </div>
        </div>
      </div>


      {/* end of */}
    </div>
  );
}