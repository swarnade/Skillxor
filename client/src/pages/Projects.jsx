import axios from 'axios';
import  { useEffect, useRef, useState } from 'react';
import Sidebar  from '../components/Sidebar';
import ProjectCard from '../components/ProjectCard'


const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const profilesRef = useRef(null); 
  const previousProfilesLength = useRef(0);


  useEffect(()=>{
   
    axios.get('http://localhost:1234/projects')
    .then(response => {
      console.log(response.data);
      setProjects(response.data.projects);
      previousProfilesLength.current = response.data.projects.length; 
    })
    .catch(error => {
      console.error('Error fetching projects:', error);
    });
  }, [])


  useEffect(() => {
    if (projects.length > previousProfilesLength.current) {
      profilesRef.current?.scrollIntoView({ behavior: 'smooth' });
      previousProfilesLength.current = projects.length; 
    }
  }, [projects]);


  return (
    <div className="flex h-screen bg-gray-100">
      
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 p-10 ml-1/4 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Projects</h1>
          <div className="relative">
            <input
              type="text"
              className="bg-gray-200 p-3 rounded-md w-72"
              placeholder="Search project in your domain"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16l-6-6m0 0l6-6m-6 6h18"
              />
            </svg>
          </div>
        </div>

        {/* Project Cards */}
        <div className="grid grid-cols-3 gap-6">
          {projects.length > 0 ? (  
              projects.map(projects =>(
                <ProjectCard
                  key={projects._id}
                  title={projects.title}
                  budget = {projects.budget}
                  description = {projects.description}
                />
              ))
          ) : (<p>No projects found!!!</p>)}
        </div>
      </div>
    </div>
  );
};


export default Dashboard;
