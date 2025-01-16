import { useState, useEffect } from 'react';
import { useEvents } from './useEvents';
import { Event } from '../types/event';

const initialFormData = {
    EventName: '',
    EventDate: '',
    EventTime: '',
    EventDescriptions: '',
    EventStatus: ''
};

export const useEventForm = (event: Event | null, onClose: () => void) => {
    const [formData, setFormData] = useState(initialFormData);
    const { addEvent, updateEvent } = useEvents();

    useEffect(() => {
        if (event) {
            setFormData({
                EventName: event.EventName,
                EventDate: event.EventDate,
                EventTime: event.EventTime,
                EventDescriptions: event.EventDescriptions,
                EventStatus: event.EventStatus,
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