import { useState } from 'react';
import { TeacherPayout } from '../types/payout';

const initialPayouts: TeacherPayout[] = [
    {
        id: '1',
        teacherId: 'T001',
        teacherName: 'John Smith',
        employeeId: 'EMP001',
        department: 'Mathematics',
        salary: 5000,
        bonus: 500,
        deductions: 200,
        payoutDate: '2024-01-31',
        paymentMethod: 'bank_transfer',
        status: 'paid',
        transactionId: 'TXN001'
    },
    {
        id: '2',
        teacherId: 'T002',
        teacherName: 'Sarah Johnson',
        employeeId: 'EMP002',
        department: 'Science',
        salary: 4800,
        payoutDate: '2024-01-31',
        paymentMethod: 'bank_transfer',
        status: 'pending'
    }
];

export const usePayouts = () => {
    const [payouts, setPayouts] = useState<TeacherPayout[]>(initialPayouts);

    const getTotalPaid = () => {
        return payouts
            .filter(p => p.status === 'paid')
            .reduce((total, p) => total + p.salary + (p.bonus || 0) - (p.deductions || 0), 0);
    };

    const getPendingPayouts = (countTeachers = false) => {
        const pending = payouts.filter(p => p.status === 'pending');
        return countTeachers ? pending.length : pending.reduce((total, p) => total + p.salary, 0);
    };

    const getMonthlyPayroll = () => {
        return payouts.reduce((total, p) => total + p.salary, 0);
    };

    const processPayout = (payoutData: Partial<TeacherPayout>) => {
        if (payoutData.id) {
            setPayouts(payouts.map(payout =>
                payout.id === payoutData.id
                    ? { ...payout, ...payoutData }
                    : payout
            ));
        } else {
            setPayouts([...payouts, {
                id: Date.now().toString(),
                ...payoutData as TeacherPayout
            }]);
        }
    };

    return {
        payouts,
        processPayout,
        getTotalPaid,
        getPendingPayouts,
        getMonthlyPayroll,
    };
};