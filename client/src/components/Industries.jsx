import React from 'react';

const Industries = () => {
  const industries = [
    'Accountancy & Accounting jobs',
    'Admin & Administration jobs',
    'Automotive jobs',
    'Aviation jobs',
    'Banking jobs',
    'Charity & Volunteer jobs',
    'Cleaning jobs',
    'Construction jobs',
    'Customer Services jobs',
    'Design jobs',
    'Education jobs',
    'Engineering jobs',
    'Environmental jobs',
    'Finance jobs',
    'Healthcare jobs',
    'Hospitality jobs',
    'IT jobs',
    'Legal jobs',
    'Leisure & Sports jobs',
    'Logistics, Transport & Distribution jobs',
    'Managerial jobs',
    'Manufacturing jobs',
    'Marketing jobs',
    'Multilingual jobs',
    'NHS jobs',
    'Procurement jobs',
    'Public Sector jobs',
    'Recruitment jobs',
    'Retail jobs',
    'Sales jobs',
    'Science jobs',
    'Seasonal jobs',
    'Security & Emergency jobs',
    'Travel & Tourism jobs',
    'Warehouse jobs',
    'Work from Home jobs',
  ];

  return (
    <div className="font-sans">
      <h1 className=" text-[#002244] py-5 text-center text-2xl font-bold">
        Industries
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6 p-14">
        {industries.map((industry, index) => (
          <a
            href="#"
            key={index}
            className="block rounded-md hover:underline text-[#1a3857] transition duration-300 ease-in-out p-2 text-center"
          >
            {industry}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Industries;