// Carousel.js
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

// Import FontAwesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

const jobs = [
  {
  career: "Software Engineer",
  salary: "₦100,000 - ₦150,000",
  location: "San Francisco, CA"
  },
  {
  career: "Marketing Manager",
  salary: "₦70,000 - ₦90,000",
  location: "New York, NY"
  },
  {
  career: "Registered Nurse",
  salary: "₦60,000 - ₦80,000",
  location: "Seattle, WA"
  },
  {
  career: "Financial Analyst",
  salary: "₦80,000 - ₦110,000",
  location: "Chicago, IL"
  },
  {
  career: "Graphic Designer",
  salary: "₦50,000 - ₦70,000",
  location: "Los Angeles, CA"
  },
  {
  career: "IT Project Manager",
  salary: "₦90,000 - ₦120,000",
  location: "Boston, MA"
  },
  {
  career: "Sales Representative",
  salary: "₦40,000 - ₦60,000",
  location: "Atlanta, GA"
  },
  {
  career: "Data Scientist",
  salary: "₦100,000 - ₦150,000",
  location: "Seattle, WA"
  },
  {
  career: "Human Resources Specialist",
  salary: "₦50,000 - ₦70,000",
  location: "Dallas, TX"
  },
  {
  career: "Mechanical Engineer",
  salary: "₦80,000 - ₦110,000",
  location: "Houston, TX"
  }
  ];

export default () => {
  return (
    <>
      <p className='text-center pt-8 bg-gray-200 mx-auto text-lg text-[#002244] '>Here are some jobs you might like. We've based them on your previous search.</p>
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
              <h3 className="text-lg font-bold mb-2">{job.career}</h3>
              <p className="text-gray-600 mb-2">{job.salary}</p>
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