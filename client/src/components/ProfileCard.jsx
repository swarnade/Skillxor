import React from 'react'
import {  X } from 'lucide-react';

const ProfileCard = ({ name, description }) => {
    console.log('ProfileCard props:', { name, description });

    return <div className="bg-white border border-gray-200 rounded-lg p-4 relative">
                <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
                    <X size={20} />
                </button>
                <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg" />
                        <div className="flex-grow">
                            <h2 className="text-lg font-semibold mb-2">{name}</h2>
                            <p className="text-gray-600 text-sm mb-3">{description}</p>
                            <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-sm hover:bg-gray-300">
                                View Profile
                            </button>
                        </div>
                </div>
            </div>
}

export default ProfileCard