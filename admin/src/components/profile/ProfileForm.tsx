import React, { useState } from 'react';
import { Save, X } from 'lucide-react';
// import isEqual from 'lodash/isEqual';
import { useProfileForm } from '../../hooks/useProfileForm';
import { ProfileData } from '../../types/profile';

interface ProfileFormProps {
    profile: ProfileData;
    isEditing: boolean;
    onCancel: () => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ profile, isEditing, onCancel }) => {
    const { formData, handleChange, handleSubmit } = useProfileForm(profile, onCancel);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);

    const validate = () => {
        const newErrors: Record<string, string> = {};
        const trimmedData = {
            name: formData.name?.trim() || "",
            grade: formData.grade?.trim() || "",
            parentName: formData.parentName?.trim() || "",
            parentPhone: formData.parentPhone?.trim() || "",
            address: formData.address?.trim() || "",
            age: formData.age?.trim() || "",
        };
    
        if (!trimmedData.name) newErrors.name = 'Student Name is required.';
        if (!trimmedData.grade) newErrors.grade = 'Grade is required.';
        if (!trimmedData.age) newErrors.age = 'Age is required.';
        if (!trimmedData.parentName) newErrors.parentName = "Parent's Name is required.";
        if (!/^\d{10}$/.test(trimmedData.parentPhone)) {
            newErrors.parentPhone = "Parent's Mobile must be a valid 10-digit number.";
        }
        if (!trimmedData.address) newErrors.address = 'Address is required.';
    
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                            Student Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full bg-[#252d3d] border border-gray-700 rounded-lg px-4 py-2.5 text-white disabled:opacity-60"
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>

                    <div>
                        <label htmlFor="grade" className="block text-sm font-medium text-gray-300 mb-1">
                            Grade
                        </label>
                        <input
                            id="grade"
                            type="text"
                            name="grade"
                            value={formData.grade}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full bg-[#252d3d] border border-gray-700 rounded-lg px-4 py-2.5 text-white disabled:opacity-60"
                        />
                        {errors.grade && <p className="text-red-500 text-sm mt-1">{errors.grade}</p>}
                    </div>
                    <div>
                        <label htmlFor="studentId" className="block text-sm font-medium text-gray-300 mb-1">
                            Student Id
                        </label>
                        <input
                            id="studentId"
                            type="text"
                            name="studentId"
                            value={formData.studentId}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full bg-[#252d3d] border border-gray-700 rounded-lg px-4 py-2.5 text-white disabled:opacity-60"
                        />
                        {errors.studentId && <p className="text-red-500 text-sm mt-1">{errors.studentId}</p>}
                    </div>
                    <div>
                        <label htmlFor="age" className="block text-sm font-medium text-gray-300 mb-1">
                           Age
                        </label>
                        <input
                            id="age"
                            type="text"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full bg-[#252d3d] border border-gray-700 rounded-lg px-4 py-2.5 text-white disabled:opacity-60"
                        />
                        {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
                    </div>
                    <div>
                        <label htmlFor="parentName" className="block text-sm font-medium text-gray-300 mb-1">
                            Parent's Name
                        </label>
                        <input
                            id="parentName"
                            type="text"
                            name="parentName"
                            value={formData.parentName}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full bg-[#252d3d] border border-gray-700 rounded-lg px-4 py-2.5 text-white disabled:opacity-60"
                        />
                        {errors.parentName && <p className="text-red-500 text-sm mt-1">{errors.parentName}</p>}
                    </div>

                    <div>
                        <label htmlFor="parentPhone" className="block text-sm font-medium text-gray-300 mb-1">
                            Parent's Mobile
                        </label>
                        <input
                            id="parentPhone"
                            type="tel"
                            name="parentPhone"
                            value={formData.parentPhone}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full bg-[#252d3d] border border-gray-700 rounded-lg px-4 py-2.5 text-white disabled:opacity-60"
                        />
                        {errors.parentPhone && <p className="text-red-500 text-sm mt-1">{errors.parentPhone}</p>}
                    </div>

                    <div className="md:col-span-2">
                        <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-1">
                            Address
                        </label>
                        <textarea
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            disabled={!isEditing}
                            rows={3}
                            className="w-full bg-[#252d3d] border border-gray-700 rounded-lg px-4 py-2.5 text-white disabled:opacity-60"
                        />
                        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                    </div>

                    <div className="md:col-span-2">
                        <div className="flex items-center justify-between p-4 bg-[#252d3d] rounded-lg">
                            <div>
                                <h3 className="text-white font-medium">Current Fees Status</h3>
                                <p className="text-gray-400 text-sm mt-1">
                                    Total Fees: ₹{formData.totalFees} | Paid: ₹{formData.paidFees}
                                </p>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-sm ${formData.feesStatus === 'paid'
                                ? 'bg-green-500/20 text-green-400'
                                : 'bg-yellow-500/20 text-yellow-400'
                                }`}>
                                {formData.feesStatus === 'paid' ? 'Paid' : 'Pending'}
                            </div>
                        </div>
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
                            className={`flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? <span className="animate-spin">...</span> : <Save size={16} />}
                            <span>{isLoading ? 'Saving...' : 'Save Changes'}</span>
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default ProfileForm;
