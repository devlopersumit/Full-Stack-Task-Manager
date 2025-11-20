import React, { useState, useEffect } from 'react';
import { sanitizeInput, validateTaskInput } from '../../utils/sanitize';

const TaskModal = ({ isOpen, onClose, onSubmit, task = null }) => {
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      setFormData({ title: task.title, description: task.description });
    } else {
      setFormData({ title: '', description: '' });
    }
    setErrors({});
  }, [task, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const sanitized = sanitizeInput(value);
    setFormData(prev => ({ ...prev, [name]: sanitized }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { isValid, errors: validationErrors } = validateTaskInput(
      formData.title,
      formData.description
    );

    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div
          className="fixed inset-0 bg-black bg-opacity-70 transition-opacity"
          onClick={onClose}
        ></div>

        <div className="relative bg-[#0f1419] rounded-lg shadow-xl max-w-2xl w-full border border-[#2d3748]">
          <div className="flex items-center justify-between p-6 sm:p-8 border-b border-[#2d3748]">
            <h2 className="text-xl sm:text-2xl font-semibold text-white">
              {task ? 'Edit Task' : 'Create Task'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-[#1a202c]"
            >
              Close
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-8">
            <div className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-base font-medium text-gray-300 mb-3">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full px-5 py-3 bg-[#1a202c] border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500 text-base ${
                    errors.title ? 'border-red-500' : 'border-[#2d3748]'
                  }`}
                  placeholder="Enter task title"
                  maxLength={100}
                />
                {errors.title && (
                  <p className="text-sm text-red-400 mt-2">{errors.title}</p>
                )}
                <p className={`text-sm mt-2 text-gray-500`}>
                  {formData.title.length}/100
                </p>
              </div>

              <div>
                <label htmlFor="description" className="block text-base font-medium text-gray-300 mb-3">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={6}
                  className={`w-full px-5 py-3 bg-[#1a202c] border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-white placeholder-gray-500 text-base ${
                    errors.description ? 'border-red-500' : 'border-[#2d3748]'
                  }`}
                  placeholder="Enter task description"
                  maxLength={500}
                />
                {errors.description && (
                  <p className="text-sm text-red-400 mt-2">{errors.description}</p>
                )}
                <p className={`text-sm mt-2 text-gray-500`}>
                  {formData.description.length}/500
                </p>
              </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row justify-end gap-4 mt-8">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3 border border-[#2d3748] rounded-lg text-gray-300 font-medium hover:bg-[#1a202c] transition-colors text-base"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-base"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Save Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;