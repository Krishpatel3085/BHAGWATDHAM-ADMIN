import { useState } from 'react';
import { ImageData } from '../types/image';

const initialImages: ImageData[] = [
    {
        id: '1',
        name: 'Mathematics Class',
        subject: 'Mathematics',
        year: '2024',
        url: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=60'
    },
    // Add more sample images
];

export const useImages = () => {
    const [images, setImages] = useState<ImageData[]>(initialImages);

    const addImage = (image: Omit<ImageData, 'id'>) => {
        const newImage = {
            ...image,
            id: Date.now().toString(),
        };
        setImages([...images, newImage]);
    };

    const deleteImage = (id: string) => {
        setImages(images.filter(image => image.id !== id));
    };

    return {
        images,
        addImage,
        deleteImage,
    };
};