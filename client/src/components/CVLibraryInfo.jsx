import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Tabs } from '@geist-ui/react';

const CVLibraryInfo = () => {
  const [selected, setSelected] = useState('jobs');
  const [categories, setCategories] = useState([]);
  const [showRelatedData, setShowRelatedData] = useState({});
  const [liveJobs, setLiveJobs] = useState(0);

  // Define the routes for each category
  const routes = {
    jobs: 'http://127.0.0.1:3000/api/v1/job/industrys',
    locations: 'http://127.0.0.1:3000/api/v1/job/location',
    features: 'http://127.0.0.1:3000/api/v1/job/company',
  };
  
  // Function to fetch data based on selected tab
  const fetchCategoryData = async (category) => {
    try {
      const response = await axios.get(routes[category]);
      setCategories((prevCategories) => [
        ...prevCategories.filter((cat) => cat.value !== category),
        {
          title: getCategoryTitle(category),
          value: category,
          data: response.data,
        },
      ]);
    } catch (error) {
      console.error(`Error fetching data for ${category}:`, {
        message: error.message,
        response: error.response ? error.response.data : 'No response data',
        status: error.response ? error.response.status : 'No status code',
      });
    }
  };

  // Fetch live jobs count and category data when the selected tab changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [liveJobsResponse] = await Promise.all([
          axios.get('http://127.0.0.1:3000/api/v1/job/liveJobsLength'),
        ]);

        setLiveJobs(liveJobsResponse.data);
      } catch (error) {
        console.error('Error fetching live jobs:', error);
      }
    };
    fetchData();
    
    if (!categories.find((cat) => cat.value === selected)) {
      fetchCategoryData(selected);
    }
  }, [selected]);

  const handleTabChange = (tab) => {
    setSelected(tab);
    setShowRelatedData({ [tab]: !showRelatedData[tab] });
  };

  // Helper function to get the title for a category
  const getCategoryTitle = (category) => {
    switch (category) {
      case 'jobs':
        return 'Jobs by Industry';
      case 'locations':
        return 'Jobs by Locations';
      case 'features':
        return 'Jobs by Company';
      default:
        return '';
    }
  };

  return (
    <>
      <div className="text-white text-center text-3xl mb-8 mx-auto mt-32 w-full max-w-3xl">
        <h1>{liveJobs} Jobs from Multiple Companies</h1>
      </div>
      <div className="px-6 pb-0 pt-6 bg-white mx-auto w-full max-w-3xl shadow-lg">
        <Tabs
          value={selected}
          onChange={handleTabChange}
          className="mb-6 bg-white"
        >
          {['jobs', 'locations', 'features'].map((category) => (
            <Tabs.Item
              key={category}
              label={getCategoryTitle(category)}
              value={category}
              className={`px-4 py-2 border-b-2 ${
                selected === category ? 'border-accent-white text-accent-white' : 'border-transparent'
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
                          {/* <h3 className="text-lg mb-4 font-bold text-accent-white capitalize">
                            {key.replace(/([A-Z])/g, ' $1').toLowerCase()}:
                          </h3> */}
                          <div className="space-y-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4">
                            {value.map((item, index) => (
                              <a
                                key={index}
                                href={`#${typeof item === 'string' ? item.replace(/\s/g, '-').toLowerCase() : ''}`}
                                className="text-accent-white decoration-transparent hover:underline"
                              >
                                {item}
                              </a>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <p className="text-accent-white mb-2">
                          {key.replace(/([A-Z])/g, ' $1').toLowerCase()}: 
                          <a 
                            href={`#${typeof value === 'string' ? value.replace(/\s/g, '-').toLowerCase() : ''}`} 
                            className="font-bold text-accent-white hover:underline"
                          >
                            {value}
                          </a>
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