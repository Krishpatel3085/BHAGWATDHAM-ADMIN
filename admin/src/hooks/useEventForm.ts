import { useState, useEffect } from 'react';
import { useEvents } from './useEvents';
import { Event } from '../types/event';

const initialFormData = {
    title: '',
    date: '',
    time: '',
    description: '',
};

export const useEventForm = (event: Event | null, onClose: () => void) => {
    const [formData, setFormData] = useState(initialFormData);
    const { addEvent, updateEvent } = useEvents();

    useEffect(() => {
        if (event) {
            setFormData({
                title: event.title,
                date: event.date,
                time: event.time,
                description: event.description,
            });
        } else {
            setFormData(initialFormData);
        }
    }, [event]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (event) {
            updateEvent(event.id, formData);
        } else {
            addEvent(formData);
        }

        onClose();
    };

    return {
        formData,
        handleChange,
        handleSubmit,
    };
};