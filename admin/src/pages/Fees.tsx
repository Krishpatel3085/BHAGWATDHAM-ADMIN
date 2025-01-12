import { useState } from 'react';
import { Plus } from 'lucide-react';
import FeesTable from '../components/fees/FeesTable';
import FeesModal from '../components/fees/FeesModel';
import FeesSummaryCards from '../components/fees/FeesSummaryCard';
import { FeePayment } from '../types/fees';

const Fees = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState<FeePayment | null>(null);

    const handlePayment = (payment: FeePayment) => {
        setSelectedPayment(payment);
        setIsModalOpen(true);
    };

    const role = localStorage.getItem('role');
    return (
        <>
            <div className="space-y-6">
                {role === 'Principal' ? (

                    <FeesSummaryCards />
                ) : ('')}

                <div className="bg-[#1e2746] rounded-xl p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                        <div>
                            <h1 className="text-xl font-semibold text-white">Fees Management</h1>
                            <p className="text-gray-400 text-sm mt-1">Track and manage student fees</p>
                        </div>
                        {role === 'Principal' ? (
                            <button
                                onClick={() => {
                                    setSelectedPayment(null);
                                    setIsModalOpen(true);
                                }}
                                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <Plus size={20} />
                                <span>Record Payment</span>
                            </button>

                        ) : ('')}
                    </div>

                    <FeesTable onPayment={handlePayment} />
                </div>
            </div>

            <FeesModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedPayment(null);
                }}
                payment={selectedPayment}
            />
        </>
    );
};

export default Fees;