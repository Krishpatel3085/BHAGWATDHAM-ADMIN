import React from 'react';
import { Menu } from 'lucide-react';
import ProfileMenu from './header/ProfileMenu';
import NotificationMenu from './header/NotificationMenu';
import SettingsDropdown from './header/SettingDropdown';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="bg-[#1e2746] border-b border-gray-700/50 px-4 py-4">
      <div className="flex items-center justify-between max-w-[1920px] mx-auto">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden text-gray-400 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            <Menu size={24} />
          </button>
          <h2 className="text-lg font-semibold text-white">Dashboard</h2>
          <nav className="hidden md:flex items-center gap-2">
            <span className="text-gray-300">Dashboard</span>
            <span className="text-gray-500">/</span>
            <span className="text-gray-500">Overview</span>
          </nav>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <NotificationMenu />
          <SettingsDropdown />
          <select className="bg-[#252d3d] text-gray-300 px-3 py-1.5 rounded border border-gray-700/50 text-sm hidden md:block">
            <option>English</option>
            <option>Spanish</option>
          </select>
          <ProfileMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;