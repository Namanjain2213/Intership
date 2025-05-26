export default function EducationSection() {
  const education = [
    {
      institution: "University School of Information, Communication and Technology, GGSIPU",
      degree: "Master of Computer Application (CGPA - 8.5)",
      duration: "2023 - 2025",
      location: "Delhi, India",
      type: "current",
    },
    {
      institution: "ISBA Institute Of Professional Studies",
      degree: "Bachelor of Computer Application (Percentage - 74)",
      duration: "2020 - 2023",
      location: "Indore, India",
      type: "completed",
    },
  ]

  const certifications = [
    {
      title: "Web Development Bootcamp",
      provider: "TECH ALPHA",
      description: "Completed a comprehensive Web Development Bootcamp focused on HTML, CSS, JAVASCRIPT.",
    },
  ]

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Education & Certifications</h2>

      {/* Education */}
      <div className="mb-12">
        <h3 className="text-2xl font-semibold text-gray-700 mb-6 flex items-center">
          <span className="mr-3">🎓</span>
          Academic Background
        </h3>
        <div className="space-y-6">
          {education.map((edu, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border-l-4 border-blue-500"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                <div className="flex-1">
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">{edu.institution}</h4>
                  <p className="text-lg text-blue-600 mb-2">{edu.degree}</p>
                  <p className="text-gray-600">{edu.location}</p>
                </div>
                <div className="mt-4 md:mt-0 md:text-right">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      edu.type === "current" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {edu.duration}
                  </span>
                  {edu.type === "current" && <p className="text-sm text-green-600 mt-1">Currently Pursuing</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div>
        <h3 className="text-2xl font-semibold text-gray-700 mb-6 flex items-center">
          <span className="mr-3">📜</span>
          Training & Certifications
        </h3>
        <div className="space-y-4">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border-l-4 border-purple-500"
            >
              <h4 className="text-lg font-semibold text-gray-800 mb-2">{cert.title}</h4>
              <p className="text-purple-600 font-medium mb-2">{cert.provider}</p>
              <p className="text-gray-600">{cert.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
