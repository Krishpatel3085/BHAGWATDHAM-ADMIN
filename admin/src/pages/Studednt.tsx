import { useState } from 'react';
import StudentTable from '../components/students/StudentTable';
import StudentModal from '../components/students/StudentModal';
import { Student } from '../types/student';
import AttendanceModal from '../components/attendance/AttendanceModel';
import AttendanceCalendarModal from '../components/attendance/AttendanceCalendarModal';

const Studednt = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);

  const handleEdit = (student: Student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };
  const handleAttendance = (student: Student) => {
    setSelectedStudent(student);
    setIsAttendanceModalOpen(true);
  };
  const handleViewAttendance = (student: Student) => {
    setSelectedStudent(student);
    setIsCalendarModalOpen(true);
  };
  return (
    <>

      <div className="bg-[#1e2746] rounded-xl p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-xl font-semibold text-white">Student Management</h1>
            <p className="text-gray-400 text-sm mt-1">Manage student information and records</p>
          </div>
        </div>

        <StudentTable onEdit={handleEdit} onAttendance={handleAttendance} onViewAttendance={handleViewAttendance} />
      </div>

      <StudentModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedStudent(null);
        }}
        student={selectedStudent}
      />

      {isAttendanceModalOpen && selectedStudent && (
        <AttendanceModal
          isOpen={isAttendanceModalOpen}
          onClose={() => {
            setIsAttendanceModalOpen(false);
            setSelectedStudent(null);
          }}
          type="student"
          user={selectedStudent}
        />
      )}


      {isCalendarModalOpen && selectedStudent && (
        <AttendanceCalendarModal
          isOpen={isCalendarModalOpen}
          onClose={() => {
            setIsCalendarModalOpen(false);
            setSelectedStudent(null);
          }}
          type="student"
          student={selectedStudent}
        />
      )}
    </>
  );
};

export default Studednt;