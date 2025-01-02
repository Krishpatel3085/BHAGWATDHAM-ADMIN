import { useState, useEffect } from 'react';
import { TeacherProfileData } from '../types/teacherProfile';

export const useTeacherProfileForm = (profile: TeacherProfileData, onCancel: () => void) => {
    const [formData, setFormData] = useState(profile);

    useEffect(() => {
        setFormData(profile);
    }, [profile]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'age' || name === 'salary' ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // In a real app, this would be an API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('Teacher profile updated:', formData);
            onCancel();
        } catch (error) {
            console.error('Error updating teacher profile:', error);
        }
    };

    return {
        formData,
        handleChange,
        handleSubmit,
    };
};