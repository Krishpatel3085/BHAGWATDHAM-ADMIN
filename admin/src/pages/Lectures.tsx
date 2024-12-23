
// export default function Lectures() {
//   return (
//     <>
//       <h1 className="text-center text-white text-3xl">Comming Soon</h1>
//     </>
//   )
// }
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import LectureGrid from '../components/lectures/LectureGrid';
import LectureModal from '../components/lectures/LectureModel';
import { Lecture } from '../types/lecture';

const Lectures = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLecture, setSelectedLecture] = useState<Lecture | null>(null);

  const handleEdit = (lecture: Lecture) => {
    setSelectedLecture(lecture);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="bg-[#1e2746] rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-semibold text-white">Lecture Time Table</h1>
            <p className="text-gray-400 text-sm mt-1">Manage daily lecture schedule</p>
          </div>
          <button
            onClick={() => {
              setSelectedLecture(null);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
            <span>Add Lecture</span>
          </button>
        </div>

        <LectureGrid onEdit={handleEdit} />
      </div>

      <LectureModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedLecture(null);
        }}
        lecture={selectedLecture}
      />
    </>
  );
};

export default Lectures;