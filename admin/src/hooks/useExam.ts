import { useState } from 'react';
import { Exam } from '../types/exam';

const initialExams: Exam[] = [
    {
        id: '1',
        subject: 'Mathematics',
        class: 'Standard 10',
        date: '2024-02-15',
        time: '09:00',
        room: 'Room 101',
        status: 'Upcoming'
    },
    {
        id: '2',
        subject: 'Physics',
        class: 'Standard 12',
        date: '2024-02-20',
        time: '14:00',
        room: 'Room 102',
        status: 'Upcoming'
    }
];

export const useExams = () => {
    const [exams, setExams] = useState<Exam[]>(initialExams);

    const addExam = (exam: Omit<Exam, 'id'>) => {
        const newExam = {
            ...exam,
            id: Date.now().toString(),
        };
        setExams([...exams, newExam]);
    };

    const updateExam = (id: string, updatedExam: Omit<Exam, 'id'>) => {
        setExams(exams.map(exam =>
            exam.id === id ? { ...updatedExam, id } : exam
        ));
    };

    const deleteExam = (id: string) => {
        setExams(exams.filter(exam => exam.id !== id));
    };

    return {
        exams,
        addExam,
        updateExam,
        deleteExam,
    };
};