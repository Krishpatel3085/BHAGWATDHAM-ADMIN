// import React from 'react';
import { useStudents } from '../../hooks/useStudent';

const StudentDistribution = () => {
  const { male, female } = useStudents();
  const totalStudents = male + female;
  const malePercentage = totalStudents > 0 ? (male / totalStudents) * 100 : 0;

  return (
    <div className="bg-[#1e2746] p-6 rounded-xl">
      <h3 className="text-lg font-semibold mb-4 text-white">Students</h3>
      <div className="relative h-64 flex items-center justify-center">
        <div className="w-48 h-48 rounded-full border-8 border-blue-500/50 relative">
          <div
            className="absolute inset-0 rounded-full border-8 border-yellow-500/50"
            style={{
              clipPath: `polygon(0 0, 100% 0, 100% ${malePercentage}%, 0 ${malePercentage}%)`
            }}
          />
        </div>
        <div className="absolute flex w-full justify-around mt-56">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-400">{male}</p>
            <p className="text-sm text-gray-400">Male Students</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-400">{female}</p>
            <p className="text-sm text-gray-400">Female Students</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDistribution;