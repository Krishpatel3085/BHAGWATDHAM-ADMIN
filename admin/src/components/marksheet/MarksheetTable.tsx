import React from 'react';
import { Eye, Edit2, Trash2, Download } from 'lucide-react';
import { useMarksheet } from '../../hooks/useMarksheet';
import { StudentMark } from '../../types/marksheet';

interface MarksheetTableProps {
    onEdit: (mark: StudentMark) => void;
}

const MarksheetTable: React.FC<MarksheetTableProps> = ({ onEdit }) => {
    const { marks, deleteMark } = useMarksheet();

    return (
        <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px]">
                <thead>
                    <tr className="text-left">
                        <th className="pb-4 text-sm font-medium text-gray-400">Student Name</th>
                        <th className="pb-4 text-sm font-medium text-gray-400">Roll No</th>
                        <th className="pb-4 text-sm font-medium text-gray-400">Class</th>
                        <th className="pb-4 text-sm font-medium text-gray-400">Exam Type</th>
                        <th className="pb-4 text-sm font-medium text-gray-400">Total Marks</th>
                        <th className="pb-4 text-sm font-medium text-gray-400">Percentage</th>
                        <th className="pb-4 text-sm font-medium text-gray-400">Result</th>
                        <th className="pb-4 text-sm font-medium text-gray-400">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-sm">
                    {marks.map((mark) => (
                        <tr key={mark.id} className="border-t border-gray-700">
                            <td className="py-4 text-white">{mark.studentName}</td>
                            <td className="py-4 text-gray-300">{mark.rollNo}</td>
                            <td className="py-4 text-gray-300">{mark.class}</td>
                            <td className="py-4 text-gray-300">{mark.examType}</td>
                            <td className="py-4 text-gray-300">{mark.totalMarks}</td>
                            <td className="py-4 text-gray-300">{mark.percentage}%</td>
                            <td className="py-4">
                                <span className={`px-2 py-1 rounded-full text-xs ${mark.result === 'Pass'
                                        ? 'bg-green-500/20 text-green-400'
                                        : 'bg-red-500/20 text-red-400'
                                    }`}>
                                    {mark.result}
                                </span>
                            </td>
                            <td className="py-4">
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => {/* View marksheet details */ }}
                                        className="p-1.5 hover:bg-[#252d3d] rounded-lg text-blue-400 hover:text-blue-300"
                                        title="View Details"
                                    >
                                        <Eye size={16} />
                                    </button>
                                    <button
                                        onClick={() => onEdit(mark)}
                                        className="p-1.5 hover:bg-[#252d3d] rounded-lg text-green-400 hover:text-green-300"
                                        title="Edit"
                                    >
                                        <Edit2 size={16} />
                                    </button>
                                    <button
                                        onClick={() => deleteMark(mark.id)}
                                        className="p-1.5 hover:bg-[#252d3d] rounded-lg text-red-400 hover:text-red-300"
                                        title="Delete"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                    <button
                                        onClick={() => {/* Download marksheet */ }}
                                        className="p-1.5 hover:bg-[#252d3d] rounded-lg text-violet-400 hover:text-violet-300"
                                        title="Download"
                                    >
                                        <Download size={16} />
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

export default MarksheetTable;