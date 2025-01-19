import { useState } from 'react';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileForm from '../components/profile/ProfileForm';
import TeacherProfileHeader from '../components/profile/TeacherProfileHeadr';
import TeacherProfileForm from '../components/profile/TeacherProfileForm';
import { useProfile } from '../hooks/useProfile';
import { useTeacherProfile } from '../hooks/useTeacherProfile';

const ProfilePage = () => {
    const role = localStorage.getItem('role')?.toLowerCase(); // Normalize role comparison
    const [isEditing, setIsEditing] = useState(false);

    const { profile: studentProfile, isLoading: isStudentLoading } = useProfile();
    const { profile: teacherProfile, isLoading: isTeacherLoading } = useTeacherProfile();

    const isLoading = role === 'student' ? isStudentLoading : isTeacherLoading;

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-pulse text-gray-400">Loading profile...</div>
            </div>
        );
    }

    if (role === 'student' && studentProfile) {
        return (
            <div className="max-w-4xl mx-auto">
                <ProfileHeader
                    profile={studentProfile}
                    isEditing={isEditing}
                    onEdit={() => setIsEditing(true)}
                />
                <ProfileForm
                    profile={studentProfile}
                    isEditing={isEditing}
                    onCancel={() => setIsEditing(false)}
                />
            </div>
        );
    }

    if (role === 'teacher' && teacherProfile) {
        return (
            <div className="max-w-4xl mx-auto">
                <TeacherProfileHeader
                    profile={teacherProfile}
                    isEditing={isEditing}
                    onEdit={() => setIsEditing(true)}
                />
                <TeacherProfileForm
                    profile={teacherProfile}
                    isEditing={isEditing}
                    onCancel={() => setIsEditing(false)}
                />
            </div>
        );
    }

    return (
        <div className="text-center text-gray-500">
            <p>{!role ? 'Invalid role. Please contact support.' : 'Profile not found. Please try again later.'}</p>
        </div>
    );
};

export default ProfilePage;
