import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const Header = () => {
    const location = useLocation();
    const isTasksPage = location.pathname === '/';
    const isAuditLogsPage = location.pathname === '/audit-logs';

    return (
        <div className="mb-6 sm:mb-8">
            <div className="mb-4 sm:mb-5">
                <div className="flex items-center space-x-3">
                    <svg className="w-6 h-6 sm:w-7 sm:h-7 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white">
                        {isTasksPage ? 'Tasks' : 'Audit Logs'}
                    </h1>
                </div>
            </div>

            <div className="flex space-x-2 border-b border-[#2d3748] gap-2.5 mb-1.5">
                <Link
                    to="/"
                    className={`px-4 sm:px-5 py-2.5 text-sm sm:text-base font-medium transition-colors ${isTasksPage
                            ? 'text-white border-b-2 border-blue-400'
                            : 'text-gray-400 hover:text-gray-300'
                        }`}
                >
                    Tasks
                </Link>
                <Link
                    to="/audit-logs"
                    className={`px-4 sm:px-5 py-2.5 text-sm sm:text-base font-medium transition-colors ${isAuditLogsPage
                            ? 'text-white border-b-2 border-blue-400'
                            : 'text-gray-400 hover:text-gray-300'
                        }`}
                >
                    Audit Logs
                </Link>
            </div>
        </div>
    );
};

export default Header;