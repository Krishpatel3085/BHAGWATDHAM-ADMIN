import { useState, useEffect } from 'react';
import { useFees } from './useFees';
import { FeePayment } from '../types/fees';

const initialFormData = {
    studentName: '',
    rollNo: '',
    grade: '',
    totalAmount: 0,
    paidAmount: 0,
    dueDate: new Date().toISOString().split('T')[0],
    paymentMethod: '',
};

export const useFeesForm = (payment: FeePayment | null, onClose: () => void) => {
    const [formData, setFormData] = useState(initialFormData);
    const { recordPayment } = useFees();

    useEffect(() => {
        if (payment) {
            setFormData({
                studentName: payment.studentName,
                rollNo: payment.rollNo,
                grade: payment.grade,
                totalAmount: payment.totalAmount,
                paidAmount: payment.paidAmount,
                dueDate: payment.dueDate,
                paymentMethod: payment.paymentMethod || '',
            });
        } else {
            setFormData(initialFormData);
        }
    }, [payment]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name.includes('Amount') ? Number(value) : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const dueAmount = formData.totalAmount - formData.paidAmount;
        const status = dueAmount <= 0 ? 'paid' : dueAmount === formData.totalAmount ? 'pending' : 'partial';

        const paymentData = {
            ...formData,
            dueAmount,
            status,
            lastPaymentDate: new Date().toISOString().split('T')[0],
            receiptNo: `RCP${Date.now().toString().slice(-4)}`,
        };

        if (payment) {
            recordPayment({ id: payment.id, ...paymentData });
        } else {
            recordPayment({
                id: Date.now().toString(),
                studentId: `STU${Date.now().toString().slice(-4)}`,
                ...paymentData,
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