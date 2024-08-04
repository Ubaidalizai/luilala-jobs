// Carousel.js
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import logo1 from '../assets/microsoft.png';
import logo2 from '../assets/logo2.jpg';
import logo3 from '../assets/logo3.png';
import logo5 from '../assets/logo5.png';
import logo6 from '../assets/logo6.png';
import logo7 from '../assets/logo7.png';
import logo8 from '../assets/logo8.png';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default () => {
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={40}
      className="w-full max-w-[800px] mx-auto flex items-center justify-center p-12"
      slidesPerView={3}
      navigation
      pagination={{ clickable: true }}
      // scrollbar={{ draggable: true }}
    >
      <SwiperSlide>
        <img src={logo1} alt="company's logo" className="w-[100px] h-[100px] object-contain" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={logo2} alt="company's logo" className="w-[100px] h-[100px] object-contain" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={logo3} alt="company's logo" className="w-[100px] h-[100px] object-contain" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={logo5} alt="company's logo" className="w-[100px] h-[100px] object-contain" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={logo6} alt="company's logo" className="w-[100px] h-[100px] object-contain" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={logo7} alt="company's logo" className="w-[100px] h-[100px] object-contain" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={logo8} alt="company's logo" className="w-[100px] h-[100px] object-contain" />
      </SwiperSlide>
    </Swiper>
  );
};