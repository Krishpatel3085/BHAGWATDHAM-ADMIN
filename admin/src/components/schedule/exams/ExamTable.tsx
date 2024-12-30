import React from 'react';
import { Edit2, Trash2, Calendar } from 'lucide-react';
import { Exam } from '../../../types/exam';
import { useExams } from '../../../hooks/useExam';

interface ExamTableProps {
    exams: Exam[];
    onEdit: (exam: Exam) => void;
}

const ExamTable: React.FC<ExamTableProps> = ({ exams, onEdit }) => {
    const { deleteExam } = useExams();

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
        <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
                <thead>
                    <tr className="text-left">
                        <th className="pb-4 text-sm font-medium text-gray-400">Subject</th>
                        <th className="pb-4 text-sm font-medium text-gray-400">Class</th>
                        <th className="pb-4 text-sm font-medium text-gray-400">Date</th>
                        <th className="pb-4 text-sm font-medium text-gray-400">Time</th>
                        <th className="pb-4 text-sm font-medium text-gray-400">Room</th>
                        <th className="pb-4 text-sm font-medium text-gray-400">Status</th>
                        <th className="pb-4 text-sm font-medium text-gray-400">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-sm">
                    {exams.map((exam) => (
                        <tr key={exam.id} className="border-t border-gray-700">
                            <td className="py-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-[#252d3d] rounded-lg">
                                        <Calendar size={16} className="text-violet-400" />
                                    </div>
                                    <span className="text-white">{exam.Subject}</span>
                                </div>
                            </td>
                            <td className="py-4 text-gray-300">{exam.Class}</td>
                            <td className="py-4 text-gray-300">{new Date(exam.ExamDate).toLocaleDateString()}</td>
                            <td className="py-4 text-gray-300">{exam.ExamTime}</td>
                            <td className="py-4 text-gray-300">{exam.Room}</td>
                            <td className="py-4">
                                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(exam.status)}`}>
                                    {exam.status}
                                </span>
                            </td>
                            <td className="py-4">
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => onEdit(exam)}
                                        className="p-1.5 hover:bg-[#252d3d] rounded-lg text-blue-400 hover:text-blue-300"
                                    >
                                        <Edit2 size={16} />
                                    </button>
                                    <button
                                        onClick={() => deleteExam(exam.id)}
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

export default ExamTable;