// import React from 'react';
import { LayoutDashboard, Users, Building2, GraduationCap, BookOpen, Calendar, Settings } from 'lucide-react';
import { NavItem } from '../../types/nav';

const navItems: NavItem[] = [
  { icon: <LayoutDashboard size={18} />, label: 'Dashboard', active: true},
  { icon: <Users size={18} />, label: 'Teachers' },
  { icon: <Building2 size={18} />, label: 'Front Office' },
  { icon: <GraduationCap size={18} />, label: 'Students' },
  { icon: <BookOpen size={18} />, label: 'Courses' },
  { icon: <Calendar size={18} />, label: 'Schedule' },
  { icon: <Settings size={18} />, label: 'Settings' },
];

const SidebarNav = () => {
  return (
    <nav className="space-y-1">
      {navItems.map((item, index) => (
        <div key={index}>
          <a
            href="#"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm ${
              item.active ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-[#252d3d]'
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