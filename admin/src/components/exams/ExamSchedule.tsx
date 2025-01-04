import ExamTableRow from './ExamTableRow';
import { Exam } from '../../types/exam';
import { useEffect, useState } from 'react';
import axios from 'axios';


const API_URL = 'https://ldfs6814-8000.inc1.devtunnels.ms/';

const ExamSchedule = () => {
    const [exams, useExams] = useState<Exam[]>([]);
    useEffect(() => {
      const fetchExam = async () => {
        try {
          const response = await axios.get(API_URL + 'Exam/getExam');
          const data = response.data;
          console.log("All Exams:", data.exams);
          useExams(data.exams);
        } catch (error) {
          console.error("Error fetching Events:", error); 
        }
      };
  
      fetchExam();
    }, []);
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