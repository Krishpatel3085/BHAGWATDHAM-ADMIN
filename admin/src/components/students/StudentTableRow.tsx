import React from 'react';
import { FileText } from 'lucide-react';
import { Student } from '../../types/student';

interface StudentTableRowProps {
    student: Student;
}

const StudentTableRow: React.FC<StudentTableRowProps> = ({ student }) => {
    return (
        <tr className="border-t border-gray-700">
            <td className="py-4">
                <div className="flex items-center gap-3">
                    <img
                        src={student.url ||`https://i.pravatar.cc/150?img=${parseInt(student.id) + 20}`}
                        alt={student.name}
                        className="w-10 h-10 rounded-full object-cover"
                    />
                    <span className="text-white">{student.name}</span>
                </div>
            </td>
            <td className="py-4 text-gray-300">{student.parentPhone}</td>
            <td className="py-4 text-gray-300 max-w-[200px] truncate">{student.address}</td>
            <td className="py-4 text-gray-300">{student.grade}</td>
            <td className="py-4 text-gray-300">{new Date(student.updatedAt).toLocaleDateString()}</td>
            <td className="py-4">
                <button className="p-1.5 hover:bg-[#252d3d] rounded-lg text-blue-400 hover:text-blue-300">
                    <FileText size={18} />
                </button>
            </td>
        </tr>
    );
};

export default StudentTableRow;