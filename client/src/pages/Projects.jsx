import React from 'react';

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/5 bg-white p-6 shadow-md">
        <div className="mb-8">
          <h1 className="text-lg font-bold">My Projects</h1>
        </div>
        <div className="mb-8">
          <button className="flex items-center w-full p-3 bg-blue-200 text-blue-700 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 10h16M4 14h16M4 18h16"
              />
            </svg>
            Applicants
          </button>
        </div>
        <div>
          <button className="flex items-center w-full p-3 bg-blue-200 text-blue-700 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 10h16M4 14h16M4 18h16"
              />
            </svg>
            Settings
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-10">
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
          {Array(6)
            .fill(0)
            .map((_, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-full h-32 bg-gray-200 mb-4"></div>
                <h2 className="text-xl font-semibold">Title</h2>
                <p className="text-gray-600">Price: $45</p>
                <p className="text-gray-600">
                  Description: hi there this project is for all app developer there.
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
