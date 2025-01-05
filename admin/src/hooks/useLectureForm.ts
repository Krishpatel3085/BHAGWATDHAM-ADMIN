import { useState, useEffect } from 'react';
import { useLectures } from './useLecture';
import { Lecture } from '../types/lecture';

const initialFormData = {
    subject: '',
    startTime: '',
    endTime: '',
    teacherName: '',
    dayOfWeek: '',
    grade: '',
};

const lectureTimeMapping = [
    { startTime: '07:00', endTime: '07:45', lectureNo: 1 },
    { startTime: '07:45', endTime: '08:30', lectureNo: 2 },
    { startTime: '08:30', endTime: '09:15', lectureNo: 3 },
    { startTime: '09:15', endTime: '10:00', lectureNo: 'Break' },
    { startTime: '10:00', endTime: '10:45', lectureNo: 4 },
    { startTime: '10:45', endTime: '11:30', lectureNo: 5 },
    { startTime: '11:30', endTime: '12:15', lectureNo: 6 },
];

export const useLectureForm = (
    lecture: Lecture | null,
    onClose: () => void,
    defaultGrade: string
) => {
    const [formData, setFormData] = useState({
        ...initialFormData,
        grade: defaultGrade,
    });

    const { addLecture } = useLectures();

    useEffect(() => {
        if (lecture) {
            setFormData({
                subject: lecture.subject,
                startTime: lecture.startTime,
                endTime: lecture.endTime,
                teacherName: lecture.teacherName,
                dayOfWeek: lecture.dayOfWeek,
                grade: lecture.grade || defaultGrade,  // fallback to defaultGrade if grade is undefined
            });
        } else {
            setFormData({
                ...initialFormData,
                grade: defaultGrade,
            });
        }
    }, [lecture, defaultGrade]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Check if all fields are filled before submitting
        if (
            !formData.subject ||
            !formData.startTime ||
            !formData.endTime ||
            !formData.teacherName ||
            !formData.dayOfWeek ||
            !formData.grade
        ) {
            alert('Please fill in all fields.');
            return;
        }

        // Map lecture number based on startTime and endTime
        const mappedLecture = lectureTimeMapping.find(
            (l) => l.startTime === formData.startTime && l.endTime === formData.endTime
        );

        if (!mappedLecture) {
            alert('Invalid time range. Please select a valid lecture time.');
            return;
        }

        const lectureData = {
            ...formData,
            lectureNo: mappedLecture.lectureNo,
        };

        addLecture(lectureData);

        // Clear form data after submission and close the form
        setFormData({ ...initialFormData, grade: defaultGrade });
        onClose();
    };

    return {
        formData,
        handleChange,
        handleSubmit,
    };
};
