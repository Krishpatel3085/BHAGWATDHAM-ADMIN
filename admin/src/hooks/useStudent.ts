import { useState } from 'react';
import { Student } from '../types/student';

const initialStudents: Student[] = [
    {
        id: '1',
        name: 'John Smith',
        parentName: 'Michael Smith',
        parentPhone: '(555) 123-4567',
        address: '123 Main St, City, State',
        grade: '10th Grade',
        enrollmentDate: '2024-01-15',
    },
    {
        id: '2',
        name: 'Emma Johnson',
        parentName: 'Robert Johnson',
        parentPhone: '(555) 234-5678',
        address: '456 Oak Ave, City, State',
        grade: '11th Grade',
        enrollmentDate: '2024-01-20',
    },
];

export const useStudents = () => {
    const [students, setStudents] = useState<Student[]>(initialStudents);

    const addStudent = (student: Omit<Student, 'id'>) => {
        const newStudent = {
            ...student,
            id: Date.now().toString(),
        };
        setStudents([...students, newStudent]);
    };

    const updateStudent = (id: string, updatedStudent: Omit<Student, 'id'>) => {
        setStudents(students.map(student =>
            student.id === id ? { ...updatedStudent, id } : student
        ));
    };

    const deleteStudent = (id: string) => {
        setStudents(students.filter(student => student.id !== id));
    };

    return {
        students,
        addStudent,
        updateStudent,
        deleteStudent,
    };
};