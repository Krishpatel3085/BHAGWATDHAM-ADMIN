import { useState } from 'react';
import { Check, X, Search } from 'lucide-react';
import { Request } from '../../types/request';
import RequestStatusBadge from './RequestStatusBadge';

interface RequestTableProps {
    requests: Request[];
    onApprove: (id: string) => void;
    onReject: (id: string) => void;
}

const RequestTable: React.FC<RequestTableProps> = ({ requests, onApprove, onReject }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Filter requests based on search term
    const filteredRequests = requests.filter(request =>
        request.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination logic
    const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
    const paginatedRequests = filteredRequests.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="overflow-x-auto">
            {/* Search Input */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 pb-4">
                <div>
                    <h1 className="text-xl font-semibold text-white">Request Management</h1>
                    <p className="text-gray-400 text-sm mt-1">Manage registration requests</p>
                </div>
                <div className="relative w-full max-w-md">
                    <input
                        type="text"
                        placeholder="Search by name or role..."
                        className="w-full px-4 py-2 pl-10 text-white bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-400"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />

                </div>
            </div>
            {/* Table */}
            <table className="w-full min-w-[800px]">
                <thead>
                    <tr className="text-left">
                        <th className="pb-4 text-sm font-medium text-gray-400">Profile</th>
                        <th className="pb-4 text-sm font-medium text-gray-400">Name</th>
                        <th className="pb-4 text-sm font-medium text-gray-400">Role</th>
                        <th className="pb-4 text-sm font-medium text-gray-400">Date</th>
                        <th className="pb-4 text-sm font-medium text-gray-400">Status</th>
                        <th className="pb-4 text-sm font-medium text-gray-400">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-sm">
                    {paginatedRequests.map((request) => (
                        <tr key={request.id} className="border-t border-gray-700">
                            <td className="py-4">
                                <img
                                    src={request.imageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(request.name)}`}
                                    alt={`Profile picture of ${request.name}`}
                                    className="w-10 h-10 rounded-full"
                                />
                            </td>
                            <td className="py-4 text-white">{request.username}</td>
                            <td className="py-4">
                                <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs">
                                    {request.role}
                                </span>
                            </td>
                            <td className="py-4 text-gray-300">
                                {new Date(request.createdAt).toLocaleDateString()}
                            </td>
                            <td className="py-4">
                                <RequestStatusBadge status={request.status} />
                            </td>
                            <td className="py-4">
                                {request.status === 'Pending' && (
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => onApprove(request._id)}
                                            className="p-1.5 hover:bg-[#252d3d] rounded-lg text-green-400 hover:text-green-300"
                                            title="Approve"
                                        >
                                            <Check size={18} />
                                        </button>
                                        <button
                                            onClick={() => onReject(request._id)}
                                            className="p-1.5 hover:bg-[#252d3d] rounded-lg text-red-400 hover:text-red-300"
                                            title="Reject"
                                        >
                                            <X size={18} />
                                        </button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="mt-4 flex justify-center gap-2">
                    <button
                        className="px-3 py-1 bg-gray-700 text-white rounded-md disabled:opacity-50"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                    >
                        Previous
                    </button>
                    <span className="px-3 py-1 bg-gray-800 text-white rounded-md">Page {currentPage} of {totalPages}</span>
                    <button
                        className="px-3 py-1 bg-gray-700 text-white rounded-md disabled:opacity-50"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default RequestTable;
