// import React from 'react';
import { MoreVertical } from 'lucide-react';
import { Teacher } from '../../types/teacher';

interface TeacherCardProps {
  teacher: Teacher;
  index: number;
}

const TeacherCard = ({ teacher, index }: TeacherCardProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img
          src={`https://i.pravatar.cc/150?img=${index + 10}`}
          alt={teacher.name}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <h4 className="font-medium text-white">{teacher.name}</h4>
          <p className="text-sm text-gray-400">{teacher.role}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className={`px-2 py-1 rounded-full text-xs ${
          teacher.status === 'Available' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
        }`}>
          {teacher.status}
        </span>
        <button className="text-gray-400 hover:text-gray-300">
          <MoreVertical size={16} />
        </button>
      </div>
    </div>
  );
};

export default TeacherCard;