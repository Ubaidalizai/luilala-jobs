import React from 'react';

const JobCategories = () => {
  const jobCategories = [
    {
      title: 'Trending Jobs',
      jobs: [
        'Business Development Manager Jobs',
        'Document Controller Jobs',
        'Electrical Improver Jobs',
        'General Labourer Jobs',
        'Office Administrator Jobs',
        'Painter Jobs',
        'Plumber Jobs',
        'Setting Out Engineer Jobs',
        'Site Supervisor Jobs',
        'Steel Fixer Jobs',
        'Telehandler Jobs',
        'Traffic Marshall Jobs',
        'Van Driver Jobs',
      ],
    },
    {
      title: 'More industries',
      jobs: [
        'Banking Jobs',
        'Charity & Volunteer Jobs',
        'Consulting Jobs',
        'E-commerce Jobs',
        'Finance Jobs',
        'Legal Jobs',
        'Managerial Jobs',
        'Media Jobs',
        'Multilingual Jobs',
        'Procurement Jobs',
        'Public Sector Jobs',
        'Science Jobs',
        'Seasonal Jobs',
        'Security & Emergency Jobs',
      ],
    },
  ];

  return (
    <div className="bg-gray-100 px-6 py-8">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-4">Browse Jobs</h2>
        {jobCategories.map((category, index) => (
          <div key={index} className="mb-8">
            <h3 className="text-xl font-bold mb-2">{category.title}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {category.jobs.map((job, i) => (
                <div
                  key={i}
                  className="bg-white shadow-md rounded-md p-4 hover:bg-gray-200 transition-colors duration-300 cursor-pointer"
                >
                  {job}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobCategories;