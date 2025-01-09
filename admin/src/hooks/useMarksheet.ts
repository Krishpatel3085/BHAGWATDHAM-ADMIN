import { useEffect, useState } from 'react';
import { StudentMark } from '../types/marksheet';
import axios from 'axios';
import { APi_URL } from '../Server';

export const useMarksheet = () => {
    const [marks, setMarks] = useState<StudentMark[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchMarks = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${APi_URL}marksheet/GetMarksheets`);
            const data = response.data
            setMarks(data.marksheets);
            console.log("Cjheck", response.data);
        } catch (err) {
            setError('Failed to fetch marksheets');
            console.error('Error fetching marks:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMarks();
    }, []);

    const addMark = async (mark: Omit<StudentMark, 'id'>) => {
        const newMark = {
            ...mark,
            id: Date.now().toString(),
        };

        try {
            const response = await axios.post(`${APi_URL}marksheet/CreateMarksheet`, newMark);
            console.log('Marksheet created:', response.data);
            setMarks([...marks, newMark]);
        } catch (err) {
            console.error('Error adding marksheet:', err);
        }
    };

    const updateMark = async (id: string, updatedData: StudentMark) => {
        try {
            if (!id) {
                console.error('ID is undefined');
                return;
            }
            console.log("Update Id:", id);
            const response = await axios.put(`${APi_URL}marksheet/UpdateMarksheet/${id}`, updatedData);
            console.log('Marksheet updated:', response.data);
            setMarks(marks.map(mark => (mark._id === id ? { ...response.data } : mark)));
        } catch (err) {
            console.error('Error updating marksheet:', err);
        }
    };

    const deleteMark = async (id: string) => {
        try {
            await axios.delete(`${APi_URL}marksheet/DeleteMarksheet/${id}`);
            setMarks(marks.filter(mark => mark._id !== id));
        } catch (err) {
            console.error('Error deleting marksheet:', err);
        }
    };

    return {
        marks,
        addMark,
        updateMark,
        deleteMark,
        loading,
        error,
    };
};