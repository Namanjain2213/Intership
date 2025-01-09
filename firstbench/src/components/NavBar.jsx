import React, { useState } from 'react';
import { Bell, Home, Users, MessageSquare, Zap, BarChart2, FileText, Menu } from 'react-feather';

export function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <div className="text-teal-400 text-2xl font-bold flex items-center">
            <div className="w-8 h-8 mr-2">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            Firstbench
          </div>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          <button className="flex items-center text-white hover:text-teal-400">
            <Home className="w-4 h-4 mr-2" />
            Dashboard
          </button>
          <button className="flex items-center text-white hover:text-teal-400">
            <Users className="w-4 h-4 mr-2" />
            FirstGuru
          </button>
          <button className="flex items-center text-white hover:text-teal-400">
            <MessageSquare className="w-4 h-4 mr-2" />
            TownHall
          </button>
          <button className="flex items-center text-white hover:text-teal-400">
            <Zap className="w-4 h-4 mr-2" />
            AI Evaluation
          </button>
          <button className="flex items-center text-white hover:text-teal-400">
            <BarChart2 className="w-4 h-4 mr-2" />
            Performance
          </button>
          <button className="flex items-center text-teal-400">
            <FileText className="w-4 h-4 mr-2" />
            Mock Test
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <Bell className="w-6 h-6" />
          <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden mt-4">
          <button className="block w-full text-left py-2 px-4 text-white hover:bg-gray-800">
            <Home className="w-4 h-4 inline mr-2" />
            Dashboard
          </button>
          <button className="block w-full text-left py-2 px-4 text-white hover:bg-gray-800">
            <Users className="w-4 h-4 inline mr-2" />
            FirstGuru
          </button>
          <button className="block w-full text-left py-2 px-4 text-white hover:bg-gray-800">
            <MessageSquare className="w-4 h-4 inline mr-2" />
            TownHall
          </button>
          <button className="block w-full text-left py-2 px-4 text-white hover:bg-gray-800">
            <Zap className="w-4 h-4 inline mr-2" />
            AI Evaluation
          </button>
          <button className="block w-full text-left py-2 px-4 text-white hover:bg-gray-800">
            <BarChart2 className="w-4 h-4 inline mr-2" />
            Performance
          </button>
          <button className="block w-full text-left py-2 px-4 text-teal-400 hover:bg-gray-800">
            <FileText className="w-4 h-4 inline mr-2" />
            Mock Test
          </button>
        </div>
      )}
    </nav>
  );
}

