// import React from 'react';
import { LayoutDashboard, Users, GraduationCap, BookOpen, Calendar, Settings, DollarSign, Book, FileText, CreditCard, Mail } from 'lucide-react';
import { NavItem } from '../../types/nav';
import { Link } from 'react-router-dom';

const role = localStorage.getItem('role')
const navItems: NavItem[] = [
  { icon: <LayoutDashboard size={18} />, label: 'Dashboard', active: true, to: '/dashboard' },

  ...(role === 'Principal' ? [{ icon: <Users size={18} />, label: 'Teachers', to: '/teacher' }] : []),

  ...(role === 'Principal' || role === 'Teacher' ? [{ icon: <GraduationCap size={18} />, label: 'Students', to: '/student' }] : []),

  { icon: <BookOpen size={18} />, label: 'Courses', to: '/course' },

  ...(role === 'Principal' || role === 'Teacher' ? [{ icon: <Calendar size={18} />, label: 'Schedule', to: '/schedule' }] : []),

  { icon: <Book size={18} />, label: 'Lectures', to: '/lecture' },

  ...(role === 'Teacher' || role === 'Student' ? [{ icon: <FileText size={18} />, label: 'Marksheet', to: '/marksheet' }] : []),

  ...(role === 'Teacher' || role === 'Principal' ? [{ icon: <Mail size={18} />, label: 'Request', to: '/request' }] : []),

  ...(role === 'Principal' || role === 'Student' ? [{ icon: <CreditCard size={18} />, label: 'Fees', to: '/fees' }] : []),

  ...(role === 'Principal' ? [{ icon: <DollarSign size={18} />, label: 'Payout', to: '/payout' }] : []),

  { icon: <Settings size={18} />, label: 'Settings', to: '/settings' },
];
const SidebarNav = () => {
  return (
    <nav className="space-y-1">
      {navItems.map((item, index) => (
        <div key={index}>
          <Link
            to={item.to}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm ${item.active ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-[#252d3d]'
              }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
          {/* {item.submenu && item.active && (
            <div className="ml-9 mt-1 space-y-1">
              {item.submenu.map((sub, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="block text-sm text-gray-400 hover:text-white py-1.5"
                >
                  {sub}
                </a>
              ))}
            </div>
          )} */}
        </div>
      ))}
    </nav>
  );
};

export default SidebarNav;