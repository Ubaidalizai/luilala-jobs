import React, { useState } from 'react';

const TabsComponentCompany = () => {
  const [activeTab, setActiveTab] = useState('popular');

  const companyData = [
    { type: 'popular', companies: [
      'Academics Ltd', 'Adecco', 'Adecco', 'Aspire People', 'Auto Skills UK',
      'Bennett and Game Recruitment LTD', 'Brandon James', 'Brook Street',
      'Career Teachers', 'Carrington West', 'Daniel Owen Ltd',
      'Elevation Recruitment Group', 'Empowering Learning',
      'Ernest Gordon Recruitment Limited', 'Fawkes & Reece London',
      'Holt Recruitment Ltd', 'Hunter AHP Resourcing', 'Hunter Mason Consulting Ltd',
      'Interaction Recruitment', 'Logistics People', 'Manpower UK Ltd',
      'Meridian Business Support', 'Office Angels', 'Page Personnel',
      'Penguin Recruitment', 'Perfect Placement', 'Qualiteach Ltd',
      'Randstad Construction and Property', 'Reeson Education', 'Remedy Education',
      'Rise Technical Recruitment', 'Search', 'Service Care Solutions',
      'Shorterm Group', 'Teach Now', 'TeacherActive', 'TimePlan Education',
      'Tradewind Recruitment', 'Wayman Education', 'Zachary Daniels Recruitment'
    ]},
    { type: 'county', companies: [
      'Avon', 'Bedfordshire', 'Berkshire', 'Bristol', 'Buckinghamshire',
      'Cambridgeshire', 'Cheshire', 'Cornwall', 'Cumbria', 'Derbyshire',
      'Devon', 'Dorset', 'East Sussex', 'Essex', 'Gloucestershire',
      'Greater Manchester', 'Hampshire', 'Herefordshire', 'Hertfordshire',
      'Isle of Wight', 'Kent', 'Lancashire', 'Leicestershire', 'Lincolnshire',
      'London', 'Merseyside', 'Norfolk', 'North Yorkshire', 'Northamptonshire',
      'Northern Ireland', 'Northumberland', 'Nottinghamshire', 'Oxfordshire',
      'Scotland', 'Shropshire', 'Somerset', 'South Yorkshire', 'Staffordshire',
      'Suffolk', 'Surrey', 'Tyne and Wear', 'Wales', 'Warwickshire',
      'West Midlands', 'West Sussex', 'West Yorkshire', 'Wiltshire', 'Worcestershire'
    ]},
    { type: 'industries', companies: [
      'Sales', 'Recruitment', 'Manufacturing', 'Industrial', 'Auto Skills UK',
      'IT', 'Brandon James', 'Health Care', 'Financial', 'Carrington West',
      'Engineering', 'Education', 'Distribution', 'Construction', 'Commercial',
      'Automotive', 'Administration', 'Accounting'
    ]
    }
    
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-6xl my-8 mx-4 sm:mx-auto">
    <div className="mb-6">
      <ul className="flex border-b border-gray-300 overflow-x-auto">
        {companyData.map((tab) => (
          <li
            key={tab.type}
            className={`cursor-pointer px-4 py-2 rounded-t-lg whitespace-nowrap ${
              activeTab === tab.type
                ? 'bg-gradient-to-r from-[#002244] to-[#4682B4] text-white'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
            onClick={() => handleTabClick(tab.type)}
          >
            <h3 className="text-lg font-medium capitalize">{tab.type} agencies</h3>
          </li>
        ))}
      </ul>
    </div>
    <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {companyData.find((tab) => tab.type === activeTab).companies.map((company, index) => (
        <div key={index} className="bg-gray-100 rounded-md px-4 py-2 hover:bg-gray-200 cursor-pointer">
          {company}
        </div>
      ))}
    </div>
  </div>
  );
};

export default TabsComponentCompany;