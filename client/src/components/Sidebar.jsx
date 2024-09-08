import React from 'react'
import SidebarItem from "./SidebarItem";
import { Folder, Layers, User, Settings } from 'lucide-react';

const Sidebar = () => {
  return <div className="w-1/4 bg-gray-50 p-4 space-y-4 h-full">
  <SidebarItem icon={<Folder />} text="My Projects" />
  <SidebarItem icon={<Layers />} text="Profiles" active />
  <SidebarItem icon={<User />} text="Profile" />
  <div className="flex-grow" />
  <SidebarItem icon={<Settings />} text="Settings" />
</div>
}

export default Sidebar