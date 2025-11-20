import React from 'react';

const TaskRow = ({ task, onEdit, onDelete }) => {
  const truncateText = (text, maxLength = 50) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  const getTaskId = () => {
    if (!task._id) return 'N/A';
    const idStr = task._id.toString();
    const match = idStr.match(/\d+/);
    if (match) {
      return match[0].slice(-4);
    }
    return idStr.slice(-4);
  };

  return (
    <tr className="group">
      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-300 bg-[#1a202c] group-hover:bg-[#2d3748] transition-colors rounded-l-lg">
        #{getTaskId()}
      </td>

      <td className="px-4 py-4 text-white bg-[#1a202c] group-hover:bg-[#2d3748] transition-colors">
        <div className="font-semibold text-sm">{task.title}</div>
      </td>

      <td className="hidden md:table-cell px-4 py-4 text-sm text-gray-400 bg-[#1a202c] group-hover:bg-[#2d3748] transition-colors">
        <div className="max-w-lg" title={task.description}>
          {truncateText(task.description, 120)}
        </div>
      </td>

      <td className="hidden sm:table-cell px-4 py-4 whitespace-nowrap text-sm text-gray-400 bg-[#1a202c] group-hover:bg-[#2d3748] transition-colors">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 flex-shrink-0 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{formatDate(task.createdAt)}</span>
        </div>
      </td>

      <td className="px-4 py-4 whitespace-nowrap bg-[#1a202c] group-hover:bg-[#2d3748] transition-colors rounded-r-lg">
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => onEdit(task)}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 active:bg-blue-800 transition-all duration-150 text-xs font-medium shadow-sm hover:shadow-md"
            title="Edit task"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit
          </button>
          <button
            onClick={() => onDelete(task)}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-red-600 text-white rounded-md hover:bg-red-700 active:bg-red-800 transition-all duration-150 text-xs font-medium shadow-sm hover:shadow-md"
            title="Delete task"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TaskRow;