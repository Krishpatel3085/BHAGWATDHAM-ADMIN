import React from 'react';
import { Edit2, Trash2, BookOpen } from 'lucide-react';
import { Lecture } from '../../types/lecture';
import { useLectures } from '../../hooks/useLecture';

interface LectureTableProps {
    onEdit: (lecture: Lecture) => void;
}

const LectureTable: React.FC<LectureTableProps> = ({ onEdit }) => {
    const { lectures, deleteLecture } = useLectures();

    return (
        <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
                <thead>
                    <tr className="text-left">
                        <th className="pb-4 text-sm font-medium text-gray-400">Day</th>
                        <th className="pb-4 text-sm font-medium text-gray-400">Subject</th>
                        <th className="pb-4 text-sm font-medium text-gray-400">Time</th>
                        <th className="pb-4 text-sm font-medium text-gray-400">Teacher</th>
                        <th className="pb-4 text-sm font-medium text-gray-400">Grade</th>
                        <th className="pb-4 text-sm font-medium text-gray-400">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-sm">
                    {lectures.map((lecture) => (
                        <tr key={lecture.id} className="border-t border-gray-700">
                            <td className="py-4 text-gray-300">{lecture.dayOfWeek}</td>
                            <td className="py-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-[#252d3d] rounded-lg">
                                        <BookOpen size={16} className="text-violet-400" />
                                    </div>
                                    <span className="text-white">{lecture.subject}</span>
                                </div>
                            </td>
                            <td className="py-4 text-gray-300">
                                {lecture.startTime} - {lecture.endTime}
                            </td>
                            <td className="py-4 text-gray-300">{lecture.teacherName}</td>
                            <td className="py-4 text-gray-300">{lecture.grade}</td>
                            <td className="py-4">
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => onEdit(lecture)}
                                        className="p-1.5 hover:bg-[#252d3d] rounded-lg text-blue-400 hover:text-blue-300"
                                    >
                                        <Edit2 size={16} />
                                    </button>
                                    <button
                                        onClick={() => deleteLecture(lecture.id)}
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

export default LectureTable;