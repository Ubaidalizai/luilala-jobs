import React, { useState } from 'react';
import CoursesNavigation from './CoursesNavigation';
import  Tailor from '../assets/tailor.png';
import  Dash from '../assets/dash.png';
import Logo1 from '../assets/firstLogo.png';
import Logo2 from '../assets/secondLogo.png';
import Logo3 from '../assets/thirdLogo.png';
import Logo4 from '../assets/fourthLof.png';
import Logo5 from '../assets/fifthLogo.png';
import Logo6 from '../assets/bbc.png';
import Logo7 from '../assets/guardian.png';
import Logo8 from '../assets/itv.png';
import Logo9 from '../assets/vogue.png';

export default function Stafftraining() {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    contactNumber: '',
    multipleStaff: false,
    individualCourses: false,
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      // Submit the form data
      console.log(formData);
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name.';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Please enter your last name.';
    }
    if (!formData.email.trim() || !isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.contactNumber.trim() || !isValidPhoneNumber(formData.contactNumber)) {
      newErrors.contactNumber = 'Please enter a valid contact number.';
    }
    return newErrors;
  };

  const isValidEmail = (email) => {
    // Basic email validation regex
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  };

  const isValidPhoneNumber = (phoneNumber) => {
    // Basic phone number validation regex
    return /^[0-9]{10,15}$/.test(phoneNumber);
  };

  return (
    <>
      <CoursesNavigation />
      <div className="bg-gray-100 py-8 sm:py-12">
  <div className=" mx-auto px-4 sm:px-6 lg:px-8">
    <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6 sm:mb-8">
      Train Your Staff & Increase Your Company's Productivity!
    </h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
      <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Tailor-made Training Packages
          </h3>
          <div className="flex flex-col sm:flex-row items-start sm:items-baseline gap-4">
            <p className="text-gray-600 flex-1">
              Ensuring your staff remain fully trained is essential to the
              overall success and growth of your business. Whether you have
              2 or 20,000 staff members, New Skills Academy, in association
              with our sister company Staff Skills Training have training
              packages to suit your business. With over 600 courses
              available, you can customise the training package you put
              together for your staff.
            </p>
            <img src={Tailor} alt="" className="h-20 sm:h-24 w-auto" />
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Tracking & Reporting
          </h3>
          <div className="flex flex-col sm:flex-row items-start sm:items-baseline gap-4">
            <p className="text-gray-600 flex-1">
              Our advanced dashboard allows you to track your staff's
              progress every step of the way. You can see metrics such as
              overall progress and time logged in. Once completed, you can
              download your staff member's certificate. All qualifications
              gained by your staff can be validated by you or your customers
              24/7 via our website.
            </p>
            <img src={Dash} alt="" className="h-20 sm:h-24 w-auto" />
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            6 Great Reasons to Train Your Staff
          </h3>
          <ul className="list-disc pl-6 text-gray-600">
            <li>
              Demonstrate to your staff that you value them enough to
              invest in them and thus reduce staff turnover
            </li>
            <li>Increase employee motivation</li>
            <li>Training staff can result in better customer service</li>
            <li>
              Training increases a staff member's contribution to your
              business
            </li>
            <li>Upskilled staff can take on a variety of new and different tasks</li>
          </ul>
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Fully Accredited Courses
          </h3>
          <p className="text-gray-600">
            Our students' reputation matters, which is why all of our
            online courses have been reviewed and certified in partnership
            with qualified industry experts. For added security and peace
            of mind, our courses have been approved by CPD and various
            other awarding bodies.
          </p>
        </div>
      </div>
      <div className="bg-white self-baseline rounded-lg shadow-md p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Complete the quick enquiry form below and one of our student
          advisors will be in touch shortly
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          
            <div className=''>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                className={`bg-gray-100 border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#002244] w-full focus:border-[#002244] ${
                  errors.name ? 'border-red-500' : ''
                }`}
              />
              {errors.name && (
                <p className="text-red-500 mt-2">{errors.name}</p>
              )}
            </div>
            <div>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
                className={`bg-gray-100 border-gray-300  w-full rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#002244] focus:border-[#002244] ${
                  errors.lastName ? 'border-red-500' : ''
                }`}
              />
              {errors.lastName && (
                <p className="text-red-500 mt-2">{errors.lastName}</p>
              )}
            </div>
        
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleInputChange}
              className={`bg-gray-100 w-full border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#002244] focus:border-[#002244] ${
                errors.email ? 'border-red-500' : ''
              }`}
            />
            {errors.email && (
              <p className="text-red-500 mt-2">{errors.email}</p>
            )}
          </div>
          <div>
            <input
              type="number"
              name="contactNumber"
              placeholder="Contact number"
              value={formData.contactNumber}
              onChange={handleInputChange}
              className={`bg-gray-100 border-gray-300 w-full rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#002244] focus:border-[#002244] ${
                errors.contactNumber ? 'border-red-500' : ''
              }`}
            />
            {errors.contactNumber && (
              <p className="text-red-500 mt-2">{errors.contactNumber}</p>
            )}
          </div>
          <div>
            <label className="inline-flex items-center">
              <li className="ml-2 text-gray-600">
                I want to train multiple staff members
              </li>
            </label>
            <label className="inline-flex items-center ">
              <li className="ml-2 mt-6 mb-8 text-gray-600">
                I want to buy individual courses for myself
              </li>
            </label>
          </div>
          <button
            type="submit"
            className="bg-[#002244] mt-8 sm:mt-16 hover:bg-[#334e69] text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#002244] focus:ring-opacity-50"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  </div>
</div>

<div class="bg-[#fff] p-6 sm:p-8">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 class="text-4xl sm:text-5xl font-bold text-center text-gray-900 mb-8 sm:mb-12">
      Learn with confidence
    </h2>
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
      <div>
        <img src={Logo1} alt="" class="h-20 sm:h-32 w-auto" />
      </div>
      <div>
        <img src={Logo2} alt="" class="h-20 sm:h-32 w-auto" />
      </div>
      <div>
        <img src={Logo3} alt="" class="h-20 sm:h-32 w-auto" />
      </div>
      <div>
        <img src={Logo4} alt="" class="h-20 sm:h-32 w-auto" />
      </div>
      <div>
        <img src={Logo5} alt="" class="h-20 sm:h-32 w-auto" />
      </div>
    </div>
  </div>
</div>

<div class="bg-gray-100 p-6 sm:p-8 py-12 sm:py-16">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 class="text-4xl sm:text-5xl font-bold text-center text-gray-900 mb-8 sm:mb-12">
      As featured in ...
    </h2>
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
      <div>
        <a href="#">
          <img src={Logo6} alt="" class="h-10 sm:h-12 w-auto" />
        </a>
      </div>
      <div>
        <a href="#">
          <img src={Logo7} alt="" class="h-10 sm:h-12 w-auto" />
        </a>
      </div>
      <div>
        <a href="#">
          <img src={Logo8} alt="" class="h-10 sm:h-12 w-auto" />
        </a>
      </div>
      <div>
        <a href="#">
          <img src={Logo9} alt="" class="h-10 sm:h-12 w-auto" />
        </a>
      </div>
    </div>
  </div>
</div>

<div class="bg-[#1a3857] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
  <div class="flex flex-col items-center justify-center mx-auto">
    <div class="text-white font-bold text-2xl sm:text-3xl mx-6 mb-6 text-center">
      Validate a student's qualification. Enter their certificate ID to begin.
    </div>
    <div class="relative flex w-full sm:w-auto">
      <input
        type="search"
        placeholder="Enter certificate ID"
        class="w-full bg-transparent border border-white rounded-md py-2 sm:py-3 pl-4 pr-12 text-white placeholder:text-white focus:outline-none focus:ring-2 focus:ring-[#002244] focus:border-white sm:text-sm"
      />
      <div class="absolute inset-y-0 z-20 cursor-pointer right-0 pr-3 flex items-center ">
        <svg
          class="h-6 sm:h-8 w-6 sm:w-8 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
    </div>
  </div>
</div>
    </>
  );
}