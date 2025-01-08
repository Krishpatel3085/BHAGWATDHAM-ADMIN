import { useState } from 'react';
import { StudentMark } from '../types/marksheet';
import axios from 'axios';
import { APi_URL } from '../Server';

const initialMarks: StudentMark[] = [
    {
        id: '1',
        studentId: 'STU001',
        studentName: 'John Doe',
        rollNo: '101',
        Class: '10th Grade',
        examType: 'Midterm',
        subjects: [
            { name: '1', marks: 85, grade: 'A' },
            { name: '2', marks: 78, grade: 'B' },
            { name: '3', marks: 92, grade: 'A+' },
        ],
        totalMarks: 255,
        percentage: 85,
        result: 'Pass',
        examDate: '2024-01-15',
    },
    // Add more sample data as needed
];

export const useMarksheet = () => {
    const [marks, setMarks] = useState<StudentMark[]>(initialMarks);

    const addMark = async (mark: Omit<StudentMark, 'id'>) => {
        const newMark = {
            ...mark,
            id: Date.now().toString(),
        };

        try {
            
            const response = await axios.post(`${APi_URL}marksheet/CreateMarksheet`, newMark);
            console.log('Marksheet created:', response.data);
            setMarks([...marks, newMark]);
        } catch (err) {
            console.error('Error adding marksheet:', err);
        }
    };

    const updateMark = (id: string, updatedMark: Omit<StudentMark, 'id'>) => {
        setMarks(marks.map(mark =>
            mark.id === id ? { ...updatedMark, id } : mark
        ));
    };

    const deleteMark = (id: string) => {
        setMarks(marks.filter(mark => mark.id !== id));
    };

    return {
        marks,
        addMark,
        updateMark,
        deleteMark,
    };
};