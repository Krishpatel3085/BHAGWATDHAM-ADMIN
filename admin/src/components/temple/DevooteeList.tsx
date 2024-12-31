import { User } from 'lucide-react';

const DevoteeList = () => {
    const devotees = [
        {
            name: 'Rajesh Kumar',
            city: 'Mumbai',
            memberSince: '2023',
            type: 'Lifetime Member'
        },
        {
            name: 'Priya Sharma',
            city: 'Delhi',
            memberSince: '2024',
            type: 'Annual Member'
        },
        {
            name: 'Amit Patel',
            city: 'Ahmedabad',
            memberSince: '2023',
            type: 'Lifetime Member'
        },
        {
            name: 'Meera Singh',
            city: 'Pune',
            memberSince: '2024',
            type: 'Monthly Member'
        }
    ];

    return (
        <div className="bg-[#1e2746] p-6 rounded-xl">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-semibold text-white">Recent Devotees</h3>
                    <p className="text-sm text-gray-400">Latest registered members</p>
                </div>
                <button className="text-sm text-blue-400 hover:text-blue-300">View All</button>
            </div>

            <div className="space-y-4">
                {devotees.map((devotee, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-[#252d3d] transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-[#252d3d] rounded-lg">
                                <User className="text-indigo-400" size={20} />
                            </div>
                            <div>
                                <h4 className="font-medium text-white">{devotee.name}</h4>
                                <p className="text-sm text-gray-400">{devotee.city}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className="text-sm text-gray-400">Since {devotee.memberSince}</span>
                            <div className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400 mt-1">
                                {devotee.type}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DevoteeList;