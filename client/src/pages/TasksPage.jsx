import React, { useState, useEffect } from 'react';
import TaskTable from '../components/Tasks/TaskTable';
import TaskModal from '../components/Tasks/TaskModal';
import DeleteConfirmModal from '../components/Common/DeleteConfirmModal';
import SearchBar from '../components/Common/SearchBar';
import Pagination from '../components/Common/Pagination';
import { taskAPI } from '../services/api';

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalTasks, setTotalTasks] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [message, setMessage] = useState(null);

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await taskAPI.getTasks(currentPage, 5, searchTerm);
      setTasks(response.data.tasks);
      setTotalPages(response.data.totalPages);
      setTotalTasks(response.data.totalTasks);
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.response?.data?.error || 'Failed to fetch tasks';
      showMessage('error', errorMsg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [currentPage, searchTerm]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleCreateTask = async (taskData) => {
    try {
      await taskAPI.createTask(taskData);
      showMessage('success', 'Task created successfully!');
      setIsModalOpen(false);
      fetchTasks();
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.response?.data?.error || 'Failed to create task';
      showMessage('error', errorMsg);
    }
  };

  const handleEditTask = async (taskData) => {
    try {
      await taskAPI.updateTask(selectedTask._id, taskData);
      showMessage('success', 'Task updated successfully!');
      setIsModalOpen(false);
      setSelectedTask(null);
      fetchTasks();
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.response?.data?.error || 'Failed to update task';
      showMessage('error', errorMsg);
    }
  };

  const handleDeleteTask = async () => {
    try {
      await taskAPI.deleteTask(taskToDelete._id);
      showMessage('success', 'Task deleted successfully!');
      setIsDeleteModalOpen(false);
      setTaskToDelete(null);
      fetchTasks();
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.response?.data?.error || 'Failed to delete task';
      showMessage('error', errorMsg);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {message && (
        <div
          className={`p-3 sm:p-4 rounded-lg ${
            message.type === 'success'
              ? 'bg-green-900/30 text-green-400 border border-green-700'
              : 'bg-red-900/30 text-red-400 border border-red-700'
          }`}
        >
          <div className="flex items-center">
            {message.type === 'success' ? (
              <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            )}
            <span className="text-sm sm:text-base">{message.text}</span>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
        <div className="flex-1 w-full sm:max-w-md">
          <SearchBar
            onSearch={handleSearch}
            placeholder="Search by title or description"
          />
        </div>
        <button
          onClick={() => {
            setSelectedTask(null);
            setIsModalOpen(true);
          }}
          className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors whitespace-nowrap"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span className="hidden sm:inline">Create Task</span>
          <span className="sm:hidden">Create</span>
        </button>
      </div>

      <TaskTable
        tasks={tasks}
        onEdit={(task) => {
          setSelectedTask(task);
          setIsModalOpen(true);
        }}
        onDelete={(task) => {
          setTaskToDelete(task);
          setIsDeleteModalOpen(true);
        }}
        loading={loading}
      />

      {!loading && tasks.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalTasks}
          itemsPerPage={5}
          itemType="tasks"
          currentItemsCount={tasks.length}
          onPageChange={setCurrentPage}
        />
      )}

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTask(null);
        }}
        onSubmit={selectedTask ? handleEditTask : handleCreateTask}
        task={selectedTask}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setTaskToDelete(null);
        }}
        onConfirm={handleDeleteTask}
        taskTitle={taskToDelete?.title}
      />
    </div>
  );
};

export default TasksPage;