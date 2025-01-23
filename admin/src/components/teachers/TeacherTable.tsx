import React from 'react';
import { User, UserCheck } from 'lucide-react';
import { useTeachers } from '../../hooks/useTeachers';
import { Teacher } from '../../types/teacher';

interface TeacherTableProps {
    onEdit: (teacher: Teacher) => void;
    onAttendance: (teacher: Teacher) => void;
}

const TeacherTable: React.FC<TeacherTableProps> = ({ onAttendance }) => {
    const { teachers } = useTeachers();

    return (
        <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
                <thead>
                    <tr className="border-b border-gray-700">
                        <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">Name</th>
                        <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">Employee No.</th>
                        <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">Address</th>
                        <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">Subject</th>
                        <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">Salary</th>
                        <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {teachers.map((teacher) => (
                        <tr key={teacher.id} className="border-b border-gray-700/50 hover:bg-[#252d3d]">
                            <td className="py-4 px-4 text-white">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-[#252d3d] rounded-lg">
                                        <User size={16} className="text-violet-400" />
                                    </div>
                                    <span className="text-white">{teacher.name}</span>
                                </div>
                            </td>
                            <td className="py-4 px-4 text-gray-300">{teacher.employeeNo}</td>
                            <td className="py-4 px-4 text-gray-300">
                                {teacher.address.length > 15 ? `${teacher.address.slice(0, 15)}...` : teacher.address}
                            </td>

                            <td className="py-4 px-4 text-gray-300"> {teacher.subject} </td>
                            <td className="py-4 px-4 text-gray-300">${teacher.salary}</td>
                            <td className="py-4 px-4">
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => onAttendance(teacher)}
                                        className="p-1.5 hover:bg-[#1e2746] rounded-lg text-green-400 hover:text-green-300"
                                        title="Mark Attendance"
                                    >
                                        <UserCheck size={16} />
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