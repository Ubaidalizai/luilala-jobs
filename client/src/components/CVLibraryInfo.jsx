import React, { useState } from 'react';
import { Tabs } from '@geist-ui/react';
import styles from './Tabs.module.css';

const CVLibraryInfo = () => {
  const [selected, setSelected] = useState('jobs');
  const [showRelatedData, setShowRelatedData] = useState({});

  // Fake data
  const categories = [
    {
      title: 'Jobs by Industry',
      value: 'jobs',
      data: {
        JobsbyIndustury: ['London', 'Manchester', 'Birmingham', 'Glasgow', 'Cardiff'],
      },
    },
    {
      title: 'Jobs by Locations',
      value: 'locations',
      data: {
        jobLocations: ['London', 'Manchester', 'Birmingham', 'Glasgow', 'Cardiff'],
      },
    },
    {
      title: 'Jobs by Company',
      value: 'features',
      data: {
        additionalFeatures: ['Company A', 'Company B', 'Company C', 'Company D'],
      },
    },
  ];

  const handleTabChange = (tab) => {
    setSelected(tab);
    setShowRelatedData({ [tab]: !showRelatedData[tab] });
  };

  return (
    <>
      <div className="text-white text-center text-3xl mb-8 mx-auto mt-32 w-full max-w-3xl">
        <h1>12,000 Jobs from Multiple Companies</h1>
      </div>
      <div className="px-6 pb-0 pt-6 bg-white mx-auto w-full max-w-3xl shadow-lg">
        <Tabs
          value={selected}
          onChange={handleTabChange}
          className="mb-6 bg-white"
        >
          {categories.map((category) => (
            <Tabs.Item
              key={category.value}
              label={category.title}
              value={category.value}
              className={`px-4 py-2 border-b-2 ${
                selected === category.value ? 'border-accent-white text-accent-white' : 'border-transparent'
              }`}
            />
          ))}
        </Tabs>
      </div>

      <div className="p-6 pb-4 mx-auto w-full max-w-3xl border-2 shadow-lg">
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.value}>
              {selected === category.value && (
                <div>
                  {Object.entries(category.data).map(([key, value]) => (
                    <React.Fragment key={key}>
                      {Array.isArray(value) ? (
                        <div className="mb-4">
                          <h3 className="text-lg mb-4 font-bold text-accent-white capitalize">{key.replace(/([A-Z])/g, ' $1').toLowerCase()}:</h3>
                          <div className="space-y-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4">
                            {value.map((item, index) => (
                              <a
                                key={index}
                                href={`#${item.replace(/\s/g, '-').toLowerCase()}`}
                                className="text-accent-white decoration-transparent hover:underline"
                              >
                                {item}
                              </a>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <p className="text-accent-white mb-2">
                          {key.replace(/([A-Z])/g, ' $1').toLowerCase()}: <a href={`#${value.replace(/\s/g, '-').toLowerCase()}`} className="font-bold text-accent-white hover:underline">{value}</a>
                        </p>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CVLibraryInfo;