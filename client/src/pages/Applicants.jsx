import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Sidebar from "../components/Sidebar";
import ProfileCard from '../components/ProfileCard';

export default function ProfilesPage() {
  const [profiles, setProfiles] = useState([]);
  const profilesRef = useRef(null);
  const previousProfilesLength = useRef(0);

  useEffect(() => {
    axios.get('http://localhost:1234/freelancer/allprofiles/')
      .then(response => {
        console.log(response.data);
        setProfiles(response.data.profile);
        previousProfilesLength.current = response.data.profile.length;
      })
      .catch(error => {
        console.error('Error fetching profiles:', error);
      });
  }, []);

  useEffect(() => {
    if (profiles.length > previousProfilesLength.current) {
      profilesRef.current?.scrollIntoView({ behavior: 'smooth' });
      previousProfilesLength.current = profiles.length;
    }
  }, [profiles]);

  return (
    <div className="bg-gray-100 h-screen w-screen overflow-y-auto">
      <div className="w-full h-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex h-full">
          {/* Sidebar */}
          
           <Sidebar/>

          {/* Main content */}
          <div className="w-3/4 p-6 overflow-y-auto">
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
              <div ref={profilesRef} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


