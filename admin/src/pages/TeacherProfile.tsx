import { useState } from 'react';
import TeacherProfileHeader from '../components/profile/TeacherProfileHeadr';
import TeacherProfileForm from '../components/profile/TeacherProfileForm';
import { useTeacherProfile } from '../hooks/useTeacherProfile';

const TeacherProfilePage = () => {
    const { profile, isLoading } = useTeacherProfile();
    const [isEditing, setIsEditing] = useState(false);

    if (isLoading) {
        return (

            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-pulse text-gray-400">Loading profile...</div>
            </div>

        );
    }

    return (

        <div className="max-w-4xl mx-auto">
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
        </div>

    );
};

export default TeacherProfilePage;