import React,{useEffect, useState} from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios';
export default function Profile() {
    const params = useParams();
    const [details, setDetails] = useState('');
    useEffect(()=>{
        axios.get(`http://localhost:1234/freelancer/profile/${params.username}`).then((response)=>{
            setDetails(response.data.profile);
            document.title = `Profile | ${details.Name}`;
            console.log(details)
        },[])
    })
  return (
<div className="min-h-screen bg-blue-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        {/* Profile Picture */}
        <div className="flex justify-center">
          <img
            src={details.profilePicture || "https://via.placeholder.com/120"}
            alt={details.name}
            className="w-32 h-32 rounded-full border-4 border-blue-200 shadow-md"
          />
        </div>

        {/* Name and detailsname */}
        <div className="text-center mt-4">
          <h1 className="text-2xl font-semibold text-gray-800">{details.Name}</h1>
          <p className="text-gray-500">@{params.username}</p>
          <p className="text-gray-600 flex items-center justify-center mt-1">
            <span className="inline-block mr-1">Country:-</span>
            {details.Country}
          </p>
        </div>

        {/* Bio */}
        <div className="mt-4 bg-blue-100 p-4 rounded-lg shadow-sm">
          <p className="text-gray-700 text-center">{details.bio || "No bio available."}</p>
        </div>

        {/* Contact Information */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-700">Contact Information</h2>
          <p className="text-gray-600 mt-2">
            📧 <a href={`mailto:${details.Email}`} className="text-blue-500">{details.Email}</a>
          </p>
          <p className="text-gray-600 mt-1">
            📱 <a href={`tel:${details.Mobile_Number}`} className="text-blue-500">{details.Mobile_Number}</a>
          </p>
        </div>

        {/* Skills */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-700">Skills</h2>
          <div className="flex flex-wrap gap-2 mt-2">
          </div>
        </div>

        {/* Account Created Date */}
        <div className="mt-6 text-sm text-gray-400 text-center">
          Account created on: {new Date(details.createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  )
}

