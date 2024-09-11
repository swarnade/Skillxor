import axios from 'axios';
import  { useEffect, useRef, useState } from 'react';
import Sidebar  from '../../components/Sidebar';
import ProjectCard from '../../components/ProjectCard'
import ModalComponent from '../../components/PopUp';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const profilesRef = useRef(null); 
  const previousProfilesLength = useRef(0);

  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const openModal = () => {
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form submission reload
    alert("Form submitted!");
    closeModal(); // Close modal after submitting the form
  };

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
  }, [projects])


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
          <div className='flex gap-4'>
          {/*Create projects button*/}
          <button className="flex items-center bg-green-500 text-white p-2 px-4 rounded-lg hover:bg-blue-600" onClick={openModal}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Create
          </button>          {/* Search Box */}

                <ModalComponent
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onSubmit={handleSubmit}
                />

          {/* Search Box */}

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
