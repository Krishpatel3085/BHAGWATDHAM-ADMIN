import React from 'react';
import { RequestStatus } from '../../types/request';

interface RequestStatusBadgeProps {
    status: RequestStatus;
}

const RequestStatusBadge: React.FC<RequestStatusBadgeProps> = ({ status }) => {
    const getStatusStyles = () => {
        switch (status) {
            case 'Approved':
                return 'bg-green-500/20 text-green-400';
            case 'Rejected':
                return 'bg-red-500/20 text-red-400';
            default:
                return 'bg-yellow-500/20 text-yellow-400';
        }
    };

    return (
        <span className={`px-2 py-1 rounded-full text-xs ${getStatusStyles()}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    );
};

export default RequestStatusBadge;