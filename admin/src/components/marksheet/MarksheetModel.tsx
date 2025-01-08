import React from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { useMarksheetForm } from '../../hooks/useMarksheetForm';
import { StudentMark } from '../../types/marksheet';

interface MarksheetModalProps {
    isOpen: boolean;
    onClose: () => void;
    mark: StudentMark | null;
}

const grades = [
    '5th', '6th', '7th', '8th', '9th', '10th',
    '11th Commerce', '11th Science', '11th Arts',
    '12th Commerce', '12th Science', '12th Arts'
];

const MarksheetModal: React.FC<MarksheetModalProps> = ({ isOpen, onClose, mark }) => {
    const { formData, handleChange, handleSubjectChange, addSubject, removeSubject, handleSubmit } = useMarksheetForm(mark, onClose);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="fixed inset-0 bg-black/50" onClick={onClose} />

            <div className="relative min-h-screen flex items-center justify-center p-4">
                <div className="relative bg-[#1e2746] rounded-xl w-full max-w-3xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold text-white">
                            {mark ? 'Edit Result' : 'Add New Result'}
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                    Student Name
                                </label>
                                <input
                                    type="text"
                                    name="studentName"
                                    value={formData.studentName}
                                    onChange={handleChange}
                                    className="w-full bg-[#252d3d] border border-gray-700 rounded-lg px-4 py-2.5 text-white"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                    Roll No
                                </label>
                                <input
                                    type="text"
                                    name="rollNo"
                                    value={formData.rollNo}
                                    onChange={handleChange}
                                    className="w-full bg-[#252d3d] border border-gray-700 rounded-lg px-4 py-2.5 text-white"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                    Class
                                </label>
                                <select
                                    name="Class"
                                    value={formData.Class}
                                    onChange={handleChange}
                                    className="w-full bg-[#252d3d] border border-gray-700 rounded-lg px-4 py-2.5 text-white"
                                    required
                                >
                                    <option value="">Select Class</option>
                                    {grades.map(grade => (
                                        <option key={grade} value={grade}>{grade}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                    Exam Type
                                </label>
                                <select
                                    name="examType"
                                    value={formData.examType}
                                    onChange={handleChange}
                                    className="w-full bg-[#252d3d] border border-gray-700 rounded-lg px-4 py-2.5 text-white"
                                    required
                                >
                                    <option value="">Select Exam Type</option>
                                    <option value="Midterm">Midterm</option>
                                    <option value="Final">Final</option>
                                    <option value="Unit Test">Unit Test</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-white font-medium">Subject Marks</h3>
                                <button
                                    type="button"
                                    onClick={addSubject}
                                    className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300"
                                >
                                    <Plus size={16} />
                                    Add Subject
                                </button>
                            </div>

                            <div className="space-y-4">
                                {formData.subjects.map((subject, index) => (
                                    <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#252d3d] p-4 rounded-lg">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                                Subject Name
                                            </label>
                                            <input
                                                type="text"
                                                value={subject.name}
                                                onChange={(e) => handleSubjectChange(index, 'name', e.target.value)}
                                                className="w-full bg-[#1e2746] border border-gray-700 rounded-lg px-4 py-2.5 text-white"
                                                required
                                                placeholder="Enter subject name"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                                Marks
                                            </label>
                                            <input
                                                type="number"
                                                value={subject.marks}
                                                onChange={(e) => handleSubjectChange(index, 'marks', e.target.value)}
                                                className="w-full bg-[#1e2746] border border-gray-700 rounded-lg px-4 py-2.5 text-white"
                                                required
                                                min="0"
                                                max="100"
                                                placeholder="Enter marks out of 100"
                                            />
                                        </div>
                                        <div className="flex items-end">
                                            <button
                                                type="button"
                                                onClick={() => removeSubject(index)}
                                                className="p-2.5 text-red-400 hover:text-red-300 hover:bg-[#1e2746] rounded-lg transition-colors"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-end gap-3">
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
                                {mark ? 'Update' : 'Save'} Result
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MarksheetModal;