// import { useState, useEffect } from 'react';
// import { TeacherProfileData } from '../types/teacherProfile';

// export const useTeacherProfileForm = (profile: TeacherProfileData, onCancel: () => void) => {
//     const [formData, setFormData] = useState(profile);

//     useEffect(() => {
//         setFormData(profile);
//     }, [profile]);

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             [name]: name === 'age' || name === 'salary' ? Number(value) : value,
//         }));
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();

//         try {
//             // In a real app, this would be an API call
//             await new Promise(resolve => setTimeout(resolve, 1000));
//             console.log('Teacher profile updated:', formData);
//             onCancel();
//         } catch (error) {
//             console.error('Error updating teacher profile:', error);
//         }
//     };

//     return {
//         formData,
//         handleChange,
//         handleSubmit,
//     };
// };

import { useState, useEffect } from 'react';
import axios from 'axios';
import { TeacherProfileData } from '../types/teacherProfile';

const API_URL = 'https://ldfs6814-8000.inc1.devtunnels.ms/';

export const useTeacherProfileForm = (profile: TeacherProfileData, onCancel: () => void) => {
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
            [name]: name === 'age' || name === 'salary' ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);


        try {
            const response = await axios.put(`${API_URL}teacher/UpdateTeacher`, formData);
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
