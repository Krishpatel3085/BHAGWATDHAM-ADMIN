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
    const profile = role === 'student' ? studentProfile : teacherProfile;

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-pulse text-gray-400">Loading profile...</div>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="text-center text-gray-500">
                <p>Profile not found. Please try again later.</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            {role === 'student' ? (
                <>
                    <ProfileHeader
                        profile={profile}
                        isEditing={isEditing}
                        onEdit={() => setIsEditing(true)}
                    />
                    <ProfileForm
                        profile={profile}
                        isEditing={isEditing}
                        onCancel={() => setIsEditing(false)}
                    />
                </>
            ) : role === 'teacher' ? (
                <>
                    <TeacherProfileHeader
                        profile={profile}
                        isEditing={isEditing}
                        onEdit={() => setIsEditing(true)}
                    />
                    <TeacherProfileForm
                        profile={profile}
                        isEditing={isEditing}
                        onCancel={() => setIsEditing(false)}
                    />
                </>
            ) : (
                <div className="text-center text-gray-500">
                    <p>Invalid role. Please contact support.</p>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
