import { Request, RequestStatus } from '../types/request';

export const updateRequestStatus = async (
    requestId: string,
    status: RequestStatus
): Promise<void> => {
    // In a real application, this would make an API call to update the status
    console.log(`Updating request ${requestId} to ${status}`);
};

export const fetchRequests = async (): Promise<Request[]> => {
    // In a real application, this would fetch from an API
    return [];
};

export const createRequest = async (request: Omit<Request, 'id' | 'status'>): Promise<Request> => {
    // In a real application, this would make an API call to create a new request
    return {
        ...request,
        id: Date.now().toString(),
        status: 'pending',
    };
};