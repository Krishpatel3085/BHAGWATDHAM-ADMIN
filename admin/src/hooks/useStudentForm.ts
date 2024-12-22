import { useState, useEffect } from 'react';
import { useStudents } from './useStudent';
import { Student } from '../types/student';

const initialFormData = {
    name: '',
    parentName: '',
    parentPhone: '',
    address: '',
    grade: '',
    enrollmentDate: new Date().toISOString().split('T')[0],
};

export const useStudentForm = (student: Student | null, onClose: () => void) => {
    const [formData, setFormData] = useState(initialFormData);
    const { addStudent, updateStudent } = useStudents();

    useEffect(() => {
        if (student) {
            setFormData({
                name: student.name,
                parentName: student.parentName,
                parentPhone: student.parentPhone,
                address: student.address,
                grade: student.grade,
                enrollmentDate: student.enrollmentDate,
            });
        } else {
            setFormData(initialFormData);
        }
    }, [student]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (student) {
            updateStudent(student.id, formData);
        } else {
            addStudent(formData);
        }

        onClose();
    };

    return {
        formData,
        handleChange,
        handleSubmit,
    };
};