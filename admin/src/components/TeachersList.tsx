import TeacherCard from './teachers/TeacherCard';
import { Teacher } from '../types/teacher';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { APi_URL } from '../Server';

interface TeachersListProps {
  setTeacherCount: (count: number) => void; // Explicit type for the callback
}

const TeachersList: React.FC<TeachersListProps> = ({ setTeacherCount }) => {
  const [teachers, useTeacher] = useState<Teacher[]>([]);
  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const response = await axios.get(APi_URL + 'teacher/getAllTeacher');
        const data = response.data;
        console.log("All Teachers:", data.teachers);
        useTeacher(data.teachers);
        setTeacherCount(data.teachers.length)
      } catch (error) {
        console.error("Error fetching teachers:", error); 
      }
    };

    fetchTeacher();
  }, [setTeacherCount]);
  return (
    <div className="bg-[#1e2746] rounded-xl p-6">
    <div className="flex items-center justify-between mb-6">
      <h3 className="font-semibold text-white">Teacher List</h3>
        <button className="text-sm text-blue-400 hover:text-blue-300">View All</button>
    </div>
  
    <div className="space-y-4">
      {teachers.length > 0 ? (
        teachers.map((teacher, index) => (
          <TeacherCard key={index} teacher={teacher} index={index} />
        ))
      ) : (
        <div className="flex items-center justify-center text-gray-400 py-4">
          Teacher not found.
        </div>
      )}
    </div>
  </div>
  
  );
};

export default TeachersList;