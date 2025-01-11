export type PaymentStatus = 'paid' | 'pending' | 'overdue';
export type PaymentMethod = 'cash' | 'card' | 'upi' | 'bank_transfer';

export interface FeePayment {
    id: string;
    studentId: string;
    name: string;
    grade: string;
    TotalAmount: number;
    PaidAmount: number;
    dueAmount: number;
    dueDate: string;
    lastPaymentDate?: string;
    status: PaymentStatus;
    paymentMethod?: PaymentMethod;
    receiptNo?: string;
}