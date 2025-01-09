import React from 'react';

export function ResponseTime({ percentage, timeInMinutes }) {
  return (
    <div className="bg-white rounded-lg shadow w-[99%] h-[300px] p-1">
      <h3 className="text-lg font-semibold mb-4">Response Time</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="bg-purple-100 px-3 py-1 rounded-md text-sm">
            Set Time = {timeInMinutes}min
          </div>
        </div>
        <div className="relative pt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-3xl font-bold text-teal-400">{percentage}%</span>
            <span className="flex items-center text-red-500">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              {timeInMinutes}min
            </span>
          </div>
          <div className="text-sm text-gray-500">Ans took</div>
        </div>
        <div className="text-center mt-4">
          <span className="text-red-500 font-medium">You are slow !</span>
        </div>
      </div>
    </div>
  );
}

