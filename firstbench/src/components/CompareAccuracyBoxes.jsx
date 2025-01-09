import React from 'react';
import { ChevronRight } from 'react-feather';

export function CompareAccuracyBoxes() {
    return (
        <div className='grid lg:grid-cols-3 sm:gap-2 md:grid-cols-2 sm:grid-cols-1 w-full justify-center items-center'>
            <div className="bg-white h-[250px] w-[250px] sm:w-[300px] sm:h-[300px] rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Compare Accuracy</h3>
            </div>
            <div className="bg-white rounded-lg h-[250px] w-[250px] shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Compare Accuracy</h3>
            </div>
            <div className="bg-white rounded-lg h-[250px] w-[250px] shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Compare Accuracy</h3>
            </div>
        </div>
    );
}

