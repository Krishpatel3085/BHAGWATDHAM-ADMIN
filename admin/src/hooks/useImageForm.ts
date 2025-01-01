import { useState } from 'react';
import { useImages } from './useImage';

const initialFormData = {
    name: '',
    subject: '',
    year: '',
};

export const useImageForm = (onClose: () => void) => {
    const [formData, setFormData] = useState(initialFormData);
    const [preview, setPreview] = useState<string | null>(null);
    const { addImage } = useImages();

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

        if (!preview) return;

        addImage({
            ...formData,
            url: preview,
        });

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