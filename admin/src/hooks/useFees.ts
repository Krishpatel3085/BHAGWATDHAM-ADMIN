import { useEffect, useState } from 'react';
import { FeePayment } from '../types/fees';
import axios from 'axios';
import { APi_URL } from '../Server';

export const useFees = () => {
    const [payments, setPayments] = useState<FeePayment[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const role = localStorage.getItem('role');
    const id = localStorage.getItem('id');

    const fetchStudent = async () => {
        setLoading(true);
        setError(null);

        if (!role || !id) {
            setError('Role or ID is missing');
            setLoading(false);
            return;
        }

        try {
            if (role === 'Student') {
                const response = await axios.get(`${APi_URL}student/FessGet/${id}`);
                console.log("Get By Id Response:", response.data);
                const data = response.data;
                setPayments(data.students || []);
            } else {
                const response = await axios.get(`${APi_URL}student/getAllStudent`);
                console.log("Get ALL Response:", response.data);
                const data = response.data.students;
                setPayments(data || []);
            }
        } catch (err: any) {
            setError('Failed to fetch Payment');
            console.error('Error fetching Payment:', err.response?.data || err.message);
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
            // Send a PUT request to update the student's fees
            const response = await axios.put(`${APi_URL}student/Fess`, paymentData);

            const updatedStudent = response.data.updatedStudent; // Match backend's response structure

            // Update the specific student's fees in the state
            setPayments(prevPayments =>
                prevPayments.map(payment =>
                    payment.studentId === updatedStudent.studentId
                        ? { ...payment, Fees: updatedStudent.Fees }
                        : payment
                )
            );

            alert("Student Fees Details Successfully updated");
        } catch (err: any) {
            setError('Failed to update student fees');
            console.error('Error updating fees:', err);
            alert('Failed to update student fees');
        } finally {
            setLoading(false);
        }
    };


    const getTotalCollected = (thisMonth = false) => {
        if (thisMonth) {
            const now = new Date();
            const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

            return payments.reduce((total, payment) => {
                const lastPaymentDate = payment.Fees[0]?.lastPaymentDate
                    ? new Date(payment.Fees[0]?.lastPaymentDate)
                    : null;

                if (lastPaymentDate && lastPaymentDate >= startOfMonth) {
                    return total + (payment.Fees[0]?.PaidAmount || 0);
                }

                return total;
            }, 0);
        }

        // Total fees collected for all time
        return payments.reduce((total, payment) => total + (payment.Fees[0]?.PaidAmount || 0), 0);
    };


    const getTotalPending = (countStudents = false) => {
        const pending = payments.filter(p => p.Fees[0]?.status === 'pending' || p.Fees[0]?.status === 'overdue');
        return countStudents
            ? pending.length
            : pending.reduce((total, p) => total + (p.Fees[0]?.TotalAmount - p.Fees[0]?.PaidAmount), 0);
    };


    const getTotalOverdue = (countStudents = false) => {
        const overdue = payments.filter(p => p.Fees[0]?.status === 'overdue');

        return countStudents
            ? overdue.length // Count of students with overdue payments
            : overdue.reduce((total, p) => total + (p.Fees[0]?.TotalAmount - p.Fees[0]?.PaidAmount || 0), 0); // Sum overdue amounts
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