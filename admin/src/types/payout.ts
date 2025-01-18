export type PayoutStatus = 'paid' | 'pending' | 'processing';
export type PayoutMethod = 'bank_transfer' | 'cash' | 'check' | 'upi';

export interface TeacherPayout {
    id?: string;
    teacherId?: string;
    name: string;
    employeeNo: string;
    subject: string;
    salary: number;
    bonus?: number;
    total?: number;
    payoutDate: string;
    paymentMethod: PayoutMethod;
    status?: PayoutStatus;
    transactionId?: string;
    NetPay?: string;
    month: string;
}