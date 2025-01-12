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


