import React, { useState } from 'react';
import { DollarSign, Eye } from 'lucide-react';
import { usePayouts } from '../../hooks/usePayout';
import PayoutStatusBadge from './PayoutStatusBadge';
import { PayoutStatus } from '../../types/payout';
import PayoutReceipt from './PayoutReceipt';
interface PayoutTableProps {
    onPayout: (payout: any) => void;
}

const PayoutTable: React.FC<PayoutTableProps> = ({ onPayout }) => {
    const { payouts } = usePayouts();
    const [selectedPayout, setSelectedPayout] = useState(null);
    const [isReceiptOpen, setIsReceiptOpen] = useState(false);
    return (
        <>
            <div className="overflow-x-auto">
                <table className="w-full min-w-[1000px]">
                    <thead>
                        <tr className="text-left">
                            <th className="pb-4 text-sm font-medium text-gray-400">Teacher</th>
                            <th className="pb-4 text-sm font-medium text-gray-400">Employee ID</th>
                            <th className="pb-4 text-sm font-medium text-gray-400">Department</th>
                            <th className="pb-4 text-sm font-medium text-gray-400">Salary</th>
                            <th className="pb-4 text-sm font-medium text-gray-400">Bonus</th>
                            <th className="pb-4 text-sm font-medium text-gray-400">Total</th>
                            <th className="pb-4 text-sm font-medium text-gray-400">Net Pay</th>
                            <th className="pb-4 text-sm font-medium text-gray-400">Status</th>
                            <th className="pb-4 text-sm font-medium text-gray-400">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {payouts.map((payout) => (
                            <tr key={payout.id} className="border-t border-gray-700">
                                <td className="py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-[#252d3d] rounded-lg">
                                            <DollarSign size={16} className="text-violet-400" />
                                        </div>
                                        <span className="text-white">{payout.name}</span>
                                    </div>
                                </td>
                                <td className="py-4 text-gray-300">{payout.employeeNo}</td>
                                <td className="py-4 text-gray-300">{payout.subject}</td>
                                <td className="py-4 text-gray-300">${payout.salary}</td>
                                <td className="py-4 text-gray-300">${payout.bonus || 0}</td>
                                <td className="py-4 text-gray-300">${payout.total || 0}</td>
                                <td className="py-4 text-gray-300">
                                    ${payout.NetPay}
                                </td>
                                <td className="py-4">
                                    <PayoutStatusBadge status={payout.status as PayoutStatus || 'pending'} />
                                </td>
                                <td className="py-4">
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => onPayout(payout)}
                                            className="p-1.5 hover:bg-[#252d3d] rounded-lg text-blue-400 hover:text-blue-300"
                                            title="Process Payout"
                                        >
                                            <DollarSign size={16} />
                                        </button>
                                        <button
                                            onClick={() => {
                                                setSelectedPayout(payout);
                                                setIsReceiptOpen(true);
                                            }}
                                            className="p-1.5 hover:bg-[#252d3d] rounded-lg text-green-400 hover:text-green-300"
                                            title="View Receipt"
                                        >
                                            <Eye size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <PayoutReceipt
                isOpen={isReceiptOpen}
                onClose={() => {
                    setIsReceiptOpen(false);
                    setSelectedPayout(null);
                }}
                payout={selectedPayout}
            />
        </>
    );
};

export default PayoutTable;