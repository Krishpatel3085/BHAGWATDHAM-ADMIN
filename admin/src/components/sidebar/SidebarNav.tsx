// import React from 'react';
import { LayoutDashboard, Users, GraduationCap, BookOpen, Calendar, DollarSign, Book, FileText, CreditCard, Mail, Image, Building, Activity } from 'lucide-react';
import { NavItem } from '../../types/nav';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
const role = localStorage.getItem('role')
const navItems: NavItem[] = [
  { icon: <LayoutDashboard size={18} />, label: 'Dashboard', active: true, to: '/dashboard' },

  ...(role === 'Principal' ? [{ icon: <Users size={18} />, label: 'Teachers', to: '/teacher' }] : []),

  ...(role === 'Principal' || role === 'Teacher' ? [{ icon: <GraduationCap size={18} />, label: 'Students', to: '/student' }] : []),

  ...(role === 'Teacher' || role === 'Student' || role === 'Principal' ? [{ icon: <BookOpen size={18} />, label: 'Courses', to: '/course' }] : []),

  ...(role === 'Principal' || role === 'Teacher' ? [{ icon: <Calendar size={18} />, label: 'Schedule', to: '/schedule' }] : []),

  ...(role === 'Teacher' || role === 'Student' || role === 'Principal' ? [{ icon: <Book size={18} />, label: 'Lectures', to: '/lecture' }] : []),

  ...(role === 'Teacher' || role === 'Student' || role === 'Principal' ? [{ icon: <FileText size={18} />, label: 'Marksheet', to: '/marksheet' }] : []),

  ...(role === 'Teacher' || role === 'Principal' ? [{ icon: <Mail size={18} />, label: 'Request', to: '/request' }] : []),

  ...(role === 'Principal' || role === 'Student' ? [{ icon: <CreditCard size={18} />, label: 'Fees', to: '/fees' }] : []),

  ...(role === 'Principal' ? [{ icon: <DollarSign size={18} />, label: 'Payout', to: '/payout' }] : []),

  ...(role === 'Temple' ? [{ icon: <Building size={18} />, label: 'Temple Gallery', to: '/TempleG' }] : []),
  ...(role === 'Temple' ? [{ icon: <Image size={18} />, label: 'Gallery ', to: '/Gallery' }] : []),
  ...(role === 'Temple' ? [{ icon: <Activity size={18} />, label: 'Activities', to: '/Activities' }] : []),
  ...(role === 'Temple' ? [{ icon: <BookOpen size={18} />, label: 'Publication ', to: '/Publication' }] : []),


];
const SidebarNav = () => {
  const location = useLocation();
  return (
    <nav className="space-y-1">
      {navItems.map((item, index) => (
        <div key={index}>
          <Link
            to={item.to}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm ${location.pathname === item.to ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-[#252d3d]'
              }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        </div>
      ))}
    </nav>
  );
};

export default SidebarNav;