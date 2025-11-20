import React from 'react';
import TaskRow from './TaskRow';

const TaskTable = ({ tasks, onEdit, onDelete, loading }) => {
  if (loading) {
    return (
      <div className="bg-[#0f1419] rounded-lg border border-[#2d3748] shadow-lg">
        <div className="flex items-center justify-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
        </div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="bg-[#0f1419] rounded-lg border border-[#2d3748] shadow-lg">
        <div className="text-center py-16 px-4">
          <svg
            className="mx-auto h-16 w-16 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <h3 className="mt-4 text-base font-medium text-gray-300">No tasks found</h3>
          <p className="mt-2 text-sm text-gray-500">Get started by creating a new task.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0f1419] rounded-lg border border-[#2d3748] overflow-hidden shadow-lg">
      <div className="px-6 py-5 border-b border-[#2d3748]">
        <h2 className="text-xl font-semibold text-white">Tasks</h2>
      </div>
      <div className="overflow-x-auto p-4">
        <table className="min-w-full border-separate border-spacing-y-2">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider bg-[#1a202c] rounded-l-lg">
                ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider bg-[#1a202c]">
                Title
              </th>
              <th className="hidden md:table-cell px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider bg-[#1a202c]">
                Description
              </th>
              <th className="hidden sm:table-cell px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider bg-[#1a202c]">
                Created At
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider bg-[#1a202c] rounded-r-lg">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <TaskRow
                key={task._id}
                task={task}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskTable;