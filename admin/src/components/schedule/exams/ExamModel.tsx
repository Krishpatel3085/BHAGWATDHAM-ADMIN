import React from 'react';
import { X } from 'lucide-react';
import { useExamForm } from '../../../hooks/useExamForm';
import { Exam } from '../../../types/exam';

interface ExamModalProps {
    isOpen: boolean;
    onClose: () => void;
    exam: Exam | null;
}
const grades = [
    '5th', '6th', '7th', '8th', '9th', '10th',
    '11th Commerce', '11th Science', '11th Arts',
    '12th Commerce', '12th Science', '12th Arts'
];
const ExamModal: React.FC<ExamModalProps> = ({ isOpen, onClose, exam }) => {
    const { formData, handleChange, handleSubmit } = useExamForm(exam, onClose);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="fixed inset-0 bg-black/50" onClick={onClose} />

            <div className="relative min-h-screen flex items-center justify-center p-4">
                <div className="relative bg-[#1e2746] rounded-xl w-full max-w-md p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold text-white">
                            {exam ? 'Edit Exam' : 'Add Exam'}
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Subject
                            </label>
                            <input
                                type="text"
                                name="Subject"
                                value={formData.Subject}
                                onChange={handleChange}
                                className="w-full bg-[#252d3d] border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>

                        {/* <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Class
                            </label>
                            <input
                                type="text"
                                name="Class"
                                value={formData.Class}
                                onChange={handleChange}
                                className="w-full bg-[#252d3d] border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div> */}
                        <div>
                            <label htmlFor="grade" className="block text-sm font-medium text-gray-300 mb-1">
                            Class
                            </label>
                            <select
                                id="grade"
                                name="Class"
                                value={formData.Class}
                                onChange={handleChange}
                                className="w-full bg-[#252d3d] border border-gray-700 rounded-lg px-4 py-2.5 text-white"
                                required
                            >
                                <option value="">Select Class</option>
                                {grades.map((grade) => (
                                    <option key={grade} value={grade}>
                                        {grade}
                                    </option>
                                ))}
                            </select>

                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Date
                            </label>
                            <input
                                type="date"
                                name="ExamDate"
                                value={formData.ExamDate}
                                onChange={handleChange}
                                className="w-full bg-[#252d3d] border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Time
                            </label>
                            <input
                                type="time"
                                name="ExamTime"
                                value={formData.ExamTime}
                                onChange={handleChange}
                                className="w-full bg-[#252d3d] border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Room
                            </label>
                            <input
                                type="text"
                                name="Room"
                                value={formData.Room}
                                onChange={handleChange}
                                className="w-full bg-[#252d3d] border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Status
                            </label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full bg-[#252d3d] border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            >
                                <option value="Upcoming">Upcoming</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>

                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                {exam ? 'Update' : 'Add'} Exam
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ExamModal;