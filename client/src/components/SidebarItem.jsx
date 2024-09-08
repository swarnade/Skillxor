import React from 'react'

const SidebarItem = ({ icon, text, active = false }) => {
  return  ( <div className={`flex items-center space-x-3 p-2 rounded ${active ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-gray-200'}`}>
    {icon}
    <span className="font-medium">{text}</span>
  </div>)
}

export default SidebarItem;