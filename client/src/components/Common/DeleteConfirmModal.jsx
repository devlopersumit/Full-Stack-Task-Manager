import React from 'react';

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, taskTitle }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div
          className="fixed inset-0 bg-black bg-opacity-70 transition-opacity"
          onClick={onClose}
        ></div>

        <div className="relative bg-[#0f1419] rounded-lg shadow-xl max-w-md w-full p-6 sm:p-8 border border-[#2d3748]">
          <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 mx-auto bg-red-900/30 rounded-full mb-6">
            <svg
              className="w-7 h-7 sm:w-8 sm:h-8 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          <h3 className="text-xl sm:text-2xl font-semibold text-white text-center mb-4">
            Delete Task
          </h3>
          <p className="text-base text-gray-400 text-center mb-8">
            Are you sure you want to delete "<strong className="text-white">{taskTitle}</strong>"? This action cannot be undone.
          </p>

          <div className="flex flex-col-reverse sm:flex-row gap-4">
            <button
              onClick={onClose}
              className="w-full sm:flex-1 px-6 py-3 border border-[#2d3748] rounded-lg text-gray-300 font-medium hover:bg-[#1a202c] transition-colors text-base"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="w-full sm:flex-1 px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors text-base"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;