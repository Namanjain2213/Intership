export default function ContactSection() {
  const contactInfo = [
    {
      type: "Phone",
      value: "+91-6264339060",
      icon: "📞",
      href: "tel:+916264339060",
      color: "green",
    },
    {
      type: "Email",
      value: "nj626433@gmail.com",
      icon: "📧",
      href: "mailto:nj626433@gmail.com",
      color: "blue",
    },
    {
      type: "LinkedIn",
      value: "https://www.linkedin.com/in/naman-jain-bb3969286",
      icon: "💼",
      href: "https://www.linkedin.com/in/naman-jain-bb3969286",
      color: "indigo",
    },
    {
      type: "GitHub",
      value: "https://github.com/Namanjain2213",
      icon: "💻",
      href: "https://github.com/Namanjain2213",
      color: "gray",
    },
  ]

  const quickFacts = [
    { label: "Location", value: "Delhi, India", icon: "📍" },
    { label: "Availability", value: "Open to Opportunities", icon: "✅" },
    { label: "Preferred Role", value: "Full Stack Developer", icon: "👨‍💻" },
    { label: "Experience Level", value: "Entry to Mid Level", icon: "📈" },
  ]

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Get In Touch</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Information */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-6 flex items-center">
            <span className="mr-3">📞</span>
            Contact Information
          </h3>
          <div className="space-y-4">
            {contactInfo.map((contact, index) => (
              <a
                key={index}
                href={contact.href}
                target={contact.type === "LinkedIn" || contact.type === "GitHub" ? "_blank" : undefined}
                rel={contact.type === "LinkedIn" || contact.type === "GitHub" ? "noopener noreferrer" : undefined}
                className={`block bg-gradient-to-r from-${contact.color}-50 to-${contact.color}-100 rounded-lg p-4 border-l-4 border-${contact.color}-500 hover:shadow-md transition-shadow duration-200`}
              >
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">{contact.icon}</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{contact.type}</h4>
                    <p className={`text-${contact.color}-600`}>{contact.value}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Quick Facts */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-6 flex items-center">
            <span className="mr-3">ℹ️</span>
            Quick Facts
          </h3>
          <div className="space-y-4">
            {quickFacts.map((fact, index) => (
              <div key={index} className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4">
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">{fact.icon}</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{fact.label}</h4>
                    <p className="text-gray-600">{fact.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg p-8 text-center text-white">
        <h3 className="text-2xl font-bold mb-4">Let's Work Together!</h3>
        <p className="text-lg mb-6 opacity-90">
          I'm always interested in new opportunities and exciting projects. Feel free to reach out if you'd like to
          collaborate or just have a chat about technology!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="mailto:nj26431@gmail.com"
            className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
          >
            <span className="mr-2">📧</span>
            Send Email
          </a>
          <a
            href="https://linkedin.com/in/naman-jain"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition-colors duration-200"
          >
            <span className="mr-2">💼</span>
            Connect on LinkedIn
          </a>
        </div>
      </div>

      {/* Download Resume */}
      <div className="mt-8 text-center">
        <div className="bg-gray-50 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">Want to know more?</h4>
          <p className="text-gray-600 mb-4">
            Download my complete resume for detailed information about my experience and qualifications.
          </p>
          <button className="inline-flex items-center px-6 py-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors duration-200">
            <a href="https://drive.google.com/file/d/1oEN8geDYNTzTifLfZDJlRjWbBYTfKyU0/view?usp=drivesdk" target="_blank"> <span className="mr-2">📄</span>Download Resume </a>
          </button>
        </div>
      </div>
    </div>
  )
}
