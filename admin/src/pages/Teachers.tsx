import { useState } from 'react';
import { Plus } from 'lucide-react';
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
                    <button
                        onClick={() => {
                            setSelectedTeacher(null);
                            setIsModalOpen(true);
                        }}
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <Plus size={20} />
                        <span>Add Teacher</span>
                    </button>
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