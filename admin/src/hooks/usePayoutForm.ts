import { useState, useEffect } from 'react';
import { usePayouts } from './usePayout';
import { TeacherPayout } from '../types/payout';

const initialFormData = {
    name: '',
    employeeNo: '',
    subject: '',
    salary: '',
    bonus: '',
    deductions: '',
    paymentMethod: '',
    remarks: '',
    id: '',
};

export const usePayoutForm = (payout: TeacherPayout | null, onClose: () => void) => {
    const [formData, setFormData] = useState(initialFormData);
    const { updatePayout } = usePayouts();

    useEffect(() => {
        if (payout) {
            setFormData({
                name: payout.name,
                employeeNo: payout.employeeNo,
                subject: payout.subject,
                salary: payout.salary.toString(),
                bonus: payout.bonus?.toString() || '',
                deductions: payout.deductions?.toString() || '',
                paymentMethod: payout.paymentMethod,
                remarks: payout.remarks || '',
                id: payout.id,
            });
        } else {
            setFormData(initialFormData);
        }
    }, [payout]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const payoutData = {
            name: formData.name,
            employeeNo: formData.employeeNo,
            subject: formData.subject,
            salary: Number(formData.salary),
            bonus: formData.bonus ? Number(formData.bonus) : undefined,
            deductions: formData.deductions ? Number(formData.deductions) : undefined,
            paymentMethod: formData.paymentMethod as TeacherPayout['paymentMethod'],
            payoutDate: new Date().toISOString().split('T')[0],
            status: 'processing' as const,
            remarks: formData.remarks || undefined,
        };

        if (payout) {
            updatePayout({ id: payout.id, ...payoutData });
        } else {
            updatePayout({
                id: Date.now().toString(),
                teacherId: `T${Date.now().toString().slice(-4)}`,
                ...payoutData,
            });
        }

        onClose();
    };

    return {
        formData,
        handleChange,
        handleSubmit,
    };
};