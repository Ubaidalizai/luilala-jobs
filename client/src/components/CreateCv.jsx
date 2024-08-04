import React from 'react';
import cvBuilder1 from '../assets/cvbuilder2.jpg';
import { useNavigate } from 'react-router-dom';

export default function CreateCv() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/cveditor');
  };

  return (
    <>
      <p className="text-slate-100 text-center bg-[#002244] text-lg py-2 sm:py-3">
        Search 156,089 jobs from 10,070 companies
      </p>
      <div className="bg-gradient-to-r from-[#002244] to-[#4682B4] py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex flex-col-reverse sm:flex-row p-12 sm:p-16 bg-gradient-to-r from-[#002244] to-[#4682B4] py-8 sm:py-12 pb-16 sm:pb-20 items-center justify-between rounded-md">
            {/* text part */}
            <div className="text-contents w-full sm:w-1/2 pr-0 sm:pr-8 mb-8 sm:mb-0">
              <h1 className="mt-4 font-bold text-5xl sm:text-6xl text-white mb-4">
                Free CV Builder
              </h1>
              <p className="text-gray-300 text-xl sm:text-2xl mb-8">
                Need a CV? Create your own on the go and start applying to jobs in
                minutes.
              </p>
              <button
                onClick={handleClick}
                className="bg-light-blue hover:bg-blue-400 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-300"
              >
                Build my CV
              </button>
            </div>
            {/* image part */}
            <div className="image_part w-full sm:w-1/2">
              <img
                src={cvBuilder1}
                alt=""
                className="w-full rounded-md shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}