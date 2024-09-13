import { useState, useEffect } from "react";
import SidebarItem from "./SidebarItem";
import { Folder, Layers, User, Settings } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState(null); 
  const navigate = useNavigate(); 
  const location = useLocation(); 

 
  useEffect(() => {
    const path = location.pathname;

    
    if (path === "/employer/projects") {
      setActiveItem("projects");
    } else if (path === "/applicants") {
      setActiveItem("applicants");
    } else if (path === "/profile") {
      setActiveItem("profile");
    } else if (path === "/settings") {
      setActiveItem("settings");
    }
  }, []); 

  const handleItemClick = (item, path) => {
    setActiveItem(item); 
    navigate(path);
  };

  return (
    <div className="w-1/4 bg-gray-50 p-4 space-y-4 h-full">
      <SidebarItem 
        icon={<Folder />} 
        text="My Projects" 
        active={activeItem === "projects"} 
        onClick={() => handleItemClick("projects", "/employer/projects")} 
      />
      <SidebarItem 
        icon={<Layers />} 
        text="Applicants" 
        active={activeItem === "applicants"} 
        onClick={() => handleItemClick("applicants", "/applicants")} 
      />
      <SidebarItem 
        icon={<User />} 
        text="Profile" 
        active={activeItem === "profile"} 
        onClick={() => handleItemClick("profile", "/profile")} 
      />
      <div className="flex-grow" />
      <SidebarItem 
        icon={<Settings />} 
        text="Settings" 
        active={activeItem === "settings"} 
        onClick={() => handleItemClick("settings", "/settings")} 
      />
    </div>
  );
};

export default Sidebar;
