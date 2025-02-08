import { MoreVertical } from 'lucide-react';
import { Teacher } from '../../types/teacher';

interface TeacherCardProps {
  teacher?: Teacher | null;
  index: number;
}

const TeacherCard = ({ teacher, index }: TeacherCardProps) => {
  if (!teacher || Object.keys(teacher).length === 0)  {
    return (
      <div className="flex items-center justify-center text-gray-400 py-4">
        Teacher not found.
      </div>
    );
  }
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img
          src={teacher.url || `https://i.pravatar.cc/150?img=${index + 10}`}
          alt={teacher.name}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <h4 className="font-medium text-white">{teacher.name}</h4>
          <p className="text-sm text-gray-400">{teacher.subject}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className={`px-2 py-1 rounded-full text-xs ${teacher.employeeNo === 'Available' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
          }`}>
          {teacher.employeeNo}
        </span>
        <button className="text-gray-400 hover:text-gray-300">
          <MoreVertical size={16} />
        </button>
      </div>
    </div>
  );
};

export default TeacherCard;