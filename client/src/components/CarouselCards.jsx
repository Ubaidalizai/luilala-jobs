import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const Carousel = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:3000/api/v1/job/liveJobs'); // Adjust the URL to your API route
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching job data:', error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <>
      <p className='text-center pt-8 bg-gray-200 mx-auto text-lg text-[#002244]'>
        Here are some jobs you might like. We've based them on your previous search.
      </p>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={40}
        className="w-full bg-gray-200 mx-auto flex items-center justify-center p-16 pt-8"
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          // Mobile
          320: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          // Tablet
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          // Desktop
          1024: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
        }}
      >
        {jobs.map((job, index) => (
          <SwiperSlide key={index}>
            <div className="bg-gray-100 rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-bold mb-2">{job.title}</h3>
              <p className="text-gray-600 mb-2">{job.salarySign}{job.minSalary}-{job.salarySign}{ job.maxSalary}</p>
              <p className="text-gray-600">
                <FontAwesomeIcon icon={faLocationDot} className="mr-2" />
                {job.location}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Carousel;