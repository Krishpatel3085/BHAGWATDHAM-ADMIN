import { useState, useEffect } from 'react';
import { ProfileData } from '../types/profile';

const mockProfile: ProfileData = {
    studentId: 'STU001',
    name: 'John Smith',
    grade: '10th',
    parentName: 'Michael Smith',
    parentPhone: '(555) 123-4567',
    address: '123 Main Street, City, State - 12345',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    totalFees: 50000,
    paidFees: 35000,
    feesStatus: 'pending',
};

export const useProfile = () => {
    const [profile, setProfile] = useState<ProfileData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate API call
        const fetchProfile = async () => {
            try {
                // In a real app, this would be an API call
                await new Promise(resolve => setTimeout(resolve, 1000));
                setProfile(mockProfile);
            } catch (error) {
                console.error('Error fetching profile:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, []);

    return { profile, isLoading };
};