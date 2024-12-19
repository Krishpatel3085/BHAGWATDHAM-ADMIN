// import React from 'react';
import { LayoutDashboard, Users, Building2, GraduationCap, BookOpen, Calendar, Settings, DollarSign, Book, FileText, CreditCard, Mail } from 'lucide-react';
import { NavItem } from '../../types/nav';

const role = localStorage.getItem('role')
const navItems: NavItem[] = [
  { icon: <LayoutDashboard size={18} />, label: 'Dashboard', active: true },

  ...(role === 'Principal' ? [{ icon: <Users size={18} />, label: 'Teachers' }] : []),

  ...(role === 'Principal' || role === 'Teacher' ? [{ icon: <GraduationCap size={18} />, label: 'Students' }] : []),

  { icon: <BookOpen size={18} />, label: 'Courses' },

  ...(role === 'Principal' || role === 'Teacher' ? [{ icon: <Calendar size={18} />, label: 'Schedule' }] : []),

  { icon: <Book size={18} />, label: 'Lectures' },

  ...(role === 'Teacher' || role === 'Student' ? [{ icon: <FileText size={18} />, label: 'Marksheet' }] : []),

  ...(role === 'Teacher' || role === 'Principal' ? [{ icon: <Mail size={18} />, label: 'Request' }] : []),

  ...(role === 'Principal' || role === 'Student' ? [{ icon: <CreditCard size={18} />, label: 'Fees' }] : []),

  ...(role === 'Principal' ? [{ icon: <DollarSign size={18} />, label: 'Payout' }] : []),

  { icon: <Settings size={18} />, label: 'Settings' },
];
const SidebarNav = () => {
  return (
    <nav className="space-y-1">
      {navItems.map((item, index) => (
        <div key={index}>
          <a
            href="#"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm ${item.active ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-[#252d3d]'
              }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </a>
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