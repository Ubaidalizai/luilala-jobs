import { FaStar } from 'react-icons/fa';
import BlackCircle from '../assets/subscribe.png';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function PopulerCourse() {
  const [countOfCours, setcountOfCours] = useState([]);
  useEffect(() => {
    axios.get('http://127.0.0.1:3000/api/v1/cours/count') // Update the URL with your backend endpoint
     .then(response => {
        setcountOfCours(response.data);
      })
     .catch(error => {
        console.log(error);
      });
  },[])
  return (
    <div className="bg-[#1a3857] py-4 w-[90vw] md:w-[70vw] mx-auto my-6 sm:py-12 rounded-lg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center justify-center">
            <img
              src="https://course.cv-library.co.uk/assets/images/course-trophy.png"
              alt="course trophy"
              className="w-32 md:w-42 mx-auto mb-6"
            />
            <p className="bg-[#002244] py-2 px-6 rounded-full text-white text-lg">Premium Membership</p>
          </div>

          <div className="col-span-2 flex flex-col gap-y-6">
            <div className=" flex flex-col sm:flex-row  justify-between items-center">
              <h3 className="text-xl  md:text-2xl font-bold text-white">
                Get Access To Our Entire Course Library
              </h3>

              <div
                className="flex flex-col my-4 w-60 h-24 items-center justify-center rounded-full bg-cover bg-center md:w-40 md:h-40"
                style={{ backgroundImage: `url(${BlackCircle})`, backgroundSize: "cover", backgroundPosition: "center" }}
              >
                <span className="text-white">Only</span>
                <span className="text-4xl font-bold text-white">
                  <sup className="font-medium">£</sup>99
                </span>
                <span className="text-white">Per Year</span>
              </div>
            </div>

            <div className="  flex  flex-col sm:flex-row justify-between items-end">
              <ul className="space-y-4 text-white">
                <li className="flex items-center space-x-2">
                  <FaStar className="text-green-500" />
                  <span>Study {countOfCours}+ courses</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FaStar className="text-green-500" />
                  <span>
                    Unlimited access to study{' '}
                    <small className="text-white">(max 50 active courses at any one time)</small>
                  </span>
                </li>
                <li className="flex items-center space-x-2">
                  <FaStar className="text-green-500" />
                  <span>Career matching service</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FaStar className="text-green-500" />
                  <span>Free XO Student Discounts membership</span>
                </li>
              </ul>
              <a
                href="https://course.cv-library.co.uk/subscription"
                className="inline-flex items-center px-6  my-6  text-center py-3 bg-[#002244] hover:bg-[#003344] text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2"
              >
                Start Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}