// import React from 'react';

const SidebarProfile = () => {
  return (
    <div className="flex items-center gap-3 mb-6">
      <img
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        alt="Profile"
        className="w-10 h-10 rounded-full"
      />
      <div className="text-white">
        <h3 className="font-medium">BhagwatDham</h3>
        <p className="text-xs text-gray-400">Admin</p>
      </div>
    </div>
  );
};

export default SidebarProfile;