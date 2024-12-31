import { Calendar, Clock } from 'lucide-react';

const PoojaBookings = () => {
    const bookings = [
        {
            name: 'Satyanarayan Katha',
            devotee: 'Sharma Family',
            time: '09:00 AM',
            status: 'Confirmed'
        },
        {
            name: 'Rudrabhishek',
            devotee: 'Patel Family',
            time: '10:30 AM',
            status: 'Pending'
        },
        {
            name: 'Ganesh Pooja',
            devotee: 'Singh Family',
            time: '11:00 AM',
            status: 'Confirmed'
        },
        {
            name: 'Maha Aarti',
            devotee: 'Kumar Family',
            time: '12:00 PM',
            status: 'Confirmed'
        }
    ];

    return (
        <div className="bg-[#1e2746] p-6 rounded-xl">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-semibold text-white">Today's Bookings</h3>
                    <p className="text-sm text-gray-400">Pooja and ritual schedules</p>
                </div>
                <button className="text-sm text-blue-400 hover:text-blue-300">View All</button>
            </div>

            <div className="space-y-4">
                {bookings.map((booking, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-[#252d3d] transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-[#252d3d] rounded-lg">
                                <Calendar className="text-rose-400" size={20} />
                            </div>
                            <div>
                                <h4 className="font-medium text-white">{booking.name}</h4>
                                <p className="text-sm text-gray-400">{booking.devotee}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="flex items-center gap-1 text-gray-400">
                                <Clock size={14} />
                                <span className="text-sm">{booking.time}</span>
                            </div>
                            <span className={`inline-block mt-1 text-xs px-2 py-1 rounded-full ${booking.status === 'Confirmed'
                                    ? 'bg-green-500/20 text-green-400'
                                    : 'bg-yellow-500/20 text-yellow-400'
                                }`}>
                                {booking.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PoojaBookings;