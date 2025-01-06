import { useEffect, useState } from 'react';
import { Student } from '../types/student';
import axios from 'axios';
import { APi_URL } from '../Server';
// const API_URL = 'https://ldfs6814-8000.inc1.devtunnels.ms/';

export const useStudents = () => {
    const [students, setStudents] = useState<Student[]>([]);

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const response = await axios.get(APi_URL + 'student/getAllStudent');
                const data = response.data;
                setStudents(data.students);
            } catch (error) {
                console.error("Error fetching teachers:", error); 
            }
        };

        fetchStudent();
    }, []);

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