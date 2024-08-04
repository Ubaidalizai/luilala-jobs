import React, { useState } from 'react';
import { FaMeta } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa";
import { IoIosHeartEmpty } from "react-icons/io";
import { FaMicrosoft } from "react-icons/fa";
import { FaAmazon } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { BiLogoAdobe } from "react-icons/bi";


const jobs = [
    {
      title: 'Product Designer',
      company: 'Metamask',
      applications: 25,
      logo: <FaMeta />,
      tags: ['Entry level', 'Full-time'],
      description:
        'Doing the right thing for investors is what we are all about at Vanguard, and that...',
      salary: 250,
      posted: 12,
    },
    {
      title: 'Sr. UX Designer',
      company: 'Netflix',
      applications: 14,
      logo: <FaMicrosoft />,
      tags: ['Expert', 'Part-time', 'Remote'],
      description:
        'Netflix is one of the world\'s leading streaming entertainment services with...',
      salary: 195,
      posted: 5,
    },
    {
      title: 'Product Designer',
      company: 'Microsoft',
      applications: 58,
      logo: <FaGoogle />,
      tags: ['Intermediate', 'Full-time'],
      description:
        'Welcome to Lightspeed LA, the first U.S.-based AAA game development studio...',
      salary: 210,
      posted: 4,
    },
    {
      title: 'UI Designer',
      company: 'Shopify',
      applications: 32,
      logo: <FaAmazon />,
      tags: ['Intermediate', 'Full-time'],
      description:
        'Shopify is a leading global commerce company, providing trusted tools to start, grow, market, and manage a retail business of any size.',
      salary: 180,
      posted: 8,
    },
    {
      title: 'Front-end Developer',
      company: 'Apple',
      applications: 42,
      logo: <FaApple />,
      tags: ['Senior', 'Remote'],
      description:
        'Apple is looking for a talented front-end developer to join our team and help create innovative user experiences for our products.',
      salary: 280,
      posted: 3,
    },
    {
      title: 'UX Researcher',
      company: 'Google',
      applications: 65,
      logo: <FaGoogle />,
      tags: ['Expert', 'Full-time'],
      description:
        'Google is seeking an experienced UX researcher to help us better understand our users and drive product decisions.',
      salary: 220,
      posted: 7,
    },
    {
      title: 'Visual Designer',
      company: 'Adobe',
      applications: 28,
      logo: <BiLogoAdobe />
      ,
      tags: ['Intermediate', 'Freelance'],
      description:
        'Adobe is looking for a talented visual designer to join our team and help create visually stunning designs for our creative cloud suite of products.',
      salary: 190,
      posted: 9,
    },
  ];
function JobCard({ job }) {
    return (
      
     
          
          <div class="job-card bg-white p-4 rounded-lg shadow-md">
            <div class="flex justify-between items-center">
              <div class="flex items-center">
                <div class="mr-4">
                  {job.logo}
                </div>
                <div>
                  <div class="font-bold text-lg">{job.title}</div>
                  <div class="text-gray-600">{job.company} ‧ {job.applications} Applications</div>
                </div>
              </div>
              <IoIosHeartEmpty class="text-gray-400 hover:text-red-500 cursor-pointer" />
            </div>
            <div class="job-tags flex space-x-2 my-2">
              {job.tags.map((tag) => (
                <div key={tag} class="bg-gray-200 text-gray-700 px-2 py-1 rounded">
                  {tag}
                </div>
              ))}
            </div>
            <p class="text-gray-800 mb-4">{job.description}</p>
            <div class="flex justify-between items-center">
              <div class="text-lg font-bold text-green-500">${job.salary}/hr</div>
              <div class="text-gray-600">{job.posted} days ago</div>
            </div>
            </div>
   
       

    );
    }

function JobListing() {
  const [jobsOpend, setJobsOpend] = useState(jobs);

  const [filterOptions, setFilterOptions] = useState({
    searchText: '',
    tags: [],
    salaryMin: 0,
    salaryMax: Infinity,
  });

  const handleFilterChange = (name, value) => {
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      [name]: value,
    }));
  };

  const filteredJobsOpend = jobsOpend.filter((job) => {
    const { searchText, tags, salaryMin, salaryMax } = filterOptions;

    const searchMatch = job.title.toLowerCase().includes(searchText.toLowerCase()) ||
                        job.company.toLowerCase().includes(searchText.toLowerCase());
    const tagsMatch = tags.every((tag) => job.tags.includes(tag));
    const salaryMatch = job.salary >= salaryMin && job.salary <= salaryMax;

    return searchMatch && tagsMatch && salaryMatch;
  });

  return (
    <div class="flex flex-col md:flex-row">
    <div class="w-full md:w-1/4 bg-gray-100 p-4 mb-4 md:mb-0">
      <div class="filter-section mb-4">
        <input
          type="text"
          placeholder="Search jobs..."
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={filterOptions.searchText}
          onChange={(e) => handleFilterChange('searchText', e.target.value)}
        />
        <div class="mt-4">
          <label class="block font-medium mb-2">Tags:</label>
          {['Entry level', 'Expert', 'Full-time', 'Part-time', 'Remote'].map((tag) => (
            <label key={tag} class="inline-flex items-center mr-4">
              <input
                type="checkbox"
                class="form-checkbox h-5 w-5 text-blue-500"
                checked={filterOptions.tags.includes(tag)}
                onChange={(e) => {
                  if (e.target.checked) {
                    handleFilterChange('tags', [...filterOptions.tags, tag]);
                  } else {
                    handleFilterChange('tags', filterOptions.tags.filter((t) => t !== tag));
                  }
                }}
              />
              <span class="ml-2">{tag}</span>
            </label>
          ))}
        </div>
        <div class="mt-4">
          <label class="block font-medium mb-2">Salary Range:</label>
          <div class="flex items-center">
            <input
              type="number"
              placeholder="Min"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mr-2"
              value={filterOptions.salaryMin !== null ? filterOptions.salaryMin : ''}
              onChange={(e) => {
                const value = e.target.value;
                handleFilterChange('salaryMin', value ? Number(value) : null);
              }}
            />
            <input
              type="number"
              placeholder="Max"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ml-2"
              value={filterOptions.salaryMax !== null ? filterOptions.salaryMax : ''}
              onChange={(e) => {
                const value = e.target.value;
                handleFilterChange('salaryMax', value ? Number(value) : null);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  
       
    <div class="w-full md:w-3/4 job-listing p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
  {filteredJobsOpend.map((job) => (
    <div key={job.title} class="job-card bg-white p-4 rounded-lg shadow-md">
      <JobCard job={job} />
    </div>
  ))}
</div>

  </div>
  );
}

export default JobListing;