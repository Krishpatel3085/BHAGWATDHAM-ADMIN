import { useState, useEffect } from 'react';
import { useExams } from './useExam';
import { Exam } from '../types/exam';

const initialFormData = {
    subject: '',
    class: '',
    date: '',
    time: '',
    room: '',
    status: 'Upcoming' as const
};

export const useExamForm = (exam: Exam | null, onClose: () => void) => {
    const [formData, setFormData] = useState(initialFormData);
    const { addExam, updateExam } = useExams();

    useEffect(() => {
        if (exam) {
            setFormData({
                subject: exam.subject,
                class: exam.class,
                date: exam.date,
                time: exam.time,
                room: exam.room,
                status: exam.status
            });
        } else {
            setFormData(initialFormData);
        }
    }, [exam]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (exam) {
            updateExam(exam.id, formData);
        } else {
            addExam(formData);
        }

        onClose();
    };

    return {
        formData,
        handleChange,
        handleSubmit,
    };
};