import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from "../components/Sidebar"
import ProfileCard from '../components/ProfileCard';
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
            <Sidebar/>
            {/* main content */}
          <div className="w-3/4 p-6 ">
                <h1 className="text-2xl font-bold mb-2">Freelancers</h1>
                <p className="text-gray-600 mb-6 ">Below are all the profiles registered on the platform.</p>
                <div className="space-y-4 ">
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

