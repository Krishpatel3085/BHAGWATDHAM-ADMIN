import { useState, useEffect } from 'react';
import { useTeachers } from './useTeachers';
import { Teacher } from '../types/teacher';

const initialFormData = {
    name: '',
    employeeNo: '',
    address: '',
    salary: '',
    grade: '',
    age: '',
};

export const useTeacherForm = (teacher: Teacher | null, onClose: () => void) => {
    const [formData, setFormData] = useState(initialFormData);
    const { addTeacher, updateTeacher } = useTeachers();

    useEffect(() => {
        if (teacher) {
            setFormData({
                name: teacher.name,
                employeeNo: teacher.employeeNo,
                address: teacher.address,
                salary: teacher.salary.toString(),
                grade: teacher.grade,
                age: teacher.age,  // Assuming age is a string in the teacher object
            });
        } else {
            setFormData(initialFormData);
        }
    }, [teacher]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const teacherData = {
            name: formData.name,
            employeeNo: formData.employeeNo,
            address: formData.address,
            salary: parseInt(formData.salary),
            grade: formData.grade,
            age: formData.age,
        };

        if (teacher) {
            updateTeacher(teacher.id, teacherData);
        } else {
            addTeacher(teacherData);
        }

        onClose();
    };

    return {
        formData,
        handleChange,
        handleSubmit,
    };
};



// import axios from 'axios';
// const API_URL = 'https://ldfs6814-8000.inc1.devtunnels.ms/';

// export const useTeachers = () => {
//     const addTeacher = async (teacherData: Partial<Teacher>) => {
//         try {
//             const response = await axios.post(API_URL + '/teacher/CreateTeacher', teacherData);
//             console.log('Teacher added:', response.data);
//         } catch (error) {
//             console.error('Failed to add teacher:', error);
//         }
//     };

//     const updateTeacher = async (id: string, teacherData: Partial<Teacher>) => {
//         try {
//             const response = await axios.put(API_URL + `teacher/UpdateTeacher/${id}`, teacherData);
//             console.log('Teacher updated:', response.data);
//         } catch (error) {
//             console.error('Failed to update teacher:', error);
//         }
//     };

//     return { addTeacher, updateTeacher };
// };
