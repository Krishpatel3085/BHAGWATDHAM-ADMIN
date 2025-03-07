import { useState, useEffect } from 'react';
import { Teacher } from '../types/teacher';
import axios from 'axios';
import { APi_URL } from '../Server';


export const useTeachers = () => {
    const [teachers, setTeachers] = useState<Teacher[]>([]);

    useEffect(() => {
        const fetchTeacher = async () => {
            try {
                const response = await axios.get(APi_URL + 'teacher/getAllTeacher');
                const data = response.data;
                setTeachers(data.teachers);
            } catch (error) {
                console.error("Error fetching teachers:", error); // Handle errors
            }
        };

        fetchTeacher();
    }, []);

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