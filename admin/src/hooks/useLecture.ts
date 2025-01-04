import { useEffect, useState } from 'react';
import { Lecture } from '../types/lecture';
import axios from 'axios';

const API_URL = 'https://ldfs6814-8000.inc1.devtunnels.ms/';

export const useLectures = () => {
    const [lectures, setLectures] = useState<Lecture[]>([]);

    useEffect(() => {
        const fetchLectures = async () => {
            try {
                const response = await axios.get(`${API_URL}lecture/GetLecture`);
                if (response.data) {
                    setLectures(response.data);
                } else {
                    console.warn('No lectures returned from API');
                    setLectures([]);
                }
            } catch (err: any) {
                console.error('Error fetching lectures:', err.message || err);
            }
        };
        fetchLectures();
    }, []);

    const addLecture = async (lecture: Omit<Lecture, 'id'>) => {
        try {
            const newLecture = { ...lecture, id: Date.now().toString() };
            const response = await axios.post(`${API_URL}lecture/CreateLecture`, newLecture);

            if (response.status === 201 || response.status === 200) {
                const createdLecture = response.data;
                setLectures((prevLectures) => [...prevLectures, createdLecture]);
            } else {
                console.error('Failed to create lecture. Status:', response.status);
            }
        } catch (err: any) {
            console.error('Error while adding a lecture:', err.message || err);
        }
    };

    const updateLecture = async (id: string, updatedLecture: Omit<Lecture, 'id'>) => {
        try {
            const response = await axios.put(`${API_URL}lecture/UpdateLecture/${id}`, updatedLecture);
            if (response.status === 200) {
                setLectures((prev) =>
                    prev.map(lecture => (lecture.id === id ? { ...updatedLecture, id } : lecture))
                );
            } else {
                console.error('Failed to update lecture. Status:', response.status);
            }
        } catch (err: any) {
            console.error('Error while updating a lecture:', err.message || err);
        }
    };

    const deleteLecture = async (id: string) => {
        try {
            const response = await axios.delete(`${API_URL}lecture/DeleteLecture/${id}`);
            if (response.status === 200) {
                setLectures((prev) => prev.filter(lecture => lecture.id !== id));
            } else {
                console.error('Failed to delete lecture. Status:', response.status);
            }
        } catch (err: any) {
            console.error('Error while deleting a lecture:', err.message || err);
        }
    };

    return {
        lectures,
        addLecture,
        updateLecture,
        deleteLecture,
    };
};
