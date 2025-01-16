export type RequestStatus = 'Pending' | 'Approved' | 'Rejected';
export type UserRole = 'teacher' | 'student' | 'principal';

export interface Request {
    _id: string;
    id: string;
    userId: string;
    name: string;
    role: UserRole;
    requestDate: string;
    status: RequestStatus;
    imageUrl: string;
    username: string;
    createdAt: string;
}