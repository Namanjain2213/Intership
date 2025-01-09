// import React from 'react';
// import { Clock } from 'react-feather';

// export function Suggestions() {
//   const suggestions = [
//     { time: '40sec', difficulty: 'Easy', color: 'bg-green-100 text-green-800' },
//     { time: '1.5min', difficulty: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
//     { time: '3min', difficulty: 'Hard', color: 'bg-red-100 text-red-800' },
//   ];

//   return (
//     <div className="bg-white rounded-lg shadow w-[99%] h-[300px] p-1">
//       <h3 className="text-lg font-semibold mb-4">Suggestions</h3>
//       <div className="flex flex-wrap gap-4">
//         {suggestions.map((suggestion, index) => (
//           <div key={index} className={`flex items-center ${suggestion.color} rounded-full px-3 py-1`}>
//             <Clock className="w-4 h-4 mr-2" />
//             <span className="font-medium">{suggestion.time}</span>
//             <span className="ml-2">{suggestion.difficulty}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
import React from 'react';
import { Clock } from 'react-feather';

export function Suggestions() {
  const suggestions = [
    { time: '40sec', count: 'Q-1:12', difficulty: 'Easy', color: 'bg-green-100 text-green-800' },
    { time: '1.5min', count: 'Q-12:32', difficulty: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
    { time: '3min', count: 'Q-32:40', difficulty: 'Hard', color: 'bg-red-100 text-red-800' },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Suggestions</h3>
      <div className="grid gird-col-3 space-y-3">
        {suggestions.map((suggestion, index) => (
          <div key={index} className="grid grid-col-3 items-center justify-between">
              <div className="text-sm bg-indigo-950 text-white ">{suggestion.count}</div>
              <div className={`flex items-center bg-slate-400 border-2 border-dashed px-1 py-3`}>
                <span className="font-medium">{suggestion.time}</span>
              </div>
              <div className={`text-${suggestion.color} font-medium`}>{suggestion.difficulty}</div>
            </div>
        ))}
      </div>
    </div>
  );
}


