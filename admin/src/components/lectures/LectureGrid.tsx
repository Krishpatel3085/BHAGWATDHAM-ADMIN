import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { useLectures } from '../../hooks/useLecture';
import { Lecture } from '../../types/lecture';

interface LectureGridProps {
    onEdit: (lecture: Lecture) => void;
}

const timeSlots = [
    '7:00 to 7:45',
    '7:45 to 8:30',
    '8:30 to 9:15',
    'Break (9:15 to 10:00)',
    '10:00 to 10:45',
    '10:45 to 11:30',
    '11:30 to 12:15',
];

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const LectureGrid: React.FC<LectureGridProps> = ({ onEdit, selectedGrade }) => {
    const { lectures, deleteLecture } = useLectures();
    const filteredLectures = lectures.filter(lecture => lecture.grade === selectedGrade);

    const getLectureForSlot = (day: string, time: string) => {
        const lecture = filteredLectures.find(lecture => {
            const formattedTime = `${lecture.startTime.replace(/^0/, '')} to ${lecture.endTime.replace(/^0/, '')}`;
            return lecture.dayOfWeek === day && formattedTime === time;
        });
        return lecture;
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full min-w-full border-collapse">
                <thead>
                    <tr>
                        <th className="p-3 text-sm font-medium text-gray-400 border border-gray-700/50">Time</th>
                        {days.map(day => (
                            <th key={day} className="p-3 text-sm font-medium text-gray-400 border border-gray-700/50">
                                {day}
                            </th>
                        ))}
                        <th className="p-3 text-sm font-medium text-gray-400 border border-gray-700/50">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {timeSlots.map((timeSlot) => (
                        <tr key={timeSlot} className={timeSlot.includes('Break') ? 'bg-gray-800/20' : ''}>
                            <td className="p-3 text-sm text-gray-300 border border-gray-700/50">{timeSlot}</td>
                            {days.map(day => {
                                const lecture = getLectureForSlot(day, timeSlot);
                                return (
                                    <td key={`${day}-${timeSlot}`} className="p-3 text-sm border border-gray-700/50">
                                        {lecture ? (
                                            <div className="bg-[#252d3d] p-2 rounded">
                                                <div className="text-white font-medium">{lecture.subject}</div>
                                                <div className="text-gray-400 text-xs mt-1">{lecture.teacherName}</div>
                                            </div>
                                        ) : day === 'Sunday' ? (
                                            <div className="text-gray-500 text-center">Holiday</div>
                                        ) : null}
                                    </td>
                                );
                            })}
                            <td className="p-3 text-sm border border-gray-700/50">
                                <div className="flex justify-center gap-2">
                                    {/* Edit button */}
                                    <button
                                        onClick={() => {
                                            const lecture = getLectureForSlot('Monday', timeSlot); // Improved to get the lecture directly
                                            if (lecture) onEdit(lecture);
                                        }}
                                        className="p-1.5 hover:bg-[#252d3d] rounded-lg text-blue-400 hover:text-blue-300"
                                    >
                                        <Edit2 size={16} />
                                    </button>
                                    {/* Delete button */}
                                    <button
                                        onClick={() => {
                                            const lecture = getLectureForSlot('Monday', timeSlot); // Improved to get the lecture directly
                                            if (lecture) deleteLecture(lecture.id);
                                        }}
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

export default LectureGrid;