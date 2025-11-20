import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-[#1a1f2e]">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden bg-[#1a1f2e]">
        <main className="flex-1 overflow-y-auto">
          <div className="px-6 sm:px-8 lg:px-12 py-6 sm:py-8 max-w-7xl mx-auto w-full">
            <Header />
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;