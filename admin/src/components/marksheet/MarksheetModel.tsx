import React from 'react';
import { X } from 'lucide-react';
import { useMarksheetForm } from '../../hooks/useMarksheetForm';
import { StudentMark } from '../../types/marksheet';

interface MarksheetModalProps {
    isOpen: boolean;
    onClose: () => void;
    mark: StudentMark | null;
}

const MarksheetModal: React.FC<MarksheetModalProps> = ({ isOpen, onClose, mark }) => {
    const { formData, handleChange, handleSubjectChange, handleSubmit } = useMarksheetForm(mark, onClose);

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
                                <input
                                    type="text"
                                    name="class"
                                    value={formData.class}
                                    onChange={handleChange}
                                    className="w-full bg-[#252d3d] border border-gray-700 rounded-lg px-4 py-2.5 text-white"
                                    required
                                />
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
                            <h3 className="text-white font-medium mb-3">Subject Marks</h3>
                            <div className="space-y-3">
                                {formData.subjects.map((subject, index) => (
                                    <div key={subject.subjectId} className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                                Subject Name
                                            </label>
                                            <input
                                                type="text"
                                                value={subject.subjectName}
                                                onChange={(e) => handleSubjectChange(index, 'subjectName', e.target.value)}
                                                className="w-full bg-[#252d3d] border border-gray-700 rounded-lg px-4 py-2.5 text-white"
                                                required
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
                                                className="w-full bg-[#252d3d] border border-gray-700 rounded-lg px-4 py-2.5 text-white"
                                                required
                                                min="0"
                                                max="100"
                                            />
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