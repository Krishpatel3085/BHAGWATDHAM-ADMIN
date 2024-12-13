import React from 'react';

const StudentDistribution = () => {
  const total = 3903;
  const male = 2078;
  const female = 1825;
  const malePercentage = (male / total) * 100;
  
  return (
    <div className="bg-white p-6 rounded-xl">
      <h3 className="text-lg font-semibold mb-4">Students</h3>
      <div className="relative h-64 flex items-center justify-center">
        <div className="w-48 h-48 rounded-full border-8 border-blue-500 relative">
          <div 
            className="absolute inset-0 rounded-full border-8 border-yellow-500"
            style={{
              clipPath: `polygon(0 0, 100% 0, 100% ${malePercentage}%, 0 ${malePercentage}%)`
            }}
          />
        </div>
        <div className="absolute flex w-full justify-around mt-56">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-500">{male}</p>
            <p className="text-sm text-gray-600">Male Students</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-500">{female}</p>
            <p className="text-sm text-gray-600">Female Students</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDistribution;