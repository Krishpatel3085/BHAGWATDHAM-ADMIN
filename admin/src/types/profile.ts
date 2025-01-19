export interface ProfileData {
    studentId: string;
    name: string;
    grade: string;
    parentName: string;
    parentPhone: string;
    address: string;
    url?: string;
    totalFees: number;
    paidFees: number;
    age: number;
    feesStatus: 'paid' | 'pending';
    Fees: {
        TotalAmount: number;
        PaidAmount: number;
    }[]

}