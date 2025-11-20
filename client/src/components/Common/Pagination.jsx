import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange, totalItems, itemsPerPage, itemType = 'tasks', currentItemsCount }) => {
  const singular = itemType === 'tasks' ? 'task' : 'log';
  const plural = itemType === 'tasks' ? 'tasks' : 'logs';
  const displayedCount = currentItemsCount !== undefined ? currentItemsCount : Math.min(itemsPerPage, totalItems - (currentPage - 1) * itemsPerPage);

  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#2d3748] bg-[#0f1419] px-6 py-4 rounded-b-lg">
      <div className="text-sm sm:text-base text-gray-400 text-center sm:text-left">
        Showing {displayedCount} of {totalItems} {totalItems === 1 ? singular : plural}
      </div>
      <div className="flex items-center space-x-3">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 text-sm sm:text-base font-medium text-gray-400 bg-[#1a202c] border border-[#2d3748] rounded-lg hover:bg-[#2d3748] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Prev
        </button>
        <button
          className="px-4 py-2 text-sm sm:text-base font-medium text-white bg-[#2d3748] border border-[#2d3748] rounded-lg"
        >
          Page {currentPage}
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-sm sm:text-base font-medium text-gray-400 bg-[#1a202c] border border-[#2d3748] rounded-lg hover:bg-[#2d3748] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;