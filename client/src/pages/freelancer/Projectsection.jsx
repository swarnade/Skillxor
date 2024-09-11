import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FreelancerSidebar from '../../components/FreelancerSidebar';
import ProjectModal from '../../components/ProjectModal';
// Modal Component for Project Details
// const ProjectModal = ({ project, onClose, onApply }) => {
//   if (!project) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
//       <div className="bg-white rounded-lg shadow-lg w-1/2 p-6">
//         <h2 className="text-2xl font-bold mb-4">{project.title}</h2>
//         <p className="text-lg mb-4">{project.description}</p>
//         <p className="text-lg font-semibold mb-4">Budget: ${project.budget}</p>
//         <div className="flex justify-between items-center">
//           <button
//             onClick={() => onApply(project)} 
//             className={`${
//               project.status === 'open'
//                 ? 'bg-green-500 hover:bg-green-600'
//                 : 'bg-red-500 hover:bg-red-600'
//             } text-white font-semibold py-2 px-4 rounded-lg`}
//             disabled={project.status !== 'open'}
//           >
//             {project.status === 'open' ? 'Apply' : 'Closed'}
//           </button>
//           <button
//             onClick={onClose}
//             className="ml-4 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

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

  // Fetch projects from the backend using axios GET request
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:1234/projects"); // Axios GET request to the backend
        if (response.status === 200) {
          setProjects(response.data.projects); // Assuming your API returns { projects: [...] }
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

  // Function to handle project application
  const handleApply = (project) => {
    // Here you can implement your apply logic, e.g., send an API request
    console.log(`Applied to project: ${project.title}`);

    // Show the success toast for 3 seconds
    setShowToast(true);

    // Close the modal after applying
    setSelectedProject(null);
  };

  // Helper function to limit description to 10 words
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

            {/* Scrollable Project List */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-y-auto h-[80vh]">  {/* Added scrolling */}
              {projects.map((project) => (
                <div
                  key={project._id}
                  className="border p-4 rounded-lg shadow-md bg-white cursor-pointer"
                  onClick={() => setSelectedProject(project)} // Open modal on click
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

      {/* Modal to show selected project details */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)} // Close modal when "Close" is clicked
          onApply={handleApply} // Apply logic
        />
      )}

      {/* Toast Notification */}
      {showToast && (
        <Toast
          message="Successfully applied!"
          onClose={() => setShowToast(false)} // Close toast after showing it
        />
      )}
    </div>
  );
};

export default Projectsection;
