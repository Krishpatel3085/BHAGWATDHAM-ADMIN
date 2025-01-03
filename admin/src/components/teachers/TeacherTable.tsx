import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { useTeachers } from '../../hooks/useTeachers';
import { Teacher } from '../../types/teacher';

interface TeacherTableProps {
    onEdit: (teacher: Teacher) => void;
}

const TeacherTable: React.FC<TeacherTableProps> = ({ onEdit }) => {
    const { teachers, deleteTeacher } = useTeachers();

    return (
        <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
                <thead>
                    <tr className="border-b border-gray-700">
                        <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">Name</th>
                        <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">Employee No.</th>
                        <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">Address</th>
                        <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">Salary</th>
                        <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {teachers.map((teacher) => (
                        <tr key={teacher.id} className="border-b border-gray-700/50 hover:bg-[#252d3d]">
                            <td className="py-4 px-4 text-white">{teacher.name}</td>
                            <td className="py-4 px-4 text-gray-300">{teacher.employeeNo}</td>
                            <td className="py-4 px-4 text-gray-300">{teacher.address}</td>
                            <td className="py-4 px-4 text-gray-300">${teacher.salary}</td>
                            <td className="py-4 px-4">
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => onEdit(teacher)}
                                        className="p-1.5 hover:bg-[#1e2746] rounded-lg text-blue-400 hover:text-blue-300"
                                    >
                                        <Edit2 size={16} />
                                    </button>
                                    <button
                                        onClick={() => deleteTeacher(teacher.id)}
                                        className="p-1.5 hover:bg-[#1e2746] rounded-lg text-red-400 hover:text-red-300"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TeacherTable;