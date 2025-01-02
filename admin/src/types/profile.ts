export interface ProfileData {
    studentId: string;
    name: string;
    grade: string;
    parentName: string;
    parentPhone: string;
    address: string;
    imageUrl?: string;
    totalFees: number;
    paidFees: number;
    feesStatus: 'paid' | 'pending';
}