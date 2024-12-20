// import React from 'react';
import { Menu, Bell, Settings } from 'lucide-react';
import { useLocation } from 'react-router-dom';
interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const location = useLocation();
  const path = location.pathname;
  const pathname = path.slice(1)
  return (
    <header className="bg-[#1e2746] border-b border-gray-700 px-4 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-gray-400 hover:text-white"
        >
          <Menu size={24} />
        </button>
        <h2 className="text-lg font-semibold text-white first-letter:uppercase">{pathname}</h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-[#252d3d] rounded-full">
            <Bell size={20} className="text-gray-400" />
          </button>
          <button className="p-2 hover:bg-[#252d3d] rounded-full">
            <Settings size={20} className="text-gray-400" />
          </button>
        </div>
        <select className="bg-[#252d3d] text-gray-300 px-3 py-1.5 rounded border border-gray-700 text-sm hidden md:block">
          <option>English</option>
        </select>
        <img
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt="Profile"
          className="w-8 h-8 rounded-full"
        />
      </div>
    </header>
  );
};

export default Header;