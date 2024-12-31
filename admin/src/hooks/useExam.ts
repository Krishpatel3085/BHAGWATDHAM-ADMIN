import { useEffect, useState } from 'react';
import { Exam } from '../types/exam';
import axios from 'axios';


const API_URL = 'https://ldfs6814-8000.inc1.devtunnels.ms/';


export const useExams = () => {
    const [exams, setExams] = useState<Exam[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchEvent = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${API_URL}Exam/getExam`);
            console.log('Exam is Come', response.data);

            const transformedEvents = response.data.map((exam: any) => ({
                id: exam._id,
                Subject: exam.Subject,
                ExamDate: exam.ExamDate,
                Class: exam.Class,
                Room: exam.Room,
                ExamTime: exam.ExamTime,
                status: exam.status, // Default type if not provided by API
            }));
            setExams(transformedEvents);
        } catch (err: any) {
            console.error('Error fetching requests:', err);
            setError(err.message || 'Failed to fetch Exam.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvent();
    }, [exams]);

    const addExam = async (exam: Omit<Exam, 'id'>) => {
        const token = localStorage.getItem('token')
        try {
            const response = await axios.post(API_URL + 'Exam/CreateExam', exam, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': ` Bearer ${token}`
                },
            });
            const createdExam: Exam = response.data;
            setExams([...exams, createdExam]);
            alert('Exam created successfully.');
        } catch (error) {
            console.error('Error adding exam:', error);
            alert('Failed to create exam. Please try again.');
        }
    };

    const updateExam = async (id: string, updatedExam: Omit<Exam, 'id'>) => {
        try {
            const response = await axios.put(`${API_URL}Exam/UpdateExam/${id}`, updatedExam);
            const updatedExamFromServer: Exam = response.data;

            setExams(exams.map(exam =>
                exam.id === id ? updatedExamFromServer : exam
            ));
            alert('Exam updated successfully.');
            fetchEvent();
        } catch (error) {
            console.error('Error updating exam:', error);
            alert('Failed to update exam. Please try again.');
        }
    };

    const deleteExam = async (id: string) => {
        try {
            await axios.delete(`${API_URL}Exam/DeleteExam/${id}`);
            setExams(prevExams => prevExams.filter(exam => exam.id !== id));
            alert('Exam deleted successfully.');
        } catch (error) {
            console.error('Error deleting exam:', error);
            alert('Failed to delete exam. Please try again.');
        }
        setExams(exams.filter(exam => exam.id !== id));
    };

    return {
        exams,
        loading,
        error,
        addExam,
        updateExam,
        deleteExam,
    };
};