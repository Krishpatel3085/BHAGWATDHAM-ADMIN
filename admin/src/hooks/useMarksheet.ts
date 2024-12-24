import { useState } from 'react';
import { StudentMark } from '../types/marksheet';

const initialMarks: StudentMark[] = [
    {
        id: '1',
        studentId: 'STU001',
        studentName: 'John Doe',
        rollNo: '101',
        class: '10th Grade',
        examType: 'Midterm',
        subjects: [
            { subjectId: '1', marks: 85, grade: 'A' },
            { subjectId: '2', marks: 78, grade: 'B' },
            { subjectId: '3', marks: 92, grade: 'A+' },
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

    const addMark = (mark: Omit<StudentMark, 'id'>) => {
        const newMark = {
            ...mark,
            id: Date.now().toString(),
        };
        setMarks([...marks, newMark]);
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