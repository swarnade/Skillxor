import React,{useState,useEffect, useRef} from 'react'
import axios from 'axios';
import ProfileCard from '../../components/ProfileCard';

export default function AppliedDetails({username}) {

    const [details, setDetails] = useState([]);
    // const profilesRef = useRef(null);
    // const previousProfilesLength = useRef(0);
    useEffect(()=>{
        axios.get(`http://localhost:1234/freelancer/profile/${username}`).then((response)=>{
          setDetails([response.data.profile]);
          // previousProfilesLength.current = response.data.profile.length; //rem
        })
        .catch((error) => {
          console.error('Error fetching freelancer profile:', error);
        });
    },[username])

    // useEffect(() => {
    //   if (details.length > previousProfilesLength.current) {
    //     profilesRef.current?.scrollIntoView({ behavior: 'smooth' });
    //     previousProfilesLength.current = details.length;
    //   }
    // }, [details]);


  return (
    <div>
<div className="bg-gray-100  p-4 overflow-y-auto">
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="flex ">
        {/* Main content */}
        <div className="w-3/4 p-6 overflow-y-auto">
          
          

          <div className="flex flex-col space-y-4">
            {/* Debugging: Display fetched profiles */}
            {console.log('Profiles in state:', details)}

            {/* Logic to display profiles if available, or a message if no profiles found */}
            {details.length > 0 ? (
              details.map((applicant) => (
                <ProfileCard
                  key={applicant._id}
                  id={applicant._id}
                  name={applicant.Name}
                  description={applicant.Bio || 'Cover Letter description '}  // Fallback if description is missing
                />
              ))
            ) : (
              <p>No applicants found.</p>  // Show this if no applicants are available
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
    </div>
    
  )
}
