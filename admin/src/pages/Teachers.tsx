import { useState } from 'react';
import TeacherTable from '../components/teachers/TeacherTable';
import TeacherModal from '../components/teachers/TeacherModel';
import { Teacher } from '../types/teacher';

const Teachers = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

    const handleEdit = (teacher: Teacher) => {
        setSelectedTeacher(teacher);
        setIsModalOpen(true);
    };

    return (
        <>
            <div className="bg-[#1e2746] rounded-xl p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <h1 className="text-xl font-semibold text-white">Teacher Management</h1>
                </div>

                <TeacherTable onEdit={handleEdit} />
            </div>

            <TeacherModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedTeacher(null);
                }}
                teacher={selectedTeacher}
            />
        </>
    );
}

export default Teachers;