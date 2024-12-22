import React from 'react';
import { X } from 'lucide-react';
import { useStudentForm } from '../../hooks/useStudentForm';
import { Student } from '../../types/student';

interface StudentModalProps {
    isOpen: boolean;
    onClose: () => void;
    student: Student | null;
}

const StudentModal: React.FC<StudentModalProps> = ({ isOpen, onClose, student }) => {
    const { formData, handleChange, handleSubmit } = useStudentForm(student, onClose);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="fixed inset-0 bg-black/50" onClick={onClose} />

            <div className="relative min-h-screen flex items-center justify-center p-4">
                <div className="relative bg-[#1e2746] rounded-xl w-full max-w-md p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold text-white">
                            {student ? 'Edit Student' : 'Add Student'}
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
                                Student Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full bg-[#252d3d] border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Parent's Name
                            </label>
                            <input
                                type="text"
                                name="parentName"
                                value={formData.parentName}
                                onChange={handleChange}
                                className="w-full bg-[#252d3d] border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Parent's Phone
                            </label>
                            <input
                                type="tel"
                                name="parentPhone"
                                value={formData.parentPhone}
                                onChange={handleChange}
                                className="w-full bg-[#252d3d] border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Address
                            </label>
                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                rows={3}
                                className="w-full bg-[#252d3d] border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Grade
                            </label>
                            <input
                                type="text"
                                name="grade"
                                value={formData.grade}
                                onChange={handleChange}
                                className="w-full bg-[#252d3d] border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
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
                                {student ? 'Update' : 'Add'} Student
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default StudentModal;