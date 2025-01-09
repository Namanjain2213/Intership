import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { slot: 1, accuracy: 80 },
  { slot: 2, accuracy: 45 },
  { slot: 3, accuracy: 35 },
  { slot: 4, accuracy: 65 },
  { slot: 5, accuracy: 55 },
  { slot: 6, accuracy: 45 },
  { slot: 7, accuracy: 70 },
];

export function CompareAccuracy() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Compare Accuracy</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="slot" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="accuracy" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

