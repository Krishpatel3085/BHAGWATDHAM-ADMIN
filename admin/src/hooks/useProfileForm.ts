import { useState, useEffect } from 'react';
import { ProfileData } from '../types/profile';
import axios from 'axios';

const API_URL ='https://ldfs6814-8000.inc1.devtunnels.ms/';

export const useProfileForm = (profile: ProfileData, onCancel: () => void) => {
    const [formData, setFormData] = useState(profile);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

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
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.put(`${API_URL}student/UpdateStudent`, formData);
            console.log('Student profile updated successfully:', response.data);
            onCancel();
        } catch (err: any) {
            console.error('Error updating student profile:', err);
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
