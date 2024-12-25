import React from 'react';
import { PayoutStatus } from '../../types/payout';

interface PayoutStatusBadgeProps {
    status: PayoutStatus;
}

const PayoutStatusBadge: React.FC<PayoutStatusBadgeProps> = ({ status }) => {
    const getStatusStyles = () => {
        switch (status) {
            case 'paid':
                return 'bg-green-500/20 text-green-400';
            case 'pending':
                return 'bg-yellow-500/20 text-yellow-400';
            case 'processing':
                return 'bg-blue-500/20 text-blue-400';
            default:
                return 'bg-gray-500/20 text-gray-400';
        }
    };

    return (
        <span className={`px-2 py-1 rounded-full text-xs ${getStatusStyles()}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    );
};

export default PayoutStatusBadge;