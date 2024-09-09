import React, { useState, useEffect } from 'react';

export default function JobAlerts() {
  // const []

  return (
    <>
      <div className="bg-white py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gray-600 text-sm">
            Search 152,981 jobs from 10,117 companies
          </p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Never miss an opportunity with Job Alerts
              </h1>
              <p className="text-gray-600 mt-4">
                Stay on top of your job search and always be sure you are the
                first to know about new roles.
              </p>
              <div className="mt-6 flex items-center">
                <p className="text-gray-600">Already registered?</p>
                <a
                  href="#"
                  className="ml-4 text-blue-600 hover:text-blue-800 font-medium"
                >
                  View my Job Alerts
                </a>
              </div>
            </div>
            <div className="bg-gray-100 rounded-lg p-6 shadow-md">
              <h2 className="text-2xl font-bold text-gray-800">
                Create Job Alert
              </h2>
              <form className="mt-6 space-y-4">
                <div>
                  <label
                    htmlFor="keywords"
                    className="block text-gray-700 font-medium"
                  >
                    Keywords/Job Title
                  </label>
                  <input
                    id="keywords"
                    type="text"
                    placeholder="e.g. Administrator"
                    className="mt-2 block w-full border-gray-300  p-2  rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="location"
                    className="block text-gray-700 font-medium"
                  >
                    Location
                  </label>
                  <input
                    id="location"
                    type="text"
                    placeholder="e.g. London"
                    className="mt-2 block w-full border-gray-300  p-2  rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-700 font-medium"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className="mt-2 block w-full border-gray-300  p-2  rounded-md shadow-sm focus:ring-[#1c4980] focus:border-[#1c4980]"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#1c4980] text-white py-2 px-4 rounded-md hover:bg-[#2a6aad] focus:outline-none focus:ring-2 focus:ring-[#1c4980] focus:ring-offset-2"
                >
                  Create Job alert
                </button>
                <div className="text-gray-600 text-sm">
                  By creating a job alert with CV-Library you agree to our
                  Privacy Policy and Terms & Conditions
                </div>
              </form>
            </div>
            <div className="second_part mt-8">
              <div className="vedio bg-gray-100 rounded-lg p-6 shadow-md">
                <div className="first mt-4">
                  <iframe
                    width="100%"
                    height="340"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>

                <div className="mt-4 text-gray-600 font-bold">
                  Great companies hiring on CV-Library
                </div>
                <img
                  className="mt-2"
                  src="https://www.cv-library.co.uk/assets/images/jbe-companies-1955cb7154c6b214ba90714c5dfcbff81569f747e0dcd968b4400fc5e16fc0cb.png"
                  alt=""
                />
              </div>
            </div>
            <div className="thirdtext mt-8 bg-gray-100 rounded-lg p-6 shadow-md">
              <h2 className="text-2xl font-bold text-gray-800">
                Why Setup Job Alerts?
              </h2>
              <div className="mt-4">
                <h3 className="text-xl font-bold text-gray-800">
                  Get jobs straight to your email inbox
                </h3>
                <p className="text-gray-600 mt-2">
                  Keep up-to-date with the latest jobs matching your criteria.
                  Our alerts are easy to review on all devices, including
                  desktop, mobile and email.
                </p>
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-bold text-gray-800">
                  Be the first to apply
                </h3>
                <p className="text-gray-600 mt-2">
                  Stay ahead of the competition and be the first to apply to
                  jobs on CV-Library. You can apply in seconds with our powerful
                  1-Click apply process.
                </p>
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-bold text-gray-800">
                  Quick & easy setup
                </h3>
                <p className="text-gray-600 mt-2">
                  It takes less than one minute to create a Job Alert on
                  CV-Library. You can manage your alerts at any time and ensure
                  you find the right jobs with ease.
                </p>
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-bold text-gray-800">
                  Create up to 20 alerts
                </h3>
                <p className="text-gray-600 mt-2">
                  Create multiple alerts to receive the jobs you want. Keep an
                  eye on different locations, job titles and industries, so you
                  never miss a job again.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
