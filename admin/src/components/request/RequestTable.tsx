import { Check, X } from 'lucide-react';
import { Request } from '../../types/request';
import RequestStatusBadge from './RequestStatusBadge';


interface RequestTableProps {
    requests: Request[];
    onApprove: (id: string) => void;
    onReject: (id: string) => void;
}

const RequestTable: React.FC<RequestTableProps> = ({ requests,onApprove, onReject }) => {


    return (
        <div className="overflow-x-auto">
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
                    {requests.map((request) => (
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
        </div>
    );
};

export default RequestTable;
