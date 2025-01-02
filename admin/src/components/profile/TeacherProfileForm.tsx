import React, { useState } from 'react';
import { Save, X } from 'lucide-react';
import { useTeacherProfileForm } from '../../hooks/useTeacherProfileForm';
import { TeacherProfileData } from '../../types/teacherProfile';

interface TeacherProfileFormProps {
    profile: TeacherProfileData;
    isEditing: boolean;
    onCancel: () => void;
}

const TeacherProfileForm: React.FC<TeacherProfileFormProps> = ({ profile, isEditing, onCancel }) => {
    const { formData, handleChange, handleSubmit } = useTeacherProfileForm(profile, onCancel);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.name.trim()) newErrors.name = 'Teacher Name is required.';
        if (!formData.employeeNo.trim()) newErrors.employeeNo = 'Employee Number is required.';
        if (!formData.subject.trim()) newErrors.subject = 'Subject is required.';
        if (!formData.grade.trim()) newErrors.grade = 'Grade is required.';
        if (!formData.age) newErrors.age = 'Age is required.';
        if (!formData.salary) newErrors.salary = 'Salary is required.';
        return newErrors;
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});
        setIsLoading(true);
        try {
            await handleSubmit(e);
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        if (isEditing && JSON.stringify(formData) !== JSON.stringify(profile)) {
            if (!window.confirm('You have unsaved changes. Are you sure you want to cancel?')) return;
        }
        onCancel();
    };

    return (
        <div className="bg-[#1e2746] rounded-xl p-6">
            <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Teacher Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            disabled={!isEditing}
                            aria-disabled={!isEditing}
                            className="w-full bg-[#252d3d] border border-gray-700 rounded-lg px-4 py-2.5 text-white disabled:opacity-60"
                        />
                        {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Employee No</label>
                        <input
                            type="text"
                            name="employeeNo"
                            value={formData.employeeNo}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full bg-[#252d3d] border border-gray-700 rounded-lg px-4 py-2.5 text-white disabled:opacity-60"
                        />
                        {errors.employeeNo && <p className="text-sm text-red-500 mt-1">{errors.employeeNo}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Subject</label>
                        <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full bg-[#252d3d] border border-gray-700 rounded-lg px-4 py-2.5 text-white disabled:opacity-60"
                        />
                        {errors.subject && <p className="text-sm text-red-500 mt-1">{errors.subject}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Grade</label>
                        <input
                            type="text"
                            name="grade"
                            value={formData.grade}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full bg-[#252d3d] border border-gray-700 rounded-lg px-4 py-2.5 text-white disabled:opacity-60"
                        />
                        {errors.grade && <p className="text-sm text-red-500 mt-1">{errors.grade}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Age</label>
                        <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full bg-[#252d3d] border border-gray-700 rounded-lg px-4 py-2.5 text-white disabled:opacity-60"
                        />
                        {errors.age && <p className="text-sm text-red-500 mt-1">{errors.age}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Salary</label>
                        <input
                            type="number"
                            name="salary"
                            value={formData.salary}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full bg-[#252d3d] border border-gray-700 rounded-lg px-4 py-2.5 text-white disabled:opacity-60"
                        />
                        {errors.salary && <p className="text-sm text-red-500 mt-1">{errors.salary}</p>}
                    </div>

                    <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-300 mb-1">Address</label>
                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            disabled={!isEditing}
                            rows={3}
                            className="w-full bg-[#252d3d] border border-gray-700 rounded-lg px-4 py-2.5 text-white disabled:opacity-60"
                        />
                    </div>
                </div>

                {isEditing && (
                    <div className="flex justify-end gap-4 pt-4 border-t border-gray-700">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white transition-colors"
                        >
                            <X size={16} />
                            <span>Cancel</span>
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-60"
                        >
                            {isLoading ? 'Saving...' : <>
                                <Save size={16} />
                                <span>Save Changes</span>
                            </>}
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default TeacherProfileForm;
