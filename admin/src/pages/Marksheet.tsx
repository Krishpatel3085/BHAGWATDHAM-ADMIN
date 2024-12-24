import { useState } from 'react';
import { Plus } from 'lucide-react';
import MarksheetTable from '../components/marksheet/MarksheetTable';
import MarksheetModal from '../components/marksheet/MarksheetModel';
import { StudentMark } from '../types/marksheet';

const Marksheet = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMark, setSelectedMark] = useState<StudentMark | null>(null);

  const handleEdit = (mark: StudentMark) => {
    setSelectedMark(mark);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="bg-[#1e2746] rounded-xl p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-xl font-semibold text-white">Student Marksheet</h1>
            <p className="text-gray-400 text-sm mt-1">Manage student examination results</p>
          </div>
          <button
            onClick={() => {
              setSelectedMark(null);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
            <span>Add Result</span>
          </button>
        </div>

        <MarksheetTable onEdit={handleEdit} />
      </div>

      <MarksheetModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedMark(null);
        }}
        mark={selectedMark}
      />
    </>
  );
}

export default Marksheet;