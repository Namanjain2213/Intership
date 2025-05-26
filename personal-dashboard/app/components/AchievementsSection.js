export default function AchievementsSection() {
  const achievements = [
    {
      title: "NIMCET Exam Achievement",
      description: "Secured 813 rank in the NIMCET Exam",
      icon: "🏆",
      category: "Academic",
      year: "2023",
      details: "National level entrance examination for Master of Computer Applications (MCA) admission",
    },
  ]

  const goals = [
    {
      title: "Full Stack Mastery",
      description: "Become proficient in advanced full-stack development with cloud technologies",
      icon: "🎯",
      timeline: "2024-2025",
    },
    {
      title: "Open Source Contribution",
      description: "Contribute to major open-source projects and build a strong GitHub profile",
      icon: "🌟",
      timeline: "Ongoing",
    },
    {
      title: "Industry Internship",
      description: "Secure a software development internship at a leading tech company",
      icon: "💼",
      timeline: "2024",
    },
    {
      title: "Technical Certifications",
      description: "Obtain industry-recognized certifications in cloud computing and DevOps",
      icon: "📜",
      timeline: "2024-2025",
    },
  ]

  const hobbies = [
    { name: "Coding", icon: "💻", description: "Building personal projects and exploring new technologies" },
    { name: "Problem Solving", icon: "🧩", description: "Participating in coding challenges and algorithmic problems" },
    { name: "Learning", icon: "📚", description: "Staying updated with latest tech trends and frameworks" },
    { name: "Gaming", icon: "🎮", description: "Strategy and puzzle games for logical thinking" },
  ]

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Achievements & Goals</h2>

      {/* Achievements */}
      <div className="mb-12">
        <h3 className="text-2xl font-semibold text-gray-700 mb-6 flex items-center">
          <span className="mr-3">🏆</span>
          Achievements
        </h3>
        <div className="space-y-4">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-6 border-l-4 border-yellow-500"
            >
              <div className="flex items-start space-x-4">
                <div className="text-3xl">{achievement.icon}</div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-xl font-semibold text-gray-800">{achievement.title}</h4>
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">
                      {achievement.year}
                    </span>
                  </div>
                  <p className="text-lg text-orange-600 font-medium mb-2">{achievement.description}</p>
                  <p className="text-gray-600">{achievement.details}</p>
                  <span className="inline-block mt-2 px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded">
                    {achievement.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Goals */}
      <div className="mb-12">
        <h3 className="text-2xl font-semibold text-gray-700 mb-6 flex items-center">
          <span className="mr-3">🎯</span>
          Future Goals
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {goals.map((goal, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200"
            >
              <div className="flex items-start space-x-3">
                <div className="text-2xl">{goal.icon}</div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">{goal.title}</h4>
                  <p className="text-gray-600 mb-3">{goal.description}</p>
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                    {goal.timeline}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hobbies & Interests */}
      <div>
        <h3 className="text-2xl font-semibold text-gray-700 mb-6 flex items-center">
          <span className="mr-3">🎨</span>
          Hobbies & Interests
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {hobbies.map((hobby, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 text-center border border-purple-200"
            >
              <div className="text-3xl mb-2">{hobby.icon}</div>
              <h4 className="font-semibold text-gray-800 mb-2">{hobby.name}</h4>
              <p className="text-sm text-gray-600">{hobby.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
