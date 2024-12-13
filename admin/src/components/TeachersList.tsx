// import React from 'react';
import TeacherCard from './teachers/TeacherCard';
import { Teacher } from '../types/teacher';

const teachers: Teacher[] = [
  { name: 'Mr. Jay Soni', role: 'M.A, B.Ed', status: 'Available' },
  { name: 'Ms. Sarah Smith', role: 'M.A, M.Ed', status: 'Absent' },
  { name: 'Ms. Megha Hindi', role: 'B.Ed', status: 'Available' },
  { name: 'Mr. John Doe', role: 'M.A, B.Ed', status: 'Available' },
  { name: 'Mr. Jacob Ryan', role: 'M.Ed', status: 'Absent' },
];

const TeachersList = () => {
  return (
    <div className="bg-[#1e2746] rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-white">Teacher List</h3>
        <button className="text-sm text-blue-400 hover:text-blue-300">View All</button>
      </div>
      <div className="space-y-4">
        {teachers.map((teacher, index) => (
          <TeacherCard key={index} teacher={teacher} index={index} />
        ))}
      </div>
    </div>
  );
};

export default TeachersList;