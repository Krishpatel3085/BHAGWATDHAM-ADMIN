import React, { useState, useEffect } from 'react';
import { User, UserCheck, Eye, Search } from 'lucide-react';
import { Student } from '../../types/student';
import { useStudents } from '../../hooks/useStudent';

interface StudentTableProps {
    onEdit: (student: Student) => void;
    onAttendance: (student: Student) => void;
    onViewAttendance: (student: Student) => void;
}

const StudentTable: React.FC<StudentTableProps> = ({ onAttendance, onViewAttendance }) => {
    const { students } = useStudents();

    // Search and Pagination state
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [studentsPerPage, setStudentsPerPage] = useState(10);

    // Filter students based on search query
    const filteredStudents = students.filter((student) =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Calculate pagination
    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

    // Calculate total pages
    const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

    // Handle page change
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Update students per page after first page
    useEffect(() => {
        setStudentsPerPage(currentPage > 1 ? 8 : 10);
    }, [currentPage]);

    return (
        <div className="overflow-x-auto">
            {/* Search Input */}
            {/* Search Input & Title */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 pb-4">
                <div>
                    <h1 className="text-xl font-semibold text-white">Student Management</h1>
                    <p className="text-gray-400 text-sm mt-1">Manage student information and records</p>
                </div>
                <div className="relative w-full max-w-md">
                    <input
                        type="text"
                        placeholder="Search by student name..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setCurrentPage(1); // Reset to first page when searching
                        }}
                        className="w-full px-4 py-2 pl-10 text-white bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-400"
                    />
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                </div>
            </div>


            <table className="w-full min-w-[800px]">
                <thead>
                    <tr className="text-left ">
                        <th className="pb-4 text-sm font-medium text-gray-400">Student Name</th>
                        <th className="pb-4 text-sm font-medium text-gray-400">Parent's Name</th>
                        <th className="pb-4 text-sm font-medium text-gray-400">Parent's Phone</th>
                        <th className="pb-4 text-sm font-medium text-gray-400">Address</th>
                        <th className="pb-4 text-sm font-medium text-gray-400">Grade</th>
                        <th className="pb-4 text-sm font-medium text-gray-400">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-sm">
                    {currentStudents.length > 0 ? (
                        currentStudents.map((student) => (
                            <tr key={student.id} className="border-t border-gray-700">
                                <td className="py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-[#252d3d] rounded-lg">
                                            <User size={16} className="text-violet-400" />
                                        </div>
                                        <span className="text-white">{student.name}</span>
                                    </div>
                                </td>
                                <td className="py-4 text-gray-300">{student.parentName}</td>
                                <td className="py-4 text-gray-300">{student.parentPhone}</td>
                                <td className="py-4 text-gray-300">
                                    {student.address.length > 15 ? `${student.address.slice(0, 15)}...` : student.address}
                                </td>
                                <td className="py-4 text-gray-300">{student.grade}</td>

                                <td className="py-4">
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => onAttendance(student)}
                                            className="p-1.5 hover:bg-[#252d3d] rounded-lg text-green-400 hover:text-green-300"
                                            title="Mark Attendance"
                                        >
                                            <UserCheck size={16} />
                                        </button>
                                        <button
                                            onClick={() => onViewAttendance(student)}
                                            className="p-1.5 hover:bg-[#1e2746] rounded-lg text-blue-400 hover:text-blue-300"
                                            title="View Attendance"
                                        >
                                            <Eye size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6} className="py-4 text-center text-gray-400">
                                No students found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Pagination Controls */}
            {filteredStudents.length > 0 && (
                <div className="flex justify-center gap-2 py-4">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                        className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span className="text-white">{currentPage} of {totalPages}</span>
                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                        className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default StudentTable;
