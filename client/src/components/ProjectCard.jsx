export default function ProjectCard({title, budget, description}){
    return (
      <div  className="bg-white p-6 rounded-lg shadow-md">
                  <div className="w-full h-32 bg-gray-200 mb-4"></div>
                  <h2 className="text-xl font-semibold">Title : {title}</h2>
                  <p className="text-gray-600">Price: ₹{budget}</p>
                  <p className="text-gray-600">
                    Description: {description}
                  </p>
      </div>
    )
  }