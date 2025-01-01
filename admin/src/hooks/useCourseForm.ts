import { useState, useEffect } from 'react';
import { useCourses } from './useCourse';
import { Course } from '../types/course';

const initialFormData = {
    name: '',
    subject: '',
    year: '',
};

export const useCourseForm = (course: Course | null, onClose: () => void) => {
    const [formData, setFormData] = useState(initialFormData);
    const [preview, setPreview] = useState<string | null>(null);
    const { addCourse, updateCourse } = useCourses();

    useEffect(() => {
        if (course) {
            setFormData({
                name: course.name,
                subject: course.subject,
                year: course.year,
            });
            setPreview(course.imageUrl || null);
        } else {
            setFormData(initialFormData);
            setPreview(null);
        }
    }, [course]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const courseData = {
            ...formData,
            imageUrl: preview || undefined,
        };

        if (course) {
            updateCourse(course.id, courseData);
        } else {
            addCourse(courseData);
        }

        onClose();
    };

    return {
        formData,
        preview,
        handleChange,
        handleImageChange,
        handleSubmit,
    };
};