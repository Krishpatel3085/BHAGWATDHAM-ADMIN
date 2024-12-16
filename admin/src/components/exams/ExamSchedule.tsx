// import React from 'react';
import ExamTableRow from './ExamTableRow';
import { Exam } from '../../types/exam';

const exams: Exam[] = [
    {
        id: '1',
        subject: 'Mathematics',
        class: 'Standard 1',
        date: '2024-01-20',
        time: '09:00 AM - 11:00 AM',
        room: 'Room 101',
        status: 'Upcoming'
    },
    {
        id: '2',
        subject: 'Physics',
        class: 'Standard 2',
        date: '2024-01-21',
        time: '11:30 AM - 01:30 PM',
        room: 'Room 102',
        status: 'In Progress'
    },
    {
        id: '3',
        subject: 'Chemistry',
        class: 'Standard 3',
        date: '2024-01-19',
        time: '02:00 PM - 04:00 PM',
        room: 'Room 103',
        status: 'Completed'
    },
    {
        id: '4',
        subject: 'Biology',
        class: 'Standard 4',
        date: '2024-01-22',
        time: '09:00 AM - 11:00 AM',
        room: 'Room 104',
        status: 'Upcoming'
    }
];

const ExamSchedule = () => {
    return (
        <div className="bg-[#1e2746] rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-white">Exam Schedule</h3>
                <button className="text-sm text-blue-400 hover:text-blue-300">View All</button>
            </div>

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
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {exams.map((exam) => (
                            <ExamTableRow key={exam.id} exam={exam} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ExamSchedule;