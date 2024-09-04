import React, { useState, useEffect } from 'react';
import axios from 'axios'; 

const JobSeeker = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSlider, setShowSlider] = useState(true);
  const [testimonials, setTestimonials] = useState([]);
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:3000/api/v1/testimonial/getTestimonial'); // Replace with your backend endpoint
        setTestimonials(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      }
    };

    fetchTestimonials();
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  if (!testimonials.length) {
    return <div>Loading testimonials...</div>; // Optional loading state
  }

  return (
    <div className={`container ${showSlider ? '' : 'hidden'} p-4 rounded-lg shadow-lg`}>
      <p className='text-3xl mt-16 text-center'>Find out why job seekers love CV Builder...</p>
      <div className="card relative mx-auto max-w-lg md:max-w-2xl">
        <div className="image-container p-4">
          <img 
            src={testimonials[currentIndex].image} 
            alt="" 
            className="rounded-lg h-[30vh] md:h-[50vh] w-full object-cover" 
          />
          <p className=" text-center mt-4 px-2 text-sm md:text-lg text-white bg-[#002244] bg-opacity-50 rounded-lg">
            {testimonials[currentIndex].text}
          </p>
        </div>
      </div>
    </div>
  );
};
export default JobSeeker;

