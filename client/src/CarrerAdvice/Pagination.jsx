import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handleClick = (page) => {
    onPageChange(page);
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center mt-8">
      <ul className="flex list-style-none">
        {pageNumbers.map((page) => (
          <li key={page} className="px-3 py-2">
            <button
              className={`px-3 py-2 ${
                currentPage === page ? "bg-blue-500 text-white" : "bg-white text-blue-500"
              }  hover:bg-blue-700 hover:text-white rounded-lg`}
              onClick={() => handleClick(page)}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;