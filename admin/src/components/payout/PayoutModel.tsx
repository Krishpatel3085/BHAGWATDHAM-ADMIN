import React from 'react';
import { X } from 'lucide-react';
import { usePayoutForm } from '../../hooks/usePayoutForm';
import { TeacherPayout } from '../../types/payout';

interface PayoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    payout: TeacherPayout | null;
}

const PayoutModal: React.FC<PayoutModalProps> = ({ isOpen, onClose, payout }) => {
    const { formData, handleChange, handleSubmit } = usePayoutForm(payout, onClose);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="fixed inset-0 bg-black/50" onClick={onClose} />

            <div className="relative min-h-screen flex items-center justify-center p-4">
                <div className="relative bg-[#1e2746] rounded-xl w-full max-w-md p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold text-white">
                            {payout ? 'Update Payout' : 'Process Payout'}
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Teacher Name
                            </label>
                            <input
                                type="text"
                                name="teacherName"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full bg-[#252d3d] border border-gray-700 rounded-lg px-4 py-2.5 text-white"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Employee ID
                            </label>
                            <input
                                type="text"
                                name="employeeId"
                                value={formData.employeeNo}
                                onChange={handleChange}
                                className="w-full bg-[#252d3d] border border-gray-700 rounded-lg px-4 py-2.5 text-white"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Department
                            </label>
                            <input
                                type="text"
                                name="department"
                                value={formData.subject}
                                onChange={handleChange}
                                className="w-full bg-[#252d3d] border border-gray-700 rounded-lg px-4 py-2.5 text-white"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                    Base Salary
                                </label>
                                <input
                                    type="number"
                                    name="salary"
                                    value={formData.salary}
                                    onChange={handleChange}
                                    className="w-full bg-[#252d3d] border border-gray-700 rounded-lg px-4 py-2.5 text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                    Bonus
                                </label>
                                <input
                                    type="number"
                                    name="bonus"
                                    value={formData.bonus || ''}
                                    onChange={handleChange}
                                    className="w-full bg-[#252d3d] border border-gray-700 rounded-lg px-4 py-2.5 text-white"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                NetPay
                            </label>
                            <input
                                type="number"
                                name="NetPay"
                                value={formData.NetPay}
                                onChange={handleChange}
                                className="w-full bg-[#252d3d] border border-gray-700 rounded-lg px-4 py-2.5 text-white"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Month
                            </label>
                            <input
                                type="date"
                                name="month"
                                value={formData.month}
                                onChange={handleChange}
                                className="w-full bg-[#252d3d] border border-gray-700 rounded-lg px-4 py-2.5 text-white"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Payment Method
                            </label>
                            <select
                                name="paymentMethod"
                                value={formData.paymentMethod}
                                onChange={handleChange}
                                className="w-full bg-[#252d3d] border border-gray-700 rounded-lg px-4 py-2.5 text-white"
                                required
                            >
                                <option value="">Select Payment Method</option>
                                <option value="bank_transfer">Bank Transfer</option>
                                <option value="cash">Cash</option>
                                <option value="check">Check</option>
                                <option value="upi">UPI</option>
                            </select>
                        </div>


                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                {payout ? 'Update' : 'Process'} Payout
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PayoutModal;