import TeacherCard from './teachers/TeacherCard';
import { Teacher } from '../types/teacher';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { APi_URL } from '../Server';


const TeachersList = () => {
  const [teachers, useTeacher] = useState<Teacher[]>([]);
  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const response = await axios.get(APi_URL + 'teacher/getAllTeacher');
        const data = response.data;
        console.log("All Teachers:", data.teachers);
        useTeacher(data.teachers);
      } catch (error) {
        console.error("Error fetching teachers:", error); // Handle errors
      }
    };

    fetchTeacher();
  }, []);
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