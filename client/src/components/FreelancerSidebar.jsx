import React, { useState, useEffect } from 'react';
import SidebarItem from './SidebarItem';
import { Folder, User, Settings } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const FreelancerSidebar = () => {
  const [activeItem, setActiveItem] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    if (path === '/freelancer/projects') {
      setActiveItem('projects');
    } else if (path === '/freelancer/profile') {
      setActiveItem('profile');
    } else if (path === '/freelancer/settings') {
      setActiveItem('settings');
    }
  }, [location]);

  const handleItemClick = (item, path) => {
    setActiveItem(item);
    navigate(path);
  };

  return (
    <div className="bg-gray-50 p-4 space-y-4 h-full w-auto">
      
      <div className="hidden md:flex flex-col items-start space-y-6">
        <SidebarItem
          icon={<Folder size={32} />} 
          text="My Projects"
          active={activeItem === 'projects'}
          onClick={() => handleItemClick('projects', '/freelancer/projects')}
        />
        <SidebarItem
          icon={<User size={32} />} 
          text="Profile"
          active={activeItem === 'profile'}
          onClick={() => handleItemClick('profile', '/freelancer/profile')}
        />
        <div className="flex-grow" />
        <SidebarItem
          icon={<Settings size={32} />} 
          text="Settings"
          active={activeItem === 'settings'}
          onClick={() => handleItemClick('settings', '/freelancer/settings')}
        />
      </div>

      <div className="flex md:hidden flex-col items-center space-y-6">
        <SidebarItem
          icon={<Folder size={32} />} 
          text="" 
          active={activeItem === 'projects'}
          onClick={() => handleItemClick('projects', '/freelancer/projects')}
        />
        <SidebarItem
          icon={<User size={32} />}
          text="" 
          active={activeItem === 'profile'}
          onClick={() => handleItemClick('profile', '/freelancer/profile')}
        />
        <div className="flex-grow" />
        <SidebarItem
          icon={<Settings size={32} />} 
          text="" 
          active={activeItem === 'settings'}
          onClick={() => handleItemClick('settings', '/freelancer/settings')}
        />
      </div>
    </div>
  );
};

export default FreelancerSidebar;
