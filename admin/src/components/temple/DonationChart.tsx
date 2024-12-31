import { Coins } from 'lucide-react';

const DonationChart = () => {
    const donations = [
        { month: 'Jan', amount: 25000 },
        { month: 'Feb', amount: 32000 },
        { month: 'Mar', amount: 28000 },
        { month: 'Apr', amount: 35000 },
        { month: 'May', amount: 42000 },
        { month: 'Jun', amount: 38000 },
    ];

    const maxAmount = Math.max(...donations.map(d => d.amount));

    return (
        <div className="bg-[#1e2746] p-6 rounded-xl">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-semibold text-white">Donation Analytics</h3>
                    <p className="text-sm text-gray-400">Monthly donation trends</p>
                </div>
                <div className="p-2 bg-[#252d3d] rounded-lg">
                    <Coins className="text-yellow-500" size={24} />
                </div>
            </div>

            <div className="flex items-end h-64 gap-4">
                {donations.map((item) => (
                    <div key={item.month} className="flex-1">
                        <div className="relative h-52">
                            <div
                                className="absolute bottom-0 w-full bg-yellow-500/20 rounded-t-lg"
                                style={{ height: `${(item.amount / maxAmount) * 100}%` }}
                            >
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-yellow-500 text-sm">
                                    ₹{(item.amount / 1000).toFixed(1)}k
                                </div>
                            </div>
                        </div>
                        <p className="text-center mt-2 text-sm text-gray-400">{item.month}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DonationChart;