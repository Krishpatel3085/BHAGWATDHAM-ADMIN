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

export const useLectureForm = (lecture: Lecture | null, onClose: () => void) => {
    const [formData, setFormData] = useState(initialFormData);
    const { addLecture, updateLecture } = useLectures();

    useEffect(() => {
        if (lecture) {
            setFormData({
                subject: lecture.subject,
                startTime: lecture.startTime,
                endTime: lecture.endTime,
                teacherName: lecture.teacherName,
                dayOfWeek: lecture.dayOfWeek,
                grade: lecture.grade,
            });
        } else {
            setFormData(initialFormData);
        }
    }, [lecture]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (lecture) {
            updateLecture(lecture.id, formData);
        } else {
            addLecture(formData);
        }

        onClose();
    };

    return {
        formData,
        handleChange,
        handleSubmit,
    };
};