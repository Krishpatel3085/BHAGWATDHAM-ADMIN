import { useState } from 'react';
import { Plus, BookOpen } from 'lucide-react';
import LectureGrid from '../components/lectures/LectureGrid';
import LectureModal from '../components/lectures/LectureModel';
import { Lecture } from '../types/lecture';

const grades = [
  '1st Grade', '2nd Grade', '3rd Grade', '4th Grade',
  '5th Grade', '6th Grade', '7th Grade', '8th Grade',
  '9th Grade', '10th Grade', '11th Arts Grade', '11th Commerce Grade',
  '11th Science Grade', '12th Science Grade', '12th Commerce Grade',
  '12th Arts Grade',
];

const Lectures = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLecture, setSelectedLecture] = useState<Lecture | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);

  const role = localStorage.getItem('role');

  return (
    <>
      {!selectedGrade ? (
        <div className="space-y-6">
          <div className="bg-[#1e2746] rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-xl font-semibold text-white">Class Timetables</h1>
                <p className="text-gray-400 text-sm mt-1">Select a grade to view or manage its timetable</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {grades.map((grade) => (
                <button
                  key={grade}
                  onClick={() => setSelectedGrade(grade)}
                  className="bg-[#252d3d] p-6 rounded-xl hover:bg-[#2a324a] transition-colors group"
                >
                  <div className="flex flex-col items-center gap-4">
                    <div className="p-3 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                      <BookOpen className="w-6 h-6 text-blue-500" />
                    </div>
                    <div className="text-center">
                      <h3 className="text-white font-medium">{grade}</h3>
                      <p className="text-gray-400 text-sm mt-1">View Timetable</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-[#1e2746] rounded-xl p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <div className="items-center gap-2">
                  <button
                    onClick={() => setSelectedGrade(null)}
                    className="text-gray-400 hover:text-white transition-colors text-2xl"
                  >
                    ← Back
                  </button>
                  <h1 className="text-xl font-semibold text-white">{selectedGrade} Timetable</h1>
                </div>
                <p className="text-gray-400 text-sm mt-1">Manage daily lecture schedule</p>
              </div>
              {role === 'Teacher' || role === 'Principal' ? (

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
              ) : (
                ''
              )}
            </div>

            <LectureGrid selectedGrade={selectedGrade}
              onEdit={(lecture) => {
                setSelectedLecture(lecture); 
                setIsModalOpen(true); 
              }} />
          </div>

          <LectureModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedLecture(null);
            }}
            lecture={selectedLecture}
            defaultGrade={selectedGrade}
          />
        </div>
      )}
    </>
  );
};

export default Lectures;
