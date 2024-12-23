import { useState } from 'react';
import { Lecture } from '../types/lecture';

const initialLectures: Lecture[] = [
    {
        id: '1',
        subject: 'Maths',
        startTime: '7:00',
        endTime: '7:45',
        teacherName: 'Mr. John Smith',
        dayOfWeek: 'Monday',
        grade: '10th Grade',
    },
    {
        id: '2',
        subject: 'English',
        startTime: '7:45',
        endTime: '8:30',
        teacherName: 'Ms. Sarah Johnson',
        dayOfWeek: 'Monday',
        grade: '10th Grade',
    },
    {
        id: '3',
        subject: 'Gujarati',
        startTime: '8:30',
        endTime: '9:15',
        teacherName: 'Mr. Patel',
        dayOfWeek: 'Monday',
        grade: '10th Grade',
    },
    // Add more initial lectures as needed
];

export const useLectures = () => {
    const [lectures, setLectures] = useState<Lecture[]>(initialLectures);

    const addLecture = (lecture: Omit<Lecture, 'id'>) => {
        const newLecture = {
            ...lecture,
            id: Date.now().toString(),
        };
        setLectures([...lectures, newLecture]);
    };

    const updateLecture = (id: string, updatedLecture: Omit<Lecture, 'id'>) => {
        setLectures(lectures.map(lecture =>
            lecture.id === id ? { ...updatedLecture, id } : lecture
        ));
    };

    const deleteLecture = (id: string) => {
        setLectures(lectures.filter(lecture => lecture.id !== id));
    };

    return {
        lectures,
        addLecture,
        updateLecture,
        deleteLecture,
    };
};