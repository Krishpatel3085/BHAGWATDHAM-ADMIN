// import React from 'react';
import logo from '../../image/Swmi.jpg'
const SidebarProfile = () => {
  const role = localStorage.getItem('role');
  return (
    <div className="flex items-center gap-3 mb-6">
      <img
        src={logo}
        alt="Profile"
        className="w-10 h-10 rounded-full"
      />
      <div className="text-white">
        <h3 className="font-medium">BhagwatDham</h3>
        <p className="text-xs text-gray-400">{role}</p>
      </div>
    </div>
  );
};

export default SidebarProfile;