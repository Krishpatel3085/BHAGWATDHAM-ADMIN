import { useState, useEffect } from 'react';
import axios from 'axios';
import { TeacherProfileData } from '../types/teacherProfile';
import { APi_URL } from '../Server';
// const API_URL = 'https://ldfs6814-8000.inc1.devtunnels.ms/';

export const useTeacherProfileForm = (profile: TeacherProfileData, onCancel: () => void) => {
    const [formData, setFormData] = useState(profile);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setFormData(profile);
    }, [profile]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement| HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'age' || name === 'salary' ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);


        try {
            const response = await axios.put(`${APi_URL}teacher/UpdateTeacher`, formData);
            console.log('Teacher profile updated successfully:', response.data);
            onCancel();
        } catch (err: any) {
            console.error('Error updating teacher profile:', err);
            setError(err.response?.data?.message || 'An error occurred while updating the profile.');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        formData,
        handleChange,
        handleSubmit,
        isLoading,
        error,
    };
};
