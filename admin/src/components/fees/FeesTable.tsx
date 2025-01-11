import React from 'react';
import { Receipt, Eye, Download } from 'lucide-react';
import { useFees } from '../../hooks/useFees';
import StatusBadge from './StatusBadge';

interface FeesTableProps {
    onPayment: (payment: any) => void;
}

const FeesTable: React.FC<FeesTableProps> = ({ onPayment }) => {
    const { payments } = useFees();

    return (
        <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px]">
                <thead>
                    <tr className="text-left">
                        <th className="pb-4 text-sm font-medium text-gray-400">Student</th>
                        <th className="pb-4 text-sm font-medium text-gray-400">Roll No</th>
                        <th className="pb-4 text-sm font-medium text-gray-400">Grade</th>
                        <th className="pb-4 text-sm font-medium text-gray-400">Total Amount</th>
                        <th className="pb-4 text-sm font-medium text-gray-400">Paid Amount</th>
                        <th className="pb-4 text-sm font-medium text-gray-400">Due Date</th>
                        <th className="pb-4 text-sm font-medium text-gray-400">Status</th>
                        <th className="pb-4 text-sm font-medium text-gray-400">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-sm">
                    {payments.map((payment) => (
                        <tr key={payment.id} className="border-t border-gray-700">
                            <td className="py-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-[#252d3d] rounded-lg">
                                        <Receipt size={16} className="text-violet-400" />
                                    </div>
                                    <span className="text-white">{payment.name}</span>
                                </div>
                            </td>
                            <td className="py-4 text-gray-300">{payment.studentId}</td>
                            <td className="py-4 text-gray-300">{payment.grade}</td>
                            <td className="py-4 text-gray-300">${payment.TotalAmount}</td>
                            <td className="py-4 text-gray-300">${payment.PaidAmount}</td>
                            <td className="py-4 text-gray-300">
                                {payment.dueDate}
                            </td>
                            <td className="py-4">
                                <StatusBadge status={payment.status as PaymentStatus || 'pending'} />
                            </td>
                            <td className="py-4">
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => onPayment(payment)}
                                        className="p-1.5 hover:bg-[#252d3d] rounded-lg text-blue-400 hover:text-blue-300"
                                        title="Record Payment"
                                    >
                                        <Receipt size={16} />
                                    </button>
                                    <button
                                        className="p-1.5 hover:bg-[#252d3d] rounded-lg text-green-400 hover:text-green-300"
                                        title="View Details"
                                    >
                                        <Eye size={16} />
                                    </button>
                                    <button
                                        className="p-1.5 hover:bg-[#252d3d] rounded-lg text-violet-400 hover:text-violet-300"
                                        title="Download Receipt"
                                    >
                                        <Download size={16} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FeesTable;