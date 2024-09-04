import { useState, useEffect } from 'react';
import axios from 'axios';
import CreateCv from '../components/CreateCv';
import CvWork from '../components/CvWork';
import JobSeeker from '../components/JobSeeker';
import SeekingAdvice from '../components/SeekingAdvice';
import QAF from './QAF';
export default function CvBuilder() {
   const [liveJobs, setLiveJobs] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [liveJobs] = await Promise.all([
          axios.get('http://127.0.0.1:3000/api/v1/job/liveJobsLength'),
   
        ]);

        setLiveJobs(liveJobs.data);
      
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  });
  return (
    
    <div>
      <CreateCv />
      <CvWork />
      <JobSeeker />
      <SeekingAdvice />
      <div class="bg-light-blue py-8 px-4 sm:px-6 lg:px-8">
  <div class="max-w-lg mx-auto text-center">
    <h2 class="text-3xl  font-extrabold text-gray-100 sm:text-4xl">
      Build your CV and start applying for {liveJobs} jobs today!
    </h2>
    <button class="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-dark-blue hover:bg-[#334e69] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#001830]">
      Build my CV
    </button>
  </div>
</div>

{/* quentification */}
<QAF />
<div class="bg-[#1a3857] py-4 px-4 sm:px-6 lg:px-8">
  <div class="max-w-lg mx-auto flex items-center gap-5 text-center">
    <h2 class="text-xl font-extrabold text-gray-100 sm:text-2xl">
    Create Your free cv
    </h2> 
    <button class="mt-6 inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-dark-blue hover:bg-[#334e69] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#001830]">
      Build my CV
    </button>
  </div>
</div>
    </div>
  );
}