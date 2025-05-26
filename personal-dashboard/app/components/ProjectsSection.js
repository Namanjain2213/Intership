export default function ProjectsSection() {
  const projects = [
    {
      title: "Frosted Fantasy",
      description:
        "App Interface: Designed interactive screens for the cake ordering process, facilitating smoother transactions which contributed to a 15% increase in customer satisfaction.",
      technologies: ["React.js", "Node.js", "Express.js", "MongoDB"],
      features: [
        "Interactive cake ordering interface",
        "Smooth transaction processing",
        "Customer satisfaction tracking",
        "Real-time order management",
      ],
      type: "Web Application",
      status: "Completed",
    },
    {
      title: "Database Management System",
      description:
        "Database: Utilize MongoDB to store user information and manage orders efficiently, ensuring a reliable and scalable system for handling customer data.",
      technologies: ["MongoDB", "Node.js", "Express.js"],
      features: [
        "User information storage",
        "Order management system",
        "Scalable database design",
        "Data reliability and security",
      ],
      type: "Backend System",
      status: "Completed",
    },
    {
      title: "Admin Panel",
      description:
        "Admin Panel: Create a dedicated admin panel for the business owner to easily view, manage, and track all orders. The panel will allow the admin to add, update, and delete cake listings, ensuring smooth operation and inventory management.",
      technologies: ["React.js", "Node.js", "Express.js", "MongoDB"],
      features: [
        "Order tracking and management",
        "Inventory management",
        "CRUD operations for products",
        "Business analytics dashboard",
      ],
      type: "Admin Dashboard",
      status: "Completed",
    },
    {
      title: "BookBank Website",
      description:
        "User Interface: Designed a visually appealing, user-friendly website for seamless online book browsing and purchasing. Incorporating dark mode functionality to enhance user experience and provide theme customization based on user preferences.",
      technologies: ["React.js", "JavaScript", "Tailwind CSS"],
      features: [
        "Book browsing and search",
        "Dark mode functionality",
        "User-friendly interface",
        "Theme customization",
      ],
      type: "E-commerce Website",
      status: "Completed",
    },
    {
      title: "QR Code Generator",
      description:
        "User Interface: Designed and developed a clean, user-friendly web application enabling users to generate QR codes effortlessly. Features include a simple input field for URL entry, a one-click QR code generation button, and an intuitive interface for an efficient and seamless user experience.",
      technologies: ["JavaScript", "HTML", "CSS"],
      features: [
        "Simple URL input interface",
        "One-click QR generation",
        "Clean and intuitive design",
        "Efficient user experience",
      ],
      type: "Utility Application",
      status: "Completed",
    },
  ]

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Projects Portfolio</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-white to-gray-50 rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-800">{project.title}</h3>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">{project.status}</span>
              </div>

              <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>

              <div className="mb-4">
                <h4 className="font-semibold text-gray-700 mb-2">Key Features:</h4>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  {project.features.map((feature, featureIndex) => (
                    <li key={featureIndex}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                  {project.type}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, techIndex) => (
                  <span key={techIndex} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full border">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Want to see more projects?</h3>
          <p className="text-gray-600 mb-4">Check out my GitHub profile for additional projects and contributions.</p>
          <a
            href="https://github.com/namanjain"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                clipRule="evenodd"
              />
            </svg>
            View GitHub Profile
          </a>
        </div>
      </div>
    </div>
  )
}
