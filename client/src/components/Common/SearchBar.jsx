import React, { useState, useEffect } from 'react';

const SearchBar = ({ onSearch, placeholder = "Search tasks..." }) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm, onSearch]);

  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-12 pr-12 py-3.5 border border-[#3d4857] rounded-lg leading-5 bg-[#1a202c] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm hover:border-[#4d5967] text-base"
                placeholder={placeholder}
            />
      {searchTerm && (
        <button
          onClick={() => setSearchTerm('')}
          className="absolute inset-y-0 right-0 pr-4 flex items-center hover:text-gray-200 transition-colors"
          aria-label="Clear search"
        >
          <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default SearchBar;