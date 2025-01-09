import React from 'react';
import mp from '../assets/mp.jpg'
import result from '../assets/result.jpg'
export function ScoreCard({ score, total, accuracy, topScore, userName }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md mx-auto">
      <div className="flex items-center justify-center mb-8">
        <img src={result} alt="Result" className="w-32 h-32" />
        <h2 className="text-2xl font-bold text-purple-600 ml-4">Your Result!</h2>
      </div>
      
      <div className="bg-purple-50 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <div className="bg-purple-100 p-2 rounded-lg">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <span className="text-sm font-medium">YOU'VE PASSED!</span>
              <div className="flex items-baseline">
                <span className="text-2xl font-bold">{score}</span>
                <span className="text-gray-500 ml-1">/{total}</span>
              </div>
            </div>
          </div>
          <div className="bg-teal-400 text-white px-2 py-1 rounded text-sm">
            {accuracy}% ACCURACY
          </div>
        </div>
      </div>

      <div className="border-t pt-4 mb-6">
        <div className="flex items-center mb-2">
          <img src={mp} alt="User" className="w-10 h-10 rounded-full" />
          <div className="ml-3">
            <div className="text-sm text-gray-500">Top Score</div>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold">{topScore}</span>
              <span className="text-gray-500 ml-1">/{total}</span>
            </div>
          </div>
        </div>
        <div className="text-sm text-gray-500">By {userName}</div>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="font-semibold">Improve your Marks</h3>
          <p className="text-sm text-gray-500">Improve your score by practicing more.</p>
        </div>
        <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
          Practice more
        </button>
      </div>
    </div>
  );
}

