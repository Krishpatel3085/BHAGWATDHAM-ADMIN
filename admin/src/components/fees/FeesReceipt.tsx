import React from 'react';
import { X, Printer } from 'lucide-react';
import { FeePayment } from '../../types/fees';
import StatusBadge from './StatusBadge';
import { PaymentStatus } from '../../types/fees';
import logo from '../../image/onlylogo.png'

interface FeesReceiptProps {
    isOpen: boolean;
    onClose: () => void;
    payment: FeePayment | null;
}

const FeesReceipt: React.FC<FeesReceiptProps> = ({ isOpen, onClose, payment }) => {

    if (!isOpen || !payment) return null;

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
                            className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-grey transition-colors"
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
                            Fee Receipt
                        </h2>
                        <p className="text-sm text-gray-600 mt-1">Receipt No: {payment.Fees[0]?.receiptNo}</p>
                    </div>

                    {/* Student Details */}
                    <div className="grid grid-cols-2 gap-6 mb-8">
                        <div className="space-y-2">
                            <p className="text-gray-600">Student Name: <span className="font-semibold text-gray-900">{payment.name}</span></p>
                            <p className="text-gray-600">Roll No: <span className="font-semibold text-gray-900">{payment.studentId}</span></p>
                            <p className="text-gray-600">Grade: <span className="font-semibold text-gray-900">{payment.grade}</span></p>
                        </div>
                        <div className="space-y-2 text-right">
                            <p className="text-gray-600">Date: <span className="font-semibold text-gray-900">{new Date(payment.Fees[0]?.lastPaymentDate || '').toLocaleDateString()}</span></p>
                            <p className="text-gray-600">Payment Method: <span className="font-semibold text-gray-900">{payment.Fees[0]?.paymentMethod?.replace('_', ' ').toUpperCase()}</span></p>
                        </div>
                    </div>

                    {/* Payment Details */}
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
                                    <td className="px-6 py-4 text-sm text-gray-900">Total Fees</td>
                                    <td className="px-6 py-4 text-sm text-gray-900 text-right">₹{payment.Fees[0]?.TotalAmount || 0}</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 text-sm text-gray-900">Amount Paid</td>
                                    <td className="px-6 py-4 text-sm text-gray-900 text-right">₹{payment.Fees[0]?.PaidAmount || 0}</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 text-sm text-gray-900">Due Date</td>
                                    <td className="px-6 py-4 text-sm text-gray-900 text-right">{payment.Fees[0]?.dueDate || 0}</td>
                                </tr>
                            </tbody>
                            <tfoot className="bg-gray-50">
                                <tr>
                                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">Payment Status</td>
                                    <td className="px-6 py-4 text-right">


                                        <StatusBadge status={payment.Fees[0]?.status as PaymentStatus || 'pending'} />
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
                                    <p className="text-sm text-gray-600">Accountant's Signature</p>
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="mt-16 pt-2 border-t border-gray-700/50">
                                    <p className="text-sm text-gray-600">Principal's Signature</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 text-center text-sm text-gray-600">
                            <p>This is a computer generated receipt and does not require a physical signature.</p>
                            <p className="mt-1">For any queries, please contact the school office.</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default FeesReceipt;