export type PaymentStatus = 'paid' | 'pending' | 'overdue';
export type PaymentMethod = 'cash' | 'card' | 'upi' | 'bank_transfer';

export interface FeePayment {
    id: string;
    studentId: string;
    name: string;
    grade: string;
    dueAmount: number;
    lastPaymentDate: string;
    status: PaymentStatus;
    paymentMethod?: PaymentMethod;
    receiptNo?: string;
    parentName: string;
    parentPhone: string;
    PaidAmount: number;
    TotalAmount: number;
    Fees: {
        TotalAmount: number;
        PaidAmount: number;
        dueDate: string;
        status: PaymentStatus;
        lastPaymentDate?: string;
        receiptNo?: string;
        paymentMethod?: PaymentMethod;

    }[],


}