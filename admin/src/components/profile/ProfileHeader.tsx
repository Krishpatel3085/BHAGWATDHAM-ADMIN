import React from 'react';
import { Edit2, Camera } from 'lucide-react';
import { ProfileData } from '../../types/profile';

interface ProfileHeaderProps {
    profile: ProfileData;
    isEditing?: boolean;
    onEdit?: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profile, isEditing, onEdit }) => {
    return (
        <div className="bg-[#1e2746] rounded-xl p-6 mb-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative">
                    <img
                        src={profile.imageUrl || `https://ui-avatars.com/api/?name=${profile.name || 'Unknown'}`}
                        alt={profile.name || 'Profile Image'}
                        className="w-24 h-24 rounded-full object-cover border-4 border-gray-700"
                    />
                    {isEditing && (
                        <label
                            className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full cursor-pointer hover:bg-blue-700 transition-colors"
                            aria-label="Upload Profile Picture"
                        >
                            <Camera size={16} className="text-white" />
                            <input type="file" className="hidden" accept="image/*" />
                        </label>
                    )}
                </div>

                <div className="flex-1 text-center md:text-left">
                    <h1 className="text-2xl font-semibold text-white">{profile.name}</h1>
                    {profile.studentId && <p className="text-gray-400">Student ID: {profile.studentId}</p>}
                    {profile.grade && <p className="text-gray-400">Grade {profile.grade}</p>}
                </div>

                {!isEditing && onEdit && (
                    <button
                        onClick={onEdit}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <Edit2 size={16} />
                        <span>Edit Profile</span>
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProfileHeader;
