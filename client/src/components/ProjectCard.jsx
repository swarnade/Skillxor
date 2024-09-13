import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProjectCard({id,title, budget, description}){
  const navigate = useNavigate();
  const btn=()=>{
    navigate(`/project/applied/${id}`)
  }
    return (

      <div  className="bg-white p-6 rounded-lg shadow-md">
                  <div className="w-full h-32 bg-gray-200 mb-4"></div>
                  <h2 className="text-xl font-semibold">Title : {title}</h2>
                  <p className="text-gray-600">Price: ₹{budget}</p>
                  <p className="text-gray-600">
                    Description: {description}
                  </p>
                  <button onClick={btn} className="text-green-800 font-bold">View Applicants</button>
      </div>
    )
  }