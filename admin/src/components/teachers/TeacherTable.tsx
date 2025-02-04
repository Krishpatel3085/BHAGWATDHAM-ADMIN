import React, { useState, useEffect } from 'react';
import { User, UserCheck, Eye, Search } from 'lucide-react';
import { useTeachers } from '../../hooks/useTeachers';
import { Teacher } from '../../types/teacher';

interface TeacherTableProps {
    onEdit: (teacher: Teacher) => void;
    onAttendance: (teacher: Teacher) => void;
    onViewAttendance: (teacher: Teacher) => void;
}

const TeacherTable: React.FC<TeacherTableProps> = ({ onAttendance, onViewAttendance }) => {
    const { teachers } = useTeachers();

    // State for search and pagination
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [teachersPerPage, setTeachersPerPage] = useState(10);

    // Filter teachers based on search query
    const filteredTeachers = teachers.filter((teacher) =>
        teacher.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Calculate pagination
    const indexOfLastTeacher = currentPage * teachersPerPage;
    const indexOfFirstTeacher = indexOfLastTeacher - teachersPerPage;
    const currentTeachers = filteredTeachers.slice(indexOfFirstTeacher, indexOfLastTeacher);

    // Calculate total pages
    const totalPages = Math.ceil(filteredTeachers.length / teachersPerPage);

    // Handle page change
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Update teachers per page after first page
    useEffect(() => {
        setTeachersPerPage(currentPage > 1 ? 8 : 10);
    }, [currentPage]);

    return (
        <div className="overflow-x-auto">
            {/* Search Input */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 pb-4">
                <div>
                    <h1 className="text-xl font-semibold text-white">Teacher Management</h1>
                    <p className="text-gray-400 text-sm mt-1">Manage teacher information and records</p>
                </div>

                <div className="relative w-full max-w-md">
                    <input
                        type="text"
                        placeholder="Search by teacher name..."
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
                    <tr className="border-b border-gray-700">
                        <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">Name</th>
                        <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">Employee No.</th>
                        <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">Address</th>
                        <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">Subject</th>
                        <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">Salary</th>
                        <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentTeachers.length > 0 ? (
                        currentTeachers.map((teacher) => (
                            <tr key={teacher.id} className="border-b border-gray-700/50 hover:bg-[#252d3d]">
                                <td className="py-4 px-4 text-white">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-[#252d3d] rounded-lg">
                                            <User size={16} className="text-violet-400" />
                                        </div>
                                        <span className="text-white">{teacher.name}</span>
                                    </div>
                                </td>
                                <td className="py-4 px-4 text-gray-300">{teacher.employeeNo}</td>
                                <td className="py-4 px-4 text-gray-300">
                                    {teacher.address.length > 15 ? `${teacher.address.slice(0, 15)}...` : teacher.address}
                                </td>
                                <td className="py-4 px-4 text-gray-300">{teacher.subject}</td>
                                <td className="py-4 px-4 text-gray-300">${teacher.salary}</td>
                                <td className="py-4 px-4">
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => onAttendance(teacher)}
                                            className="p-1.5 hover:bg-[#1e2746] rounded-lg text-green-400 hover:text-green-300"
                                            title="Mark Attendance"
                                        >
                                            <UserCheck size={16} />
                                        </button>
                                        <button
                                            onClick={() => onViewAttendance(teacher)}
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
                                No teachers found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Pagination Controls */}
            {
                filteredTeachers.length > 0 && (
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
                )
            }
        </div >
    );
};

export default TeacherTable;
