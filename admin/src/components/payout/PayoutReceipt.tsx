import React from 'react';
import { X, Printer } from 'lucide-react';
import { TeacherPayout } from '../../types/payout';
import PayoutStatusBadge from './PayoutStatusBadge';
import { PayoutStatus } from '../../types/payout';
import logo from '../../image/onlylogo.png'
interface PayoutReceiptProps {
    isOpen: boolean;
    onClose: () => void;
    payout: TeacherPayout | null;
}

const PayoutReceipt: React.FC<PayoutReceiptProps> = ({ isOpen, onClose, payout }) => {
    if (!isOpen || !payout) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="fixed inset-0 bg-black/50" onClick={onClose} />

            <div className="relative min-h-screen flex items-center justify-center p-4">
                <div className="relative bg-white rounded-xl w-full max-w-3xl p-8">
                    <img
                        src={logo}
                        alt="School Logo"
                        className="absolute inset-0 w-[500px] h-[500px] object-contain opacity-10"
                        style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                    />
                    {/* Header Actions */}
                    <div className="absolute top-4 right-4 flex items-center gap-2">
                        <button
                            className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-grey transition-colors"
                            onClick={() => window.print()}
                            title="Print Receipt"
                        >
                            <Printer size={20} />
                        </button>
                        <button
                            onClick={onClose}
                            className="p-2  hover:bg-gray-100  rounded-lg text-gray-600 hover:text-grey transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* School Details */}
                    <div className="text-center mb-6 border-b pb-6">
                        <h1 className="text-2xl font-bold text-gray-900">SMART SCHOOL</h1>
                        <p className="text-gray-600">123 Education Street, Knowledge City - 380015</p>
                        <p className="text-gray-600">Phone: (123) 456-7890 | Email: info@smartschool.edu</p>
                        <h2 className="text-xl font-semibold mt-4 text-gray-800">
                            Salary Receipt
                        </h2>
                        <p className="text-sm text-gray-600 mt-1">
                            Transaction ID: {payout.transactionId || 'Pending'}
                        </p>
                    </div>

                    {/* Teacher Details */}
                    <div className="grid grid-cols-2 gap-6 mb-8">
                        <div className="space-y-2">
                            <p className="text-gray-600">Teacher Name: <span className="font-semibold text-gray-900">{payout.name}</span></p>
                            <p className="text-gray-600">Employee ID: <span className="font-semibold text-gray-900">{payout.employeeNo}</span></p>
                            <p className="text-gray-600">Department: <span className="font-semibold text-gray-900">{payout.subject}</span></p>
                        </div>
                        <div className="space-y-2 text-right">
                            <p className="text-gray-600">Date: <span className="font-semibold text-gray-900">{new Date(payout.month).toLocaleDateString()}</span></p>
                            <p className="text-gray-600">Payment Method: <span className="font-semibold text-gray-900">{payout.paymentMethod}</span></p>
                        </div>
                    </div>

                    {/* Salary Details */}
                    <div className="border rounded-lg overflow-hidden mb-8">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Description</th>
                                    <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700/50">
                                <tr>
                                    <td className="px-6 py-4 text-sm text-gray-900">Basic Salary</td>
                                    <td className="px-6 py-4 text-sm text-gray-900 text-right">₹{payout.salary}</td>
                                </tr>
                                {payout.bonus ? (
                                    <tr>
                                        <td className="px-6 py-4 text-sm text-gray-900">Bonus</td>
                                        <td className="px-6 py-4 text-sm text-gray-900 text-right">₹{payout.bonus}</td>
                                    </tr>
                                ) : null}
                                {payout.total ? (
                                    <tr>
                                        <td className="px-6 py-4 text-sm text-gray-900">Total</td>
                                        <td className="px-6 py-4 text-sm text-gray-900 text-right">-₹{payout.total}</td>
                                    </tr>
                                ) : null}
                                <tr>
                                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">Net Salary</td>
                                    <td className="px-6 py-4 text-sm font-semibold text-gray-900 text-right">
                                        -₹{payout.NetPay}
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot className="bg-gray-50">
                                <tr>
                                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">Status</td>
                                    <td className="px-6 py-4 text-right">
                                        <PayoutStatusBadge status={payout.status as PayoutStatus || 'pending'} />
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>

                    {/* Footer */}
                    <div className="mt-12 pt-8 border-t border-gray-700/50">
                        <div className="flex justify-between items-center">
                            <div className="text-center">
                                <div className="mt-16 pt-2 border-t border-gray-700/50">
                                    <p className="text-sm text-gray-900">Accountant's Signature</p>
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="mt-16 pt-2 border-t border-gray-700/50">
                                    <p className="text-sm text-gray-600">Principal's Signature</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 text-center text-sm text-gray-900">
                            <p>This is a computer generated salary receipt and does not require a physical signature.</p>
                            <p className="mt-1">For any queries, please contact the accounts department.</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default PayoutReceipt;