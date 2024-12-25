export type PaymentStatus = 'paid' | 'pending' | 'overdue' | 'partial';
export type PaymentMethod = 'cash' | 'card' | 'upi' | 'bank_transfer';

export interface FeePayment {
    id: string;
    studentId: string;
    studentName: string;
    grade: string;
    rollNo: string;
    totalAmount: number;
    paidAmount: number;
    dueAmount: number;
    dueDate: string;
    lastPaymentDate?: string;
    status: PaymentStatus;
    paymentMethod?: PaymentMethod;
    receiptNo?: string;
}