import { useState } from 'react';
import { Plus } from 'lucide-react';
import ExamTable from './exams/ExamTable';
import ExamModal from './exams/ExamModel';
import { useExams } from '../../hooks/useExam';

const ExamsSection = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedExam, setSelectedExam] = useState(null);
    const { exams } = useExams();

    return (
        <div className="bg-[#1e2746] rounded-xl p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                    <h2 className="text-xl font-semibold text-white">Exam Schedule</h2>
                    <p className="text-gray-400 text-sm mt-1">Manage upcoming examinations</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Plus size={20} />
                    <span>Add Exam</span>
                </button>
            </div>

            <ExamTable exams={exams} onEdit={setSelectedExam} />

            <ExamModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedExam(null);
                }}
                exam={selectedExam}
            />
        </div>
    );
}

export default ExamsSection;