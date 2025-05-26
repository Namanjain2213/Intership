export default function SkillsSection() {
  const skillCategories = [
    {
      title: "Programming Languages",
      icon: "💻",
      skills: [
        { name: "C++", level: 85 },
        { name: "Python", level: 80 },
        { name: "JavaScript", level: 90 },
        { name: "SQL", level: 75 },
      ],
    },
    {
      title: "Web Development",
      icon: "🌐",
      skills: [
        { name: "HTML", level: 95 },
        { name: "CSS", level: 90 },
        { name: "React.js", level: 85 },
        { name: "Node.js", level: 80 },
        { name: "Express.js", level: 75 },
        { name: "MongoDB", level: 70 },
      ],
    },
    {
      title: "Tools & Platforms",
      icon: "🛠️",
      skills: [
        { name: "VS Code", level: 90 },
        { name: "Git", level: 85 },
        { name: "GitHub", level: 85 },
        { name: "Netlify", level: 80 },
        { name: "Vercel", level: 80 },
        { name: "Postman", level: 75 },
      ],
    },
    {
      title: "Frameworks & Libraries",
      icon: "📚",
      skills: [
        { name: "Tailwind CSS", level: 85 },
        { name: "Bootstrap", level: 80 },
        { name: "Next.js", level: 75 },
        { name: "jQuery", level: 70 },
      ],
    },
  ]

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Technical Skills</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {skillCategories.map((category, index) => (
          <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <span className="mr-3 text-2xl">{category.icon}</span>
              {category.title}
            </h3>
            <div className="space-y-4">
              {category.skills.map((skill, skillIndex) => (
                <div key={skillIndex}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700 font-medium">{skill.name}</span>
                    <span className="text-sm text-gray-500">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Additional Skills */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <span className="mr-3">🎯</span>
          Other Competencies
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            "Problem Solving",
            "Team Collaboration",
            "Project Management",
            "Software Testing",
            "Database Design",
            "API Development",
            "Responsive Design",
            "Version Control",
          ].map((skill, index) => (
            <div key={index} className="bg-white rounded-lg p-3 text-center shadow-sm">
              <span className="text-gray-700 font-medium">{skill}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
