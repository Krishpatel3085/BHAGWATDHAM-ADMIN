import { useState, useEffect } from 'react';
import { Request } from '../types/request';
import axios from 'axios';
import { APi_URL } from '../Server';

export const useRequests = () => {
    const [requests, setRequests] = useState<Request[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const role = localStorage.getItem('role');

    // Fetch requests from the API
    const fetchRequests = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`${APi_URL}user/get`);
            let requests = response.data;

            // Apply role-based conditions
            if (role === 'Teacher') {
                // Show only students if the role is Teacher
                requests = requests.filter((user: any) => user.role === 'Student');
            } else if (role === 'Principal') {
                // Show all data for Principal (no filtering required)
                requests = response.data;
            } else {
                // Optional: Handle roles that should not access any data
                requests = [];
            }

            setRequests(requests);
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
