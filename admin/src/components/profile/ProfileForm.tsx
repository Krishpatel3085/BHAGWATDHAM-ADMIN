import React from 'react';
import { Save, X } from 'lucide-react';
import { useProfileForm } from '../../hooks/useProfileForm';
import { ProfileData } from '../../types/profile';

interface ProfileFormProps {
    profile: ProfileData;
    isEditing: boolean;
    onCancel: () => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ profile, isEditing, onCancel }) => {
    const { formData, handleChange, handleSubmit } = useProfileForm(profile, onCancel);

    return (
        <div className="bg-[#1e2746] rounded-xl p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            Student Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full bg-[#252d3d] border border-gray-700 rounded-lg px-4 py-2.5 text-white disabled:opacity-60"
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
                            disabled={!isEditing}
                            className="w-full bg-[#252d3d] border border-gray-700 rounded-lg px-4 py-2.5 text-white disabled:opacity-60"
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
                            disabled={!isEditing}
                            className="w-full bg-[#252d3d] border border-gray-700 rounded-lg px-4 py-2.5 text-white disabled:opacity-60"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            Parent's Mobile
                        </label>
                        <input
                            type="tel"
                            name="parentPhone"
                            value={formData.parentPhone}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full bg-[#252d3d] border border-gray-700 rounded-lg px-4 py-2.5 text-white disabled:opacity-60"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            Address
                        </label>
                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            disabled={!isEditing}
                            rows={3}
                            className="w-full bg-[#252d3d] border border-gray-700 rounded-lg px-4 py-2.5 text-white disabled:opacity-60"
                        />
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
                            onClick={onCancel}
                            className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white transition-colors"
                        >
                            <X size={16} />
                            <span>Cancel</span>
                        </button>
                        <button
                            type="submit"
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <Save size={16} />
                            <span>Save Changes</span>
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default ProfileForm;