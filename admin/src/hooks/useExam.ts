import { useEffect, useState } from 'react';
import { Exam } from '../types/exam';
import axios from 'axios';
import { APi_URL } from '../Server';

export const useExams = () => {
    const [exams, setExams] = useState<Exam[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchEvent = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${APi_URL}Exam/getExam`);
            const exam = response.data
            const transformedEvents = exam.exams.map((exam: any) => ({
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
    }, []);

    const addExam = async (exam: Omit<Exam, 'id'>) => {
        const token = localStorage.getItem('token')
        try {
            const response = await axios.post(APi_URL + 'Exam/CreateExam', exam, {
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
            const response = await axios.put(`${APi_URL}Exam/UpdateExam/${id}`, updatedExam);
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
            await axios.delete(`${APi_URL}Exam/DeleteExam/${id}`);
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