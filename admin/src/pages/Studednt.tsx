import { useState } from 'react';
import { Plus } from 'lucide-react';
import StudentTable from '../components/students/StudentTable';
import StudentModal from '../components/students/StudentModal';
import { Student } from '../types/student';

const Studednt = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const handleEdit = (student: Student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  return (
    <>

      <div className="bg-[#1e2746] rounded-xl p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-xl font-semibold text-white">Student Management</h1>
            <p className="text-gray-400 text-sm mt-1">Manage student information and records</p>
          </div>
          <button
            onClick={() => {
              setSelectedStudent(null);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
            <span>Add Student</span>
          </button>
        </div>

        <StudentTable onEdit={handleEdit} />
      </div>

      <StudentModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedStudent(null);
        }}
        student={selectedStudent}
      />
    </>
  );
};

export default Studednt;