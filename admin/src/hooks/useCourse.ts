import { useState } from 'react';
import { Course } from '../types/course';

const initialCourses: Course[] = [
    {
        id: '1',
        name: 'Introduction to Mathematics',
        subject: 'Mathematics',
        year: '2024',
        imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=60'
    },
    {
        id: '2',
        name: 'Advanced Physics',
        subject: 'Physics',
        year: '2024',
        imageUrl: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=800&auto=format&fit=crop&q=60'
    },
    // Add more sample courses as needed
];

export const useCourses = () => {
    const [courses, setCourses] = useState<Course[]>(initialCourses);

    const addCourse = (course: Omit<Course, 'id'>) => {
        const newCourse = {
            ...course,
            id: Date.now().toString(),
        };
        setCourses([...courses, newCourse]);
    };

    const updateCourse = (id: string, updatedCourse: Omit<Course, 'id'>) => {
        setCourses(courses.map(course =>
            course.id === id ? { ...updatedCourse, id } : course
        ));
    };

    const deleteCourse = (id: string) => {
        setCourses(courses.filter(course => course.id !== id));
    };

    return {
        courses,
        addCourse,
        updateCourse,
        deleteCourse,
    };
};