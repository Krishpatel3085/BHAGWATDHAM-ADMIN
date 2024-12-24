export type RequestStatus = 'pending' | 'approved' | 'rejected';
export type UserRole = 'teacher' | 'student' | 'principal';

export interface Request {
    id: string;
    userId: string;
    name: string;
    role: UserRole;
    requestDate: string;
    status: RequestStatus;
    imageUrl: string;
}