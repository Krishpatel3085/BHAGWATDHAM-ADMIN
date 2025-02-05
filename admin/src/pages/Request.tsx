import RequestTable from '../components/request/RequestTable';
import { useRequests } from '../hooks/useRequest';

const Request = () => {
    const { requests, handleApprove, handleReject } = useRequests();

    return (
        <>
            <div className="bg-[#1e2746] rounded-xl p-6">

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