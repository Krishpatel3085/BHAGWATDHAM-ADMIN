import { useEffect, useState } from 'react';
import { Student } from '../types/student';
import axios from 'axios';
import { APi_URL } from '../Server';


export const useStudents = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [male, setMale] = useState(0);
    const [female, setFemale] = useState(0);

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const response = await axios.get(APi_URL + 'student/getAllStudent');
                const data = response.data;
                setStudents(data.students);
                // Calculate gender counts
                const maleCount = data.students.filter((student: Student) => student.gender === 'male').length;
                const femaleCount = data.students.filter((student: Student) => student.gender === 'female').length;

                setMale(maleCount);
                setFemale(femaleCount);
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
        male,
        female,
    };
};