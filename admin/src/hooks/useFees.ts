import { useState } from 'react';
import { FeePayment } from '../types/fees';

const initialPayments: FeePayment[] = [
    {
        id: '1',
        studentId: 'STU001',
        studentName: 'John Smith',
        grade: '10th Grade',
        rollNo: '1001',
        totalAmount: 5000,
        paidAmount: 5000,
        dueAmount: 0,
        dueDate: '2024-01-31',
        lastPaymentDate: '2024-01-15',
        status: 'paid',
        paymentMethod: 'card',
        receiptNo: 'RCP001'
    },
    {
        id: '2',
        studentId: 'STU002',
        studentName: 'Emma Johnson',
        grade: '9th Grade',
        rollNo: '1002',
        totalAmount: 5000,
        paidAmount: 2500,
        dueAmount: 2500,
        dueDate: '2024-01-31',
        lastPaymentDate: '2024-01-10',
        status: 'partial',
        paymentMethod: 'cash',
        receiptNo: 'RCP002'
    },
    {
        id: '3',
        studentId: 'STU003',
        studentName: 'Michael Brown',
        grade: '11th Grade',
        rollNo: '1003',
        totalAmount: 5000,
        paidAmount: 0,
        dueAmount: 5000,
        dueDate: '2024-01-15',
        status: 'overdue'
    }
];

export const useFees = () => {
    const [payments, setPayments] = useState<FeePayment[]>(initialPayments);

    const getTotalCollected = (thisMonth = false) => {
        if (thisMonth) {
            const now = new Date();
            const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
            return payments.reduce((total, payment) => {
                if (payment.lastPaymentDate && new Date(payment.lastPaymentDate) >= startOfMonth) {
                    return total + payment.paidAmount;
                }
                return total;
            }, 0);
        }
        return payments.reduce((total, payment) => total + payment.paidAmount, 0);
    };

    const getTotalPending = (countStudents = false) => {
        const pending = payments.filter(p => p.status === 'pending' || p.status === 'partial');
        return countStudents ? pending.length : pending.reduce((total, p) => total + p.dueAmount, 0);
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
    };
};