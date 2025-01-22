import { useState, useEffect } from 'react';
import { useFees } from './useFees';
import { FeePayment } from '../types/fees';

// Initial form data structure aligned with backend response
const initialFormData = {
    id: 'id',
    studentName: '',
    studentId: '',
    grade: '',
    TotalAmount: 0,
    PaidAmount: 0,
    dueDate: new Date().toISOString().split('T')[0], // Default to today
    paymentMethod: '',
    parentName: '',
    parentPhone: '',
    lastPaymentDate: '',
    receiptNo: '',
};

export const useFeesForm = (payment: FeePayment | null, onClose: () => void) => {
    const [formData, setFormData] = useState(initialFormData);
    const { updateFees } = useFees();

    useEffect(() => {
        if (payment) {
            setFormData({
                id: payment.id,
                studentName: payment.name || '',
                studentId: payment.studentId || '',
                grade: payment.grade || '',
                TotalAmount: payment.Fees?.[0]?.TotalAmount || 0,
                PaidAmount: payment.Fees?.[0]?.PaidAmount || 0,
                dueDate: payment.Fees?.[0]?.dueDate || new Date().toISOString().split('T')[0],
                paymentMethod: payment.paymentMethod || '',
                parentName: payment.parentName || '',
                parentPhone: payment.parentPhone || '',
                lastPaymentDate: payment.Fees?.[0]?.lastPaymentDate || '',
                receiptNo: payment.Fees?.[0]?.receiptNo || ''
            });
        } else {
            setFormData(initialFormData);
        }
    }, [payment]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name.includes('Amount') ? Number(value) : value, // Parse numeric inputs
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Calculate dueAmount and status
        const totalAmount = formData.TotalAmount || 0;
        const paidAmount = formData.PaidAmount || 0;
        const dueAmount = totalAmount - paidAmount;

        const status: 'paid' | 'pending' | 'overdue' = dueAmount <= 0 ? 'paid'
            : dueAmount === totalAmount
                ? 'pending'
                : new Date(formData.dueDate) < new Date() && dueAmount > 0
                    ? 'overdue'
                    : 'pending';

        // Construct payment data to send to backend
        const paymentData = {
            ...formData,
            Fees: [
                {
                    TotalAmount: totalAmount,
                    PaidAmount: paidAmount,
                    dueAmount,
                    status,
                    dueDate: formData.dueDate || '',
                    lastPaymentDate: formData.lastPaymentDate || new Date().toISOString().split('T')[0],
                    paymentMethod: formData.paymentMethod || '',
                    receiptNo:  `RCP${Date.now().toString().slice(-4)}`,

                },
            ],
            lastPaymentDate: new Date().toISOString().split('T')[0],
            receiptNo: `RCP${Date.now().toString().slice(-4)}`,
            id: payment?.id || Date.now().toString(),
        };

        // Call update function with appropriate data
        if (payment) {
            updateFees({ id: payment.id, ...paymentData });
        } else {
            updateFees({
                id: Date.now().toString(),
                studentId: `STU${Date.now().toString().slice(-4)}`,
                ...paymentData,
            });
        }

        onClose(); // Close the modal on successful submission
    };

    return {
        formData,
        handleChange,
        handleSubmit,
    };
};
