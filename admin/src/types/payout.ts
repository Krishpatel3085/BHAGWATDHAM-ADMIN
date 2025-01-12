export type PayoutStatus = 'paid' | 'pending' | 'processing';
export type PayoutMethod = 'bank_transfer' | 'cash' | 'check' | 'upi';

export interface TeacherPayout {
    id: string;
    teacherId: string;
    name: string;
    employeeNo: string;
    subject: string;
    salary: number;
    bonus?: number;
    deductions?: number;
    payoutDate: string;
    paymentMethod: PayoutMethod;
    status: PayoutStatus;
    transactionId?: string;
    remarks?: string;
}