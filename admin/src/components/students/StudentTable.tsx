import React from 'react';
import { User } from 'lucide-react';
import { Student } from '../../types/student';
import { useStudents } from '../../hooks/useStudent';

interface StudentTableProps {
    onEdit: (student: Student) => void;
}

const StudentTable: React.FC<StudentTableProps> = () => {
    const { students } = useStudents();

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
                            <td className="py-4 text-gray-300">
                                {student.address.length > 15 ? `${student.address.slice(0, 15)}...` : student.address}
                            </td>
                            <td className="py-4 text-gray-300">{student.grade}</    td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StudentTable;