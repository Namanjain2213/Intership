"use client"

import { useState } from "react"
import Navbar from "./components/Navbar"
import ProfileSection from "./components/ProfileSection"
import EducationSection from "./components/EducationSection"
import SkillsSection from "./components/SkillsSection"
import ProjectsSection from "./components/ProjectsSection"
import AchievementsSection from "./components/AchievementsSection"
import ContactSection from "./components/ContactSection"

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("profile")

  const renderSection = () => {
    switch (activeSection) {
      case "profile":
        return <ProfileSection />
      case "education":
        return <EducationSection />
      case "skills":
        return <SkillsSection />
      case "projects":
        return <ProjectsSection />
      case "achievements":
        return <AchievementsSection />
      case "contact":
        return <ContactSection />
      default:
        return <ProfileSection />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">{renderSection()}</div>
      </main>
    </div>
  )
}
