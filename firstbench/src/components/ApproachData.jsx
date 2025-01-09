// import React from 'react';
// import { Info } from 'react-feather';

// export function ApproachData() {
//   const approaches = [
//     { label: 'Based on Facts', percentage: 25, color: 'bg-blue-500' },
//     { label: 'Based on Analysis', percentage: 32, color: 'bg-green-500' },
//     { label: 'Based on Elimination', percentage: 19, color: 'bg-yellow-500' },
//     { label: 'Based on Guess', percentage: 24, color: 'bg-red-500' },
//   ];

//   return (
//     <div className="bg-white rounded-lg shadow w-[99%] h-[300px] p-1">
//       <h3 className="text-lg font-semibold mb-4 flex items-center">
//         Approach Data
//         <Info className="w-4 h-4 ml-2 text-gray-400" />
//       </h3>
//       <div className="space-y-4">
//         {approaches.map((approach, index) => (
//           <div key={index} className="flex items-center">
//             <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
//               <div className={`${approach.color} h-2.5 rounded-full`} style={{ width: `${approach.percentage}%` }}></div>
//             </div>
//             <span className="text-sm font-medium text-gray-700 w-6">{approach.percentage}%</span>
//             <span className="text-sm text-gray-600 ml-2">{approach.label}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
import React from 'react';
import { Info } from 'react-feather';

export function ApproachData() {
  const approaches = [
    { label: 'Based on Facts', percentage: 25, color: 'bg-blue-400' },
    { label: 'Based on Analysis', percentage: 32, color: 'bg-purple-400' },
    { label: 'Based on Elimination', percentage: 19, color: 'bg-yellow-400' },
    { label: 'Based on Guess', percentage: 24, color: 'bg-red-400' },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          Approach Data
          <Info className="w-4 h-4 ml-2 text-gray-400" />
        </h3>
      </div>
      <div className="space-y-4">
        {approaches.map((approach, index) => (
          <div key={index} className="flex items-center">
            <div className="w-8 text-right mr-2 text-sm font-medium text-gray-700">{approach.percentage}%</div>
            <div className="flex-grow">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className={`${approach.color} h-2 rounded-full`} style={{ width: `${approach.percentage}%` }}></div>
              </div>
            </div>
            <div className="w-32 text-sm text-gray-600 ml-2">{approach.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}


