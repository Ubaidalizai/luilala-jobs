import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const Carousel = () => {
  const [logos, setLogos] = useState([]);
  const slidesPerPage = 4;
  const slideInterval = 10; // Change the slide every 10 seconds


  useEffect(() => {
   const fetchData = async () => {
      const data = await axios.get(
        'http://127.0.0.1:3000/api/v1/employer/logos'
      );
      const allLogos = data.data.map((logo) => logo.logo);
      setLogos(allLogos);
    };
    
    const interval = setInterval(() => {
      setCurrentSlide(
        (prevSlide) => (prevSlide + 1) % Math.ceil(logos.length / slidesPerPage)
      );
    }, slideInterval * 1000);

    fetchData();
    return () => clearInterval(interval);
  }, [logos.length, slidesPerPage, slideInterval]);


  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={40}
      className="w-full max-w-[800px] mx-auto flex items-center justify-center p-12"
      slidesPerView={3}
      navigation
      pagination={{ clickable: true }}
    >
      {logos.length > 0 ? (
        logos.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image} alt={`Company logo ${index + 1}`} className="w-[100px] h-[100px] object-contain" />
          </SwiperSlide>
        ))
      ) : (
        <p>No images available</p>
      )}
    </Swiper>
  );
};
export default Carousel;
