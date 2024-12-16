// import React from 'react';
import StudentTableRow from './StudentTableRow';
import { Student } from '../../types/student';

const students: Student[] = [
    {
        id: '1',
        name: 'John Doe',
        phone: '(123) 456-7890',
        address: '1234 Main Street, City, State',
        branch: 'Computer Science',
        dateOfAdmission: '2024-01-15',
    },
    {
        id: '2',
        name: 'Jane Smith',
        phone: '(234) 567-8901',
        address: '5678 Oak Avenue, City, State',
        branch: 'Mechanical',
        dateOfAdmission: '2024-01-14',
    },
    {
        id: '3',
        name: 'Mike Johnson',
        phone: '(345) 678-9012',
        address: '9012 Pine Road, City, State',
        branch: 'Electrical',
        dateOfAdmission: '2024-01-13',
    },
    {
        id: '4',
        name: 'Sarah Williams',
        phone: '(456) 789-0123',
        address: '3456 Elm Street, City, State',
        branch: 'Civil',
        dateOfAdmission: '2024-01-12',
    },
];

const NewStudentList = () => {
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