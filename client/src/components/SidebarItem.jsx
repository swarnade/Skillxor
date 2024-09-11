import React from 'react';

const SidebarItem = ({ icon, text, active = false, onClick }) => {
  return (
    <div 
      onClick={onClick} 
      className={`flex items-center space-x-3 mx-1 p-3 w-full rounded cursor-pointer ${active ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-gray-200'}`}
    >
      {icon}
      <span className="font-medium whitespace-nowrap">{text}</span>
    </div>
  );
};

export default SidebarItem;
