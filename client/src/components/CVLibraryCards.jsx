import React from 'react';
import company1 from '../assets/company1.jpg';
import company2 from '../assets/company2.jpg';
import company3 from '../assets/company3.jpg';

const CVLibraryCards = () => {
  return (
    <div className="p-12 mt-16">
        <div className=" p-6 md:w-[60vw] mx-auto">
      <h3 className="text-lg font-bold mb-2 text-gray-800">The Afghanistan Favourite Job Board</h3>
      <p className="text-gray-600 mb-4">
        CV-Library is the Afghanista  largest independent job board, with 156,503 live vacancies from all industries nationwide
        available to search! Register your CV to start applying today. With simple search tools and instant job matches
        delivered to your inbox, it's never been easier to land a new job with CV-Library.
      </p>
        </div>
      <div className="flex flex-wrap justify-center gap-8">
        <div className="card w-72 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
          <img src={company1} alt="Job Alerts" className="w-full h-48 object-cover" />
          <div className="p-4">
            <h3 className="text-lg font-bold mb-2 text-gray-800">Job Alerts</h3>
            <p className="text-gray-600 mb-4">
              Get the latest jobs sent directly to your inbox with CV-Library.co.uk's Job Alerts.
            </p>
            <button className="bg-dark-blue hover:bg-light-blue text-white font-bold py-2 px-4 rounded">
              Get Job Alerts
            </button>
          </div>
        </div>

        <div className="card w-72 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
          <img src={company2} alt="Company A-Z" className="w-full h-48 object-cover" />
          <div className="p-4">
            <h3 className="text-lg font-bold mb-2 text-gray-800">Company A-Z</h3>
            <p className="text-gray-600 mb-4">
              Search our directory of employers and recruitment agencies by popularity, sector and location.
            </p>
            <a
              href="#"
              className="bg-dark-blue hover:bg-light-blue text-white font-bold py-2 px-4 rounded inline-block"
            >
              Search Companies
            </a>
          </div>
        </div>

        <div className="card w-72 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
          <img src={company3} alt="Career Advice" className="w-full h-48 object-cover" />
          <div className="p-4">
            <h3 className="text-lg font-bold mb-2 text-gray-800">Career Advice</h3>
            <p className="text-gray-600 mb-4">
              Career tips, including salary guides, tax calculators and interview advice, helping you get your next job.
            </p>
            <a
              href="#"
              className="bg-dark-blue hover:bg-light-blue text-white font-bold py-2 px-4 rounded inline-block"
            >
              Read our Advice
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVLibraryCards;