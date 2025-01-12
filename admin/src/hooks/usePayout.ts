import { useEffect, useState } from 'react';
import { TeacherPayout } from '../types/payout';
import axios from 'axios';
import { APi_URL } from '../Server';

export const usePayouts = () => {
    const [payouts, setPayouts] = useState<TeacherPayout[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTeacher = async () => {
            try {
                const response = await axios.get(APi_URL + 'teacher/getAllTeacher');
                console.log(response.data)
                const data = response.data;
                setPayouts(data.teachers);
            } catch (error) {
                console.error("Error fetching teachers:", error); // Handle errors
            }
        };

        fetchTeacher();
    }, []);


    const updatePayout = async (paymentData: TeacherPayout) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.put(`${APi_URL}teacher/Payout`, paymentData);
            const UpdateTeacher = response.data.teacher;
            setPayouts(payouts.map(payout =>
                payout.id === UpdateTeacher.id ? UpdateTeacher : payout
            ));
        } catch (err) {
            setError('Failed to update student fees');
            console.error('Error updating fees:', err);
        } finally {
            setLoading(false);
        }
    };

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
        loading,
        error,
        updatePayout,
    };
};