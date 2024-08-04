import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Footer = () => {
  return (
    <footer className="bg-[#002244] text-white py-10">
      <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <h3 className="text-lg font-bold mb-4">Jobseekers</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-[#a5d1ff]">Register</a></li>
            <li><a href="#" className="hover:text-[#a5d1ff]">CV Advice</a></li>
            <li><a href="#" className="hover:text-[#a5d1ff]">Job Alerts</a></li>
            <li><a href="#" className="hover:text-[#a5d1ff]">Career Advice</a></li>
            <li><a href="#" className="hover:text-[#a5d1ff]">Salary Guide</a></li>
            <li><a href="#" className="hover:text-[#a5d1ff]">Popular</a></li>
            <li><a href="#" className="hover:text-[#a5d1ff]">Search Jobs</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">Employers</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-[#a5d1ff]">Agencies</a></li>
            <li><a href="#" className="hover:text-[#a5d1ff]">Popular jobs</a></li>
            <li><a href="#" className="hover:text-[#a5d1ff]">Salary Tax Calculator</a></li>
            <li><a href="#" className="hover:text-[#a5d1ff]">Recruiters</a></li>
            <li><a href="#" className="hover:text-[#a5d1ff]">CV Database Access</a></li>
            <li><a href="#" className="hover:text-[#a5d1ff]">Advertise Jobs</a></li>
            <li><a href="#" className="hover:text-[#a5d1ff]">Search CVs</a></li>
            <li><a href="#" className="hover:text-[#a5d1ff]">Test CV Search</a></li>
            <li><a href="#" className="hover:text-[#a5d1ff]">Recruiter blog</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">About</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-[#a5d1ff]">About us</a></li>
            <li><a href="#" className="hover:text-[#a5d1ff]">Contact us</a></li>
            <li><a href="#" className="hover:text-[#a5d1ff]">Work for us</a></li>
            <li><a href="#" className="hover:text-[#a5d1ff]">Help</a></li>
            <li><a href="#" className="hover:text-[#a5d1ff]">Job Search App</a></li>
          </ul>
          <div className="mt-4 flex space-x-4">
            <a href="#" className="text-[#a5d1ff] hover:text-white">
              <FaFacebookF />
            </a>
            <a href="#" className="text-[#a5d1ff] hover:text-white">
              <FaTwitter />
            </a>
            <a href="#" className="text-[#a5d1ff] hover:text-white">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <Link to="/" className="text-white">
            <img className='w-[150px] h-[150px]' src={logo} alt="" />
          </Link>
            <p className="text-white">Lui lala</p>
            <p className="text-white">Online jobs</p>
        </div>
      </div>
      <div className="container mx-auto border-t-2 border-gray-500 py-8 px-4 mt-8 text-center text-[#a5d1ff]">
        &copy; {new Date().getFullYear()} Lui lala company. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;