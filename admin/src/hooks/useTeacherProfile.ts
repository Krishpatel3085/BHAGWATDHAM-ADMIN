import { useState, useEffect } from 'react';
import { TeacherProfileData } from '../types/teacherProfile';

const mockTeacherProfile: TeacherProfileData = {
    employeeNo: 'EMP001',
    name: 'Sarah Johnson',
    subject: 'Mathematics',
    grade: '10th',
    age: 32,
    salary: 45000,
    address: '456 Oak Street, City, State - 12345',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};

export const useTeacherProfile = () => {
    const [profile, setProfile] = useState<TeacherProfileData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate API call
        const fetchProfile = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));
                setProfile(mockTeacherProfile);
            } catch (error) {
                console.error('Error fetching teacher profile:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, []);

    return { profile, isLoading };
};