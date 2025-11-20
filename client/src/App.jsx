import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import TasksPage from './pages/TasksPage';
import AuditLogsPage from './pages/AuditLogsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<TasksPage />} />
          <Route path="audit-logs" element={<AuditLogsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;