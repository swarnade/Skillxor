import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FreelancerSidebar from '../../components/FreelancerSidebar';

const ProjectModal = ({ project, onClose, onApply }) => {
  const [coverLetter, setCoverLetter] = useState(''); // State to store cover letter

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-1/2 p-6">
        <h2 className="text-2xl font-bold mb-4">{project.title}</h2>
        <p className="text-lg mb-4">{project.description}</p>
        <p className="text-lg font-semibold mb-4">Budget: ${project.budget}</p>

        <textarea
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
          placeholder="Write your cover letter here"
          className="w-full h-24 p-2 border rounded-lg mb-4"
        />

        <div className="flex justify-between items-center">
          <button
            onClick={() => onApply(project, coverLetter)} // Pass cover letter as parameter
            className={`${
              project.status === 'open'
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-red-500 hover:bg-red-600'
            } text-white font-semibold py-2 px-4 rounded-lg`}
            disabled={project.status !== 'open'}
          >
            {project.status === 'open' ? 'Apply' : 'Closed'}
          </button>
          <button
            onClick={onClose}
            className="ml-4 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 right-6 bg-green-500 text-white py-4 px-6 rounded-lg shadow-lg text-lg font-semibold">
      {message}
    </div>
  );
};

const Projectsection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:1234/projects');
        if (response.status === 200) {
          setProjects(response.data.projects);
        } else {
          setError(response.data.message || 'Something went wrong');
        }
      } catch (error) {
        setError('Failed to fetch projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleApply = async (project, coverLetter) => {
    const jwtToken = localStorage.getItem('Token'); 

    if (!jwtToken) {
      console.error('JWT token not found');
      return; 
    }

    console.log('JWT Token:', jwtToken); 

    try {
      const response = await axios.post(
        `http://localhost:1234/projects/apply/${project._id}`,
        {
          coverLetter, 
        },
        {
          headers: {
            Authorization: `${jwtToken}`, 
          },
        }
      );

      if (response.status === 200) {
        console.log(`Successfully applied to project: ${project.title}`);
        setShowToast(true); 
        setSelectedProject(null); 
      }
    } catch (error) {
      console.error('Error applying for project:', error);
    }
  };

  const limitDescription = (description) => {
    const words = description.split(' ');
    return words.length > 10
      ? `${words.slice(0, 10).join(' ')}...`
      : description;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-gray-100 h-screen w-screen p-4 overflow-y-auto">
      <div className="w-full h-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex h-full">
          <FreelancerSidebar />
          <div className="flex flex-col w-full p-4">
            <h1 className="text-2xl font-semibold mb-4">Projects</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-y-auto h-[80vh]">
              {projects.map((project) => (
                <div
                  key={project._id}
                  className="border p-4 rounded-lg shadow-md bg-white cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="mb-4">
                    <h2 className="text-xl font-semibold">{project.title}</h2>
                  </div>
                  <div className="mb-2">
                    <p className="text-lg font-bold">${project.budget}</p>
                  </div>
                  <div className="mb-2">
                    <p className="text-gray-600">
                      {limitDescription(project.description)}
                    </p>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <span
                      className={`${
                        project.status === 'open' ? 'text-green-500' : 'text-red-500'
                      } font-semibold`}
                    >
                      {project.status === 'open' ? 'Open' : 'Closed'}
                    </span>
                    <button
                      className={`${
                        project.status === 'open'
                          ? 'bg-green-500 hover:bg-green-600'
                          : 'bg-red-500 hover:bg-red-600'
                      } text-white font-semibold py-2 px-4 rounded-lg`}
                      disabled={project.status !== 'open'}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onApply={handleApply}
        />
      )}

      {showToast && (
        <Toast
          message="Successfully applied!"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default Projectsection;
