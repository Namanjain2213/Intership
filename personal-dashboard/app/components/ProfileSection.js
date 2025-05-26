import Image from "next/image"
export default function ProfileSection() {
  return (
    <div className="p-8">
      <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
        {/* Profile Image */}
        <div className="flex-shrink-0">
         <Image
        src="/Naman passport image.png"
        alt="Naman Passport"
        width={300}
        height={300}
        className="rounded-full shadow-lg border-4 border-gray-200 object-cover"
      />
        </div>

        {/* Profile Info */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Naman Jain</h1>
          <p className="text-xl text-blue-600 mb-4">Full Stack Developer & Computer Science Student</p>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">About Me</h2>
            <p className="text-gray-600 leading-relaxed">
              Passionate computer science student with expertise in full-stack web development. Currently pursuing
              Master of Computer Application at GGSIPU with a strong foundation in modern web technologies including
              React.js, Node.js, and MongoDB. Experienced in building scalable web applications and always eager to
              learn new technologies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">1+</div>
              <div className="text-sm text-gray-600">Years Experience</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">10+</div>
              <div className="text-sm text-gray-600">Projects Completed</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">15+</div>
              <div className="text-sm text-gray-600">Technologies</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
