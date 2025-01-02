import { useState, useEffect } from 'react';
import { ProfileData } from '../types/profile';

export const useProfileForm = (profile: ProfileData, onCancel: () => void) => {
    const [formData, setFormData] = useState(profile);

    useEffect(() => {
        setFormData(profile);
    }, [profile]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // In a real app, this would be an API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('Profile updated:', formData);
            onCancel();
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return {
        formData,
        handleChange,
        handleSubmit,
    };
};