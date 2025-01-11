import { useEffect, useState } from 'react';
import { FeePayment } from '../types/fees';
import axios from 'axios';
import { APi_URL } from '../Server';

export const useFees = () => {
    const [payments, setPayments] = useState<FeePayment[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchStudent = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${APi_URL}student/getAllStudent`);
            const data = response.data
            setPayments(data.students);
            console.log("Cjheck", response.data);
        } catch (err) {
            setError('Failed to fetch marksheets');
            console.error('Error fetching marks:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudent();
    }, []);

    const updateFees = async (paymentData: FeePayment) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.put(`${APi_URL}student/Fess`, paymentData);
            const updatedStudent = response.data.student;
            // Update the payment in the state after the API call
            setPayments(payments.map(payment =>
                payment.id === updatedStudent.id ? updatedStudent : payment
            ));
        } catch (err) {
            setError('Failed to update student fees');
            console.error('Error updating fees:', err);
        } finally {
            setLoading(false);
        }
    };

    const getTotalCollected = (thisMonth = false) => {
        if (thisMonth) {
            const now = new Date();
            const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
            return payments.reduce((total, payment) => {
                if (payment.lastPaymentDate && new Date(payment.lastPaymentDate) >= startOfMonth) {
                    return total + payment.PaidAmount;
                }
                return total;
            }, 0);
        }
        return payments.reduce((total, payment) => total + payment.PaidAmount, 0);
    };

    const getTotalPending = (countStudents = false) => {
        const pending = payments.filter(p => p.status === 'pending' || p.status === 'overdue');
        return countStudents
            ? pending.length
            : pending.reduce((total, p) => total + (p.TotalAmount - p.PaidAmount), 0);
    };



    const getTotalOverdue = (countStudents = false) => {
        const overdue = payments.filter(p => p.status === 'overdue');
        return countStudents ? overdue.length : overdue.reduce((total, p) => total + p.dueAmount, 0);
    };

    const recordPayment = (paymentData: Partial<FeePayment>) => {
        setPayments(payments.map(payment =>
            payment.id === paymentData.id
                ? { ...payment, ...paymentData }
                : payment
        ));
    };

    return {
        payments,
        recordPayment,
        getTotalCollected,
        getTotalPending,
        getTotalOverdue,
        updateFees,
        loading,
        error,
    };
};