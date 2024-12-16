import React from 'react';
import { FileText, Edit2, Trash2 } from 'lucide-react';
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
                        src={`https://i.pravatar.cc/150?img=${parseInt(student.id) + 20}`}
                        alt={student.name}
                        className="w-8 h-8 rounded-full"
                    />
                    <span className="text-white">{student.name}</span>
                </div>
            </td>
            <td className="py-4 text-gray-300">{student.phone}</td>
            <td className="py-4 text-gray-300 max-w-[200px] truncate">{student.address}</td>
            <td className="py-4 text-gray-300">{student.branch}</td>
            <td className="py-4 text-gray-300">{new Date(student.dateOfAdmission).toLocaleDateString()}</td>
            <td className="py-4">
                <button className="p-1.5 hover:bg-[#252d3d] rounded-lg text-blue-400 hover:text-blue-300">
                    <FileText size={18} />
                </button>
            </td>
            <td className="py-4">
                <div className="flex items-center gap-2">
                    <button className="p-1.5 hover:bg-[#252d3d] rounded-lg text-green-400 hover:text-green-300">
                        <Edit2 size={16} />
                    </button>
                    <button className="p-1.5 hover:bg-[#252d3d] rounded-lg text-red-400 hover:text-red-300">
                        <Trash2 size={16} />
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default StudentTableRow;