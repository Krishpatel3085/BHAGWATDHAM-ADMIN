import { useEffect, useState } from 'react';
import { StudentMark } from '../types/marksheet';
import axios from 'axios';
import { APi_URL } from '../Server';

export const useMarksheet = () => {
    const [marks, setMarks] = useState<StudentMark[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const role = localStorage.getItem('role');
    const id = localStorage.getItem('id');
    
    useEffect(() => {
    const fetchMarks = async () => {
        setLoading(true);
        setError(null);

        if (!role || !id) {
            setError('Role or ID is missing');
            setLoading(false);
            return;
        }

        try {
            if (role === 'Student') {
                const response = await axios.get(`${APi_URL}marksheet/GetMarksheetsid/${id}`);
                console.log("Get By Id Response:", response.data);
                const data = response.data.marksheets;
                setMarks(data || []);
            } else {
                const response = await axios.get(`${APi_URL}marksheet/GetMarksheets`);
                console.log("Get ALL Response:", response.data);
                const data = response.data.marksheets;
                setMarks(data || []);
            }
        } catch (err: any) {
            setError('Failed to fetch marksheets');
            console.error('Error fetching marks:', err.response?.data || err.message);
        } finally {
            setLoading(false);
        }
    };

        fetchMarks();
    },[])

    const addMark = async (mark: Omit<StudentMark, 'id'>) => {
        const newMark = {
            ...mark,
            id: id,
        };
        const token = localStorage.getItem('token')

        try {
            const response = await axios.post(`${APi_URL}marksheet/CreateMarksheet`, newMark, {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': ` Bearer ${token}`
                },
            });
            console.log('Marksheet created:', response.data);
            setMarks([...marks, newMark]);
        } catch (err: any) {
            console.error('Error adding marksheet:', err);
            alert("Message: " + err.response.data.error);
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
            console.log("Delete Id", id);
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