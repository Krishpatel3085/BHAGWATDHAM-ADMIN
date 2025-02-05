import React, { useState } from 'react';
import { Eye, Edit2, Trash2 } from 'lucide-react';
import { useMarksheet } from '../../hooks/useMarksheet';
import { StudentMark } from '../../types/marksheet';
import MarksheetView from './MarksheetView';

interface MarksheetTableProps {
    onEdit: (mark: StudentMark) => void;
}

const MarksheetTable: React.FC<MarksheetTableProps> = ({ onEdit }) => {
    const { marks, deleteMark } = useMarksheet();
    const [selectedMark, setSelectedMark] = useState<StudentMark | null>(null);
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const role = localStorage.getItem('role');

    const filteredMarks = marks.filter(mark => 
        mark.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        mark.rollNo.toString().includes(searchTerm)
    );

    const totalPages = Math.ceil(filteredMarks.length / itemsPerPage);
    const paginatedMarks = filteredMarks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <>
            <div className="mb-4 flex justify-between items-center mb-6 pb-4">
                <input
                    type="text"
                    placeholder="Search by student name or roll no..."
                    className="px-3 py-2 w-1/3 border border-gray-600 rounded-md bg-gray-800 text-white"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

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
                        {paginatedMarks.map((mark) => (
                            <tr key={mark._id} className="border-t border-gray-700">
                                <td className="py-4 text-white">{mark.studentName}</td>
                                <td className="py-4 text-gray-300">{mark.rollNo}</td>
                                <td className="py-4 text-gray-300">{mark.Class}</td>
                                <td className="py-4 text-gray-300">{mark.examType}</td>
                                <td className="py-4 text-gray-300">{mark.totalMarks}</td>
                                <td className="py-4 text-gray-300">{mark.percentage}%</td>
                                <td className="py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs ${mark.result === 'Pass' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                        {mark.result}
                                    </span>
                                </td>
                                <td className="py-4">
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => {
                                                setSelectedMark(mark);
                                                setIsViewOpen(true);
                                            }}
                                            className="p-1.5 hover:bg-[#252d3d] rounded-lg text-blue-400 hover:text-blue-300"
                                            title="View Details"
                                        >
                                            <Eye size={16} />
                                        </button>
                                        {role === 'Teacher' || role === 'Principal' ? (
                                            <>
                                                <button
                                                    onClick={() => onEdit(mark)}
                                                    className="p-1.5 hover:bg-[#252d3d] rounded-lg text-green-400 hover:text-green-300"
                                                    title="Edit"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button
                                                    onClick={() => deleteMark(mark._id)}
                                                    className="p-1.5 hover:bg-[#252d3d] rounded-lg text-red-400 hover:text-red-300"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </>
                                        ) : (' ')}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {totalPages > 1 && (
                <div className="mt-4 flex justify-center gap-2">
                    <button 
                        className="px-3 py-1 bg-gray-700 text-white rounded-md disabled:opacity-50" 
                        disabled={currentPage === 1} 
                        onClick={() => setCurrentPage(currentPage - 1)}
                    >
                        Previous
                    </button>
                    <span className="px-3 py-1 bg-gray-800 text-white rounded-md">Page {currentPage} of {totalPages}</span>
                    <button 
                        className="px-3 py-1 bg-gray-700 text-white rounded-md disabled:opacity-50" 
                        disabled={currentPage === totalPages} 
                        onClick={() => setCurrentPage(currentPage + 1)}
                    >
                        Next
                    </button>
                </div>
            )}

            <MarksheetView
                isOpen={isViewOpen}
                onClose={() => {
                    setIsViewOpen(false);
                    setSelectedMark(null);
                }}
                mark={selectedMark}
            />
        </>
    );
};

export default MarksheetTable;
