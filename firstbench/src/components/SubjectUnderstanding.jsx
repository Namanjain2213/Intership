import React from 'react';

export function SubjectUnderstanding({ subjects }) {
  const getBackgroundColor = (category) => {
    return category === 'primary' 
      ? 'bg-teal-400 text-white'
      : 'bg-gray-200 text-gray-700';
  };

  return (
    <div className="h-[300px] p-1 bg-white rounded-lg w-[99%] shadow">
      <h3 className="text-lg font-semibold mb-4">Subject Understanding</h3>
      <div className="flex flex-wrap gap-2 ">
        {subjects.map((subject, index) => (
          <span
            key={index}
            className={`px-3 py-1 rounded-full text-sm ${getBackgroundColor(subject.category)}`}
          >
            {subject.name}
          </span>
        ))}
      </div>
    </div>
  );
}

