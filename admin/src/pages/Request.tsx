import RequestTable from '../components/request/RequestTable';
import { useRequests } from '../hooks/useRequest';

const Request = () => {
    const { requests, handleApprove, handleReject } = useRequests();

    return (
        <>
            <div className="bg-[#1e2746] rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-xl font-semibold text-white">Request Management</h1>
                        <p className="text-gray-400 text-sm mt-1">Manage registration requests</p>
                    </div>
                </div>

                <RequestTable
                    requests={requests}
                    onApprove={handleApprove}
                    onReject={handleReject}
                />
            </div>
        </>
    );
};

export default Request;