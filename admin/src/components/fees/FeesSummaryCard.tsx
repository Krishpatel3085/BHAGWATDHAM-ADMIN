// import React from 'react';
import { DollarSign, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { useFees } from '../../hooks/useFees';

const FeesSummaryCards = () => {
    const { getTotalCollected, getTotalPending, getTotalOverdue } = useFees();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#1e2746] p-5 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-[#252d3d] rounded-lg">
                            <DollarSign className="text-green-500" size={20} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">Total Collected</p>
                            <h3 className="text-xl font-bold mt-0.5 text-white">
                                ${getTotalCollected().toLocaleString()}
                            </h3>
                        </div>
                    </div>
                </div>
                <p className="text-xs text-gray-400">Updated just now</p>
            </div>

            <div className="bg-[#1e2746] p-5 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-[#252d3d] rounded-lg">
                            <Clock className="text-yellow-500" size={20} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">Pending Fees</p>
                            <h3 className="text-xl font-bold mt-0.5 text-white">
                                ${getTotalPending().toLocaleString()}
                            </h3>
                        </div>
                    </div>
                </div>
                <p className="text-xs text-gray-400">From {getTotalPending(true)} students</p>
            </div>

            <div className="bg-[#1e2746] p-5 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-[#252d3d] rounded-lg">
                            <AlertCircle className="text-red-500" size={20} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">Overdue Fees</p>
                            <h3 className="text-xl font-bold mt-0.5 text-white">
                                ${getTotalOverdue().toLocaleString()}
                            </h3>
                        </div>
                    </div>
                </div>
                <p className="text-xs text-gray-400">From {getTotalOverdue(true)} students</p>
            </div>

            <div className="bg-[#1e2746] p-5 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-[#252d3d] rounded-lg">
                            <CheckCircle className="text-blue-500" size={20} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">This Month</p>
                            <h3 className="text-xl font-bold mt-0.5 text-white">
                                ${getTotalCollected(true).toLocaleString()}
                            </h3>
                        </div>
                    </div>
                </div>
                <p className="text-xs text-gray-400">Updated monthly</p>
            </div>
        </div>
    );
};

export default FeesSummaryCards;