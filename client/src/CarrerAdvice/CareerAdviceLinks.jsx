import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function CareerAdviceLinks() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="bg-white border-y-2  border-gray-200 py-3 mb-8  md:px-0">
      <div className="flex overflow-x-auto mx-auto w-full px-32 scroll-hidden py-5">
        {[
          { to: "/careeradvice", label: "Home" },
          { to: "/carrerAdvice/Apprenthiceship", label: "Apprenticeship" },
          { to: "/carrerAdvice/carrerDevelopment", label: "Career Development" },
          { to: "/carrerAdvice/graduates", label: "Graduates" },
          { to: "/carrerAdvice/coverLater", label: "Cover Letter" },
          { to: "/carrerAdvice/GettingStarted", label: "Getting Started" },
          { to: "/carrerAdvice/worklife", label: "Work Life" },
          { to: "/carrerAdvice/cvs", label: "CVs" },
          { to: "/carrerAdvice/Interviews", label: "Interviews" },
        ].map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className={`text-gray-500 text-nowrap hover:bg-[#002244] hover:text-white font-medium px-4 mx-3 py-2 rounded transition-colors duration-300 max-w-sm ${
              isActive(to) ? 'text-white bg-[#002244] font-semibold' : ''
            }`}
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CareerAdviceLinks;