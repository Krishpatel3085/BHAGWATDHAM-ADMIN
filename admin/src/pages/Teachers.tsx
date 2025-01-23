import { useState } from 'react';
import TeacherTable from '../components/teachers/TeacherTable';
import TeacherModal from '../components/teachers/TeacherModel';
import { Teacher } from '../types/teacher';
import AttendanceModal from '../components/attendance/AttendanceModel';
const Teachers = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
    const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);
    const handleEdit = (teacher: Teacher) => {
        setSelectedTeacher(teacher);
        setIsModalOpen(true);
    };

    const handleAttendance = (teacher: Teacher) => {
        setSelectedTeacher(teacher);
        setIsAttendanceModalOpen(true);
    };


    return (
        <>
            <div className="bg-[#1e2746] rounded-xl p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <h1 className="text-xl font-semibold text-white">Teacher Management</h1>
                </div>

                <TeacherTable onEdit={handleEdit} onAttendance={handleAttendance} />
            </div>

            <TeacherModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedTeacher(null);
                }}
                teacher={selectedTeacher}
            />

            {isAttendanceModalOpen && selectedTeacher && (
                <AttendanceModal
                    isOpen={isAttendanceModalOpen}
                    onClose={() => {
                        setIsAttendanceModalOpen(false);
                        setSelectedTeacher(null);
                    }}
                    type="teacher"
                    user={selectedTeacher}
                />
            )}

        </>
    );
}

export default Teachers;