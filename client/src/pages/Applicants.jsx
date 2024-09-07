import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Folder, Layers, User, Settings, X } from 'lucide-react';

export default function ProfilesPage() {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    axios.get('http://localhost:1234/freelancer/allprofiles/')
    .then(response => {
      console.log(response.data); // Log the response data
      setProfiles(response.data.profile);
    })
    .catch(error => {
      console.error('Error fetching profiles:', error);
    });
  }, []);

  return (
    <div className="bg-gray-100 h-screen w-screen p-4">
      <div className="w-full h-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-1/4 bg-gray-50 p-4 space-y-4 h-full">
            <SidebarItem icon={<Folder />} text="My Projects" />
            <SidebarItem icon={<Layers />} text="Profiles" active />
            <SidebarItem icon={<User />} text="Profile" />
            <div className="flex-grow" />
            <SidebarItem icon={<Settings />} text="Settings" />
          </div>

          {/* Main content */}
          <div className="w-3/4 p-6">
            <h1 className="text-2xl font-bold mb-2">Freelancers</h1>
            <p className="text-gray-600 mb-6">Below are all the profiles registered on the platform.</p>

            <div className="space-y-4">
              {profiles.length > 0 ? (
                profiles.map(profile => (
                  <ProfileCard
                    key={profile._id}
                    name={profile.Name}
                    description={profile.Bio} 
                  />
                ))
              ) : (
                <p>No profiles found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SidebarItem({ icon, text, active = false }) {
  return (
    <div className={`flex items-center space-x-3 p-2 rounded ${active ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-gray-200'}`}>
      {icon}
      <span className="font-medium">{text}</span>
    </div>
  );
}

function ProfileCard({ name, description }) {
  console.log('ProfileCard props:', { name, description }); // Log props

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 relative">
      <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
        <X size={20} />
      </button>
      <div className="flex items-start space-x-4">
        <div className="w-16 h-16 bg-gray-200 rounded-lg" />
        <div className="flex-grow">
          <h2 className="text-lg font-semibold mb-2">{name}</h2>
          <p className="text-gray-600 text-sm mb-3">{description}</p>
          <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-sm hover:bg-gray-300">
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
}
