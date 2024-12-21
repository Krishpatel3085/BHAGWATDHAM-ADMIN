import { useState, useEffect } from 'react';
import { Teacher } from '../types/teacher';

const initialTeachers: Teacher[] = [
    {
        id: '1',
        name: 'John Smith',
        employeeNo: 'EMP001',
        address: '123 Main St, City, State',
        salary: 45000,
    },
    {
        id: '2',
        name: 'Sarah Johnson',
        employeeNo: 'EMP002',
        address: '456 Oak Ave, City, State',
        salary: 48000,
    },
];

export const useTeachers = () => {
    const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);

    const addTeacher = (teacher: Omit<Teacher, 'id'>) => {
        const newTeacher = {
            ...teacher,
            id: Date.now().toString(),
        };
        setTeachers([...teachers, newTeacher]);
    };

    const updateTeacher = (id: string, updatedTeacher: Omit<Teacher, 'id'>) => {
        setTeachers(teachers.map(teacher =>
            teacher.id === id ? { ...updatedTeacher, id } : teacher
        ));
    };

    const deleteTeacher = (id: string) => {
        setTeachers(teachers.filter(teacher => teacher.id !== id));
    };

    return {
        teachers,
        addTeacher,
        updateTeacher,
        deleteTeacher,
    };
};