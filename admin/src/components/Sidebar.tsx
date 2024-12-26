// import React from 'react';
import { X } from 'lucide-react';
import SidebarProfile from './sidebar/SidebarProfile';
import SidebarNav from './sidebar/SidebarNav';
import  logo  from '../image/logoMain.png';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`w-64 bg-[#1e2746] fixed h-screen left-0 top-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform duration-300 z-50`}>
        <div className="flex items-center justify-between p-3 border-b border-gray-700">
            <img src={logo} alt="Logo" className='w-44 h-12' />
          <button
            onClick={onClose}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4">
          <SidebarProfile />
          <SidebarNav />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;