import { useState } from 'react';
import { Request } from '../types/request';

const initialRequests: Request[] = [
    {
        id: '1',
        userId: 'user1',
        name: 'John Smith',
        role: 'teacher',
        requestDate: '2024-01-15',
        status: 'pending',
        imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        id: '2',
        userId: 'user2',
        name: 'Sarah Johnson',
        role: 'student',
        requestDate: '2024-01-16',
        status: 'approved',
        imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        id: '3',
        userId: 'user3',
        name: 'Michael Brown',
        role: 'teacher',
        requestDate: '2024-01-17',
        status: 'rejected',
        imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
];

export const useRequests = () => {
    const [requests, setRequests] = useState<Request[]>(initialRequests);

    const handleApprove = (id: string) => {
        setRequests(requests.map(request =>
            request.id === id ? { ...request, status: 'approved' } : request
        ));
    };

    const handleReject = (id: string) => {
        setRequests(requests.map(request =>
            request.id === id ? { ...request, status: 'rejected' } : request
        ));
    };

    return {
        requests,
        handleApprove,
        handleReject,
    };
};