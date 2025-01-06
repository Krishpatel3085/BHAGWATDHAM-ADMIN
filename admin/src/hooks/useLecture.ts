import { useEffect, useState } from 'react';
import { Lecture } from '../types/lecture';
import axios from 'axios';
import { APi_URL } from '../Server';
// const API_URL = 'https://ldfs6814-8000.inc1.devtunnels.ms/';/

export const useLectures = () => {
    const [lectures, setLectures] = useState<Lecture[]>([]);

    const fetchLectures = async () => {
        try {
            const response = await axios.get(`${APi_URL}lecture/GetLecture`);
            console.log("first", response.data)
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
    useEffect(() => {
        fetchLectures();
    }, []);

    const addLecture = async (lecture: Omit<Lecture, 'id'>) => {
        try {
            const newLecture = { ...lecture, id: Date.now().toString() };
            const response = await axios.post(`${APi_URL}lecture/CreateLecture`, newLecture);

            if (response.status === 201 || response.status === 200) {
                const createdLecture = response.data;
                setLectures((prevLectures) => [...prevLectures, createdLecture]);
                alert('Lecture added successfully!');
            } else {
                console.error('Failed to create lecture. Status:', response.status);
            }
        } catch (err: any) {
            console.error('Error while adding a lecture:', err.message || err);
        }
    };

    return {
        lectures,
        addLecture,
    };
};
