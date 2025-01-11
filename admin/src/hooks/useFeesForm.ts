import { useState, useEffect } from 'react';
import { useFees } from './useFees';
import { FeePayment } from '../types/fees';

const initialFormData = {
    studentName: '',
    studentId: '',
    grade: '',
    TotalAmount: 0,
    PaidAmount: 0,
    dueDate: new Date().toISOString().split('T')[0],
    paymentMethod: '',
};

export const useFeesForm = (payment: FeePayment | null, onClose: () => void) => {
    const [formData, setFormData] = useState(initialFormData);
    const { updateFees } = useFees();

    useEffect(() => {
        if (payment) {
            setFormData({
                studentName: payment.name,
                studentId: payment.studentId,
                grade: payment.grade,
                TotalAmount: payment.TotalAmount,
                PaidAmount: payment.PaidAmount,
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

        // Ensure TotalAmount and PaidAmount are valid numbers
        const totalAmount = formData.TotalAmount || 0;
        const paidAmount = formData.PaidAmount || 0;

        const dueAmount = totalAmount - paidAmount;

        const status: 'paid' | 'pending' | 'overdue' = dueAmount <= 0 ? 'paid' 
            : dueAmount === totalAmount 
                ? 'pending' 
                : new Date(formData.dueDate) < new Date() && dueAmount > 0 
                    ? 'overdue' 
                    : 'pending';

        const paymentData = {
            ...formData,
            dueAmount,
            status,
            lastPaymentDate: new Date().toISOString().split('T')[0],
            receiptNo: `RCP${Date.now().toString().slice(-4)}`,
            id: payment?.id || Date.now().toString(), // Safe fallback if payment is null
        };

        if (payment) {
            updateFees({ id: payment.id, ...paymentData });
        } else {
            updateFees({
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
