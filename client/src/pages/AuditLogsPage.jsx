import React, { useState, useEffect } from 'react';
import AuditLogsTable from '../components/AuditLogs/AuditLogsTable';
import Pagination from '../components/Common/Pagination';
import { logsAPI } from '../services/api';

const AuditLogsPage = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalLogs, setTotalLogs] = useState(0);

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      try {
        const response = await logsAPI.getLogs(currentPage, 20);
        setLogs(response.data.logs);
        setTotalPages(response.data.totalPages);
        setTotalLogs(response.data.totalLogs);
      } catch (error) {
        console.error('Failed to fetch logs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, [currentPage]);

  return (
    <div className="space-y-4 sm:space-y-6">
      <AuditLogsTable logs={logs} loading={loading} />

      {!loading && logs.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalLogs}
          itemsPerPage={20}
          itemType="logs"
          currentItemsCount={logs.length}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default AuditLogsPage;