import StudentTableRow from './StudentTableRow';
import { Student } from '../../types/student';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { APi_URL } from '../../Server';


interface StudentListProps {
    setStudentCount: (count: number) => void; // Explicit type for the callback
}

const NewStudentList: React.FC<StudentListProps> = ({ setStudentCount }) => {
    // const NewStudentList = () => {
    const [students, useStudents] = useState<Student[]>([]);
    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const response = await axios.get(APi_URL + 'student/getAllStudent');
                const data = response.data;
                useStudents(data.students);
                setStudentCount(data.students.length); 
            } catch (error) {
                console.error("Error fetching teachers:", error); // Handle errors
            }
        };

        fetchStudent();
    }, []);
    return (
        <div className="bg-[#1e2746] rounded-xl p-6 mt-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-white">New Student List</h3>
                <button className="text-sm text-blue-400 hover:text-blue-300">View All</button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full min-w-[800px]">
                    <thead>
                        <tr className="text-left">
                            <th className="pb-4 text-sm font-medium text-gray-400">Student Name</th>
                            <th className="pb-4 text-sm font-medium text-gray-400">Phone</th>
                            <th className="pb-4 text-sm font-medium text-gray-400">Address</th>
                            <th className="pb-4 text-sm font-medium text-gray-400">Branch</th>
                            <th className="pb-4 text-sm font-medium text-gray-400">Date of Admission</th>
                            <th className="pb-4 text-sm font-medium text-gray-400">Fee Receipt</th>
                            <th className="pb-4 text-sm font-medium text-gray-400">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {students.map((student) => (
                            <StudentTableRow key={student.id} student={student} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default NewStudentList;