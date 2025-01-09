import React from 'react';
import { ExternalLink } from 'react-feather';

export function Revisit() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Revisit Paper</h3>
      <p className="text-sm text-gray-600 mb-4">
        Challenge your friends by simply sharing a link to this test
      </p>
      <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center">
        <ExternalLink className="w-4 h-4 mr-2" />
        Visit
      </button>
      <p className="text-xs text-gray-500 mt-2">
        Instructions for how to upload your handwritten material is given
      </p>
    </div>
  );
}

