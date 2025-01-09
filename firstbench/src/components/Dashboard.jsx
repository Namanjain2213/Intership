import React from 'react';
import { NavBar } from './NavBar';
import { ScoreCard } from './ScoreCard';
import { SubjectUnderstanding } from './SubjectUnderstanding';
import { ResponseTime } from './ResponseTime';
import { CompareAccuracy } from './CompareAccuracy';
import { TimeTaken } from './TimeTaken';
import { CompareAccuracyBoxes } from './CompareAccuracyBoxes';
import { ApproachData } from './ApproachData';
import { Suggestions } from './Suggestions';
import { Revisit } from './Revisit';

const subjects = [
  { name: "Geography", category: "primary" },
  { name: "Politics", category: "primary" },
  { name: "Current Affairs", category: "primary" },
  { name: "General Studies", category: "secondary" },
  { name: "Mathematics", category: "primary" },
  { name: "Social Studies", category: "secondary" },
  { name: "English Literature", category: "secondary" },
  { name: "Indian History", category: "secondary" },
  { name: "Economics", category: "primary" },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="  py-2 px-1 sm:px-6 lg:px-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-1">
          <div className="space-y-6 w-fit">
            <ScoreCard
              score={136}
              total={240}
              accuracy={76}
              topScore={230}
              userName="Parth Avotkar"
            />
            <Revisit />
          </div>
          <div className="space-y-6 w-fit lg:ml-[-250px] sm:ml-[50px]">
            <CompareAccuracyBoxes />
            <div className='grid md:grid-cols-2 gap-1 sm:grid-cols-1 lg:grid-cols-4 w-full mt-4 '>
              <SubjectUnderstanding subjects={subjects} />
              <ResponseTime percentage={60} timeInMinutes={2} />
              <ApproachData />
              <Suggestions />
            </div>
            <div className='grid lg:grid-cols-2 mt-4 gap-2'>
              <CompareAccuracy />
              <TimeTaken />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

