import React from 'react'

const ProjectModal = () => {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-1/2 p-6">
        <h2 className="text-2xl font-bold mb-4">{project.title}</h2>
        <p className="text-lg mb-4">{project.description}</p>
        <p className="text-lg font-semibold mb-4">Budget: ${project.budget}</p>
        <div className="flex justify-between items-center">
          <button
            onClick={() => onApply(project)} 
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
  )
}

export default ProjectModal