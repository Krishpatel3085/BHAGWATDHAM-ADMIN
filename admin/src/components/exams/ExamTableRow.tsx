import React from 'react';
import { Calendar } from 'lucide-react';
import { Exam } from '../../types/exam';

interface ExamTableRowProps {
    exam: Exam;
}

const ExamTableRow: React.FC<ExamTableRowProps> = ({ exam }) => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Upcoming':
                return 'bg-yellow-500/20 text-yellow-400';
            case 'Completed':
                return 'bg-green-500/20 text-green-400';
            case 'In Progress':
                return 'bg-blue-500/20 text-blue-400';
            default:
                return 'bg-gray-500/20 text-gray-400';
        }
    };

    return (
        <tr className="border-t border-gray-700">
            <td className="py-3">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#252d3d] rounded-lg">
                        <Calendar size={16} className="text-violet-400" />
                    </div>
                    <span className="text-white">{exam.Subject}</span>
                </div>
            </td>
            <td className="py-3 text-gray-300">{exam.Class}</td>
            <td className="py-3 text-gray-300">{new Date(exam.ExamDate).toLocaleDateString()}</td>
            <td className="py-3 text-gray-300">{exam.ExamTime}</td>
            <td className="py-3 text-gray-300">{exam.Room}</td>
            <td className="py-3">
                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(exam.status)}`}>
                    {exam.status}
                </span>
            </td>
        </tr>
    );
};

export default ExamTableRow;