import React from 'react';
import { Edit2, Trash2, User } from 'lucide-react';
import { Student } from '../../types/student';
import { useStudents } from '../../hooks/useStudent';

interface StudentTableProps {
    onEdit: (student: Student) => void;
}

const StudentTable: React.FC<StudentTableProps> = ({ onEdit }) => {
    const { students, deleteStudent } = useStudents();

    return (
        <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
                <thead>
                    <tr className="text-left">
                        <th className="pb-4 text-sm font-medium text-gray-400">Student Name</th>
                        <th className="pb-4 text-sm font-medium text-gray-400">Parent's Name</th>
                        <th className="pb-4 text-sm font-medium text-gray-400">Parent's Phone</th>
                        <th className="pb-4 text-sm font-medium text-gray-400">Address</th>
                        <th className="pb-4 text-sm font-medium text-gray-400">Grade</th>
                        <th className="pb-4 text-sm font-medium text-gray-400">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-sm">
                    {students.map((student) => (
                        <tr key={student.id} className="border-t border-gray-700">
                            <td className="py-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-[#252d3d] rounded-lg">
                                        <User size={16} className="text-violet-400" />
                                    </div>
                                    <span className="text-white">{student.name}</span>
                                </div>
                            </td>
                            <td className="py-4 text-gray-300">{student.parentName}</td>
                            <td className="py-4 text-gray-300">{student.parentPhone}</td>
                            <td className="py-4 text-gray-300">{student.address}</td>
                            <td className="py-4 text-gray-300">{student.grade}</td>
                            <td className="py-4">
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => onEdit(student)}
                                        className="p-1.5 hover:bg-[#252d3d] rounded-lg text-blue-400 hover:text-blue-300"
                                    >
                                        <Edit2 size={16} />
                                    </button>
                                    <button
                                        onClick={() => deleteStudent(student.id)}
                                        className="p-1.5 hover:bg-[#252d3d] rounded-lg text-red-400 hover:text-red-300"
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

export default StudentTable;