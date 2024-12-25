import { useState } from 'react';
import { Plus } from 'lucide-react';
import PayoutTable from '../components/payout/PayoutTable';
// import PayoutModal from '../components/payout/PayoutModal';
import PayoutSummaryCards from '../components/payout/PayoutSummaryCard';
import { TeacherPayout } from '../types/payout';

const Payout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPayout, setSelectedPayout] = useState<TeacherPayout | null>(null);

  const handlePayout = (payout: TeacherPayout) => {
    setSelectedPayout(payout);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="space-y-6">
        <PayoutSummaryCards />

        <div className="bg-[#1e2746] rounded-xl p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-xl font-semibold text-white">Salary Payouts</h1>
              <p className="text-gray-400 text-sm mt-1">Manage teacher salary payments</p>
            </div>
            <button
              onClick={() => {
                setSelectedPayout(null);
                setIsModalOpen(true);
              }}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus size={20} />
              <span>Process Payout</span>
            </button>
          </div>

          <PayoutTable onPayout={handlePayout} />
        </div>
      </div>

      {/* <PayoutModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedPayout(null);
        }}
        payout={selectedPayout}
      /> */}
    </>
  );
};

export default Payout;