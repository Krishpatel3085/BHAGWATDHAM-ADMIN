import React from 'react';
import { Menu } from 'lucide-react';
import ProfileMenu from './header/ProfileMenu';
import NotificationMenu from './header/NotificationMenu';
import { useLocation } from 'react-router-dom';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {

  const location = useLocation();
  const path = location.pathname;
  const pathname = path.slice(1)

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
          <h2 className="text-lg font-semibold text-white first-letter:uppercase">{pathname}</h2>
        </div>

        <div className="flex items-center gap-2 md:gap-4 lg:me-6">
          <NotificationMenu />
          <ProfileMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;