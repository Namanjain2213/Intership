import React from 'react';
import { ChevronRight } from 'react-feather';

export function CompareAccuracyBoxes() {
    return (
        <div className='grid lg:grid-cols-3 gap-4 md:grid-cols-2 sm:grid-cols-1 w-full justify-center items-center'>
            <div className="bg-white md:h-[250px] md:w-[250px] sm:w-[300px] sm:h-[300px] rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Compare Accuracy</h3>
            </div>
            <div className="bg-white rounded-lg md:h-[250px] md:w-[250px] sm:w-[300px] sm:h-[300px] shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Compare Accuracy</h3>
            </div>
            <div className="bg-white rounded-lg md:h-[250px] md:w-[250px] sm:w-[300px] sm:h-[300px] shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Compare Accuracy</h3>
            </div>
        </div>
    );
}

