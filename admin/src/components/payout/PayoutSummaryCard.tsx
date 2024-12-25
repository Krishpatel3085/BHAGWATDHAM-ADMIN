import { DollarSign, Users, TrendingUp, Calendar } from 'lucide-react';
import { usePayouts } from '../../hooks/usePayout';

const PayoutSummaryCards = () => {
    const { getTotalPaid, getPendingPayouts, getMonthlyPayroll } = usePayouts();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#1e2746] p-5 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-[#252d3d] rounded-lg">
                            <DollarSign className="text-green-500" size={20} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">Total Paid</p>
                            <h3 className="text-xl font-bold mt-0.5 text-white">
                                ${getTotalPaid().toLocaleString()}
                            </h3>
                        </div>
                    </div>
                </div>
                <p className="text-xs text-gray-400">All time payouts</p>
            </div>

            <div className="bg-[#1e2746] p-5 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-[#252d3d] rounded-lg">
                            <Users className="text-blue-500" size={20} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">Active Teachers</p>
                            <h3 className="text-xl font-bold mt-0.5 text-white">
                                {getPendingPayouts(true)}
                            </h3>
                        </div>
                    </div>
                </div>
                <p className="text-xs text-gray-400">Pending payouts</p>
            </div>

            <div className="bg-[#1e2746] p-5 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-[#252d3d] rounded-lg">
                            <TrendingUp className="text-violet-500" size={20} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">Average Salary</p>
                            <h3 className="text-xl font-bold mt-0.5 text-white">
                                ${(getMonthlyPayroll() / getPendingPayouts(true)).toLocaleString()}
                            </h3>
                        </div>
                    </div>
                </div>
                <p className="text-xs text-gray-400">Per teacher</p>
            </div>

            <div className="bg-[#1e2746] p-5 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-[#252d3d] rounded-lg">
                            <Calendar className="text-yellow-500" size={20} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">Monthly Payroll</p>
                            <h3 className="text-xl font-bold mt-0.5 text-white">
                                ${getMonthlyPayroll().toLocaleString()}
                            </h3>
                        </div>
                    </div>
                </div>
                <p className="text-xs text-gray-400">Current month</p>
            </div>
        </div>
    );
};

export default PayoutSummaryCards;