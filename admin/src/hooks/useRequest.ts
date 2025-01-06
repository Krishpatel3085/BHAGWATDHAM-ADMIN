import { useState, useEffect } from 'react';
import { Request } from '../types/request';
import axios from 'axios';
import { APi_URL } from '../Server';
// const API_URL = 'https://ldfs6814-8000.inc1.devtunnels.ms/';

export const useRequests = () => {
    const [requests, setRequests] = useState<Request[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch requests from the API
    const fetchRequests = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${APi_URL}user/get`);
            setRequests(response.data);
        } catch (err: any) {
            console.error('Error fetching requests:', err);
            setError(err.message || 'Failed to fetch user requests.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    // Update user request status
    const updateUserStatus = async (_id: string, status: string) => {
        try {
            const response = await axios.put(`${APi_URL}user/request`, { userId: _id, status });
            setRequests((prevRequests) =>
                prevRequests.map((request) =>
                    request.id === _id ? { ...request, status: response.data.user.status } : request
                )
            );
            fetchRequests();
        } catch (err) {
            console.error('Error updating user status:', err);
            alert('Failed to update user status. Please try again.');
        }
    };

    const handleApprove = (_id: string) => {
        updateUserStatus(_id, 'Approved');
    };

    const handleReject = (_id: string) => {
        updateUserStatus(_id, 'Rejected');
    };

    // Fetch requests when the component using the hook mounts
    useEffect(() => {
        fetchRequests();
    }, []);

    return {
        requests,
        loading,
        error,
        handleApprove,
        handleReject,
        refetch: fetchRequests, // Add refetch for manual reloading
    };
};
