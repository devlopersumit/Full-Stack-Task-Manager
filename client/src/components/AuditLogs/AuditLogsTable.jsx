import React from 'react';

const AuditLogsTable = ({ logs, loading }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).replace(',', '');
  };

  const getActionColor = (action) => {
    switch (action) {
      case 'Create Task':
        return 'bg-green-600 text-white';
      case 'Update Task':
        return 'bg-orange-600 text-white';
      case 'Delete Task':
        return 'bg-red-600 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  const renderUpdatedContent = (content) => {
    if (!content || Object.keys(content).length === 0) {
      return <span className="text-gray-500">-</span>;
    }

    const contentStr = Object.entries(content)
      .map(([key, value]) => `${key}: "${value}"`)
      .join(' ');
    
    return <span className="text-gray-300">{contentStr}</span>;
  };

  if (loading) {
    return (
      <div className="bg-[#0f1419] rounded-lg border border-[#2d3748] shadow-lg">
        <div className="flex items-center justify-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
        </div>
      </div>
    );
  }

  if (logs.length === 0) {
    return (
      <div className="bg-[#0f1419] rounded-lg border border-[#2d3748] shadow-lg">
        <div className="text-center py-16">
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
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h3 className="mt-4 text-base font-medium text-gray-300">No audit logs yet</h3>
          <p className="mt-2 text-sm text-gray-500">
            Logs will appear here when you create, update, or delete tasks.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0f1419] rounded-lg border border-[#2d3748] overflow-hidden shadow-lg">
      <div className="px-6 py-5 border-b border-[#2d3748]">
        <h2 className="text-xl font-semibold text-white">Audit Logs</h2>
      </div>
      <div className="overflow-x-auto p-4">
        <table className="min-w-full border-separate border-spacing-y-2">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider bg-[#1a202c] rounded-l-lg">
                Timestamp
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider bg-[#1a202c]">
                Action
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider bg-[#1a202c]">
                Task ID
              </th>
              <th className="hidden md:table-cell px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider bg-[#1a202c]">
                Updated Content
              </th>
              <th className="hidden lg:table-cell px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider bg-[#1a202c] rounded-r-lg">
                Notes
              </th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log._id} className="group">
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300 bg-[#1a202c] group-hover:bg-[#2d3748] transition-colors rounded-l-lg">
                  {formatDate(log.timestamp)}
                </td>
                <td className="px-4 py-4 whitespace-nowrap bg-[#1a202c] group-hover:bg-[#2d3748] transition-colors">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-medium ${getActionColor(
                      log.action
                    )}`}
                  >
                    {log.action}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300 bg-[#1a202c] group-hover:bg-[#2d3748] transition-colors">
                  {log.taskId ? log.taskId.toString() : '-'}
                </td>
                <td className="hidden md:table-cell px-4 py-4 text-sm bg-[#1a202c] group-hover:bg-[#2d3748] transition-colors">
                  {renderUpdatedContent(log.updatedContent)}
                </td>
                <td className="hidden lg:table-cell px-4 py-4 text-sm text-gray-400 bg-[#1a202c] group-hover:bg-[#2d3748] transition-colors rounded-r-lg">
                  {log.notes || '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuditLogsTable;