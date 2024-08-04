import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import TransitionWrapper from './TransitionWrapper';

const NavigationMobile = ({setMenuOpen}) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const navItems = [
    { path: '/searchjob', label: 'Search Job' },
    { path: '/cvbuilder', label: 'CV Builder' },
    { path: '/jobalerts', label: 'Job Alerts' },
    { path: '/courses', label: 'Courses' },
    { path: '/company', label: 'Company' },
    { path: '/careeradvice', label: 'Career Advice' },
  ];
  const handleLinkClick = (path) => {
    setMenuOpen(false); // Close the mobile menu
    navigate(path); // Navigate to the path
  };
  return (
    <TransitionWrapper classNames="nav-fade" timeout={300}>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ zIndex: 100 }}
      >
        <div className="flex  justify-between items-center">
        <ul
  className="flex flex-col gap-y-10 text-xl items-center gap-x-4 w-full transition-all duration-300 ease-in-out"
>
  {navItems.map((item) => (
    <li
      key={item.path}
      onClick={handleLinkClick}
      className="bg-[#f0f0f0] px-6 py-3 rounded-md hover:bg-[#e0e0e0] transition-colors duration-200"
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Link
          to={item.path}
          className={`text-[#333333] hover:text-[#000000] transition-colors duration-100 ${
            location.pathname === item.path ? 'text-[#000a14] font-bold' : ''
          }`}
        >
          {item.label}
        </Link>
      </motion.div>
    </li>
  ))}
</ul>
       
        </div>
      </motion.nav>
    </TransitionWrapper>
  );
};

const NavigationDesktop = () => {
  const location = useLocation();

  const navItems = [
    { path: '/searchjob', label: 'Search Job' },
    { path: '/cvbuilder', label: 'CV Builder' },
    { path: '/jobalerts', label: 'Job Alerts' },
    { path: '/courses', label: 'Courses' },
    { path: '/company', label: 'Company' },
    { path: '/careeradvice', label: 'Career Advice' },
  ];

  return (
    <TransitionWrapper classNames="nav-fade" timeout={300}>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ zIndex: 100 }}
      >
        <ul className="flex space-x-4">
          {navItems.map((item) => (
            <li key={item.path}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                
              >
                <Link
                  to={item.path}
                 

                  className={`text-[#FFFFFF] hover:text-[#4682B4] transition-colors duration-100 ${
                    location.pathname === item.path ? 'active-nav-link' : ''
                  }`}
                >
                  {item.label}
                </Link>
              </motion.div>
            </li>
          ))}
        </ul>
      </motion.nav>
    </TransitionWrapper>
  );
};

export default function Navigation({setMenuOpen}) {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      {screenWidth >= 1000 ? (
        <NavigationDesktop />
      ) : screenWidth >= 300 ? (
        <NavigationMobile setMenuOpen={setMenuOpen} />
      ) : null}
    </div>
  );
}