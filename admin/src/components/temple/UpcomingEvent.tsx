import { Calendar } from 'lucide-react';

const UpcomingEvents = () => {
    const events = [
        {
            title: 'Ganesh Chaturthi',
            date: '2024-02-15',
            time: '06:00 AM',
            type: 'Festival'
        },
        {
            title: 'Maha Shivaratri',
            date: '2024-02-18',
            time: '05:00 AM',
            type: 'Festival'
        },
        {
            title: 'Satyanarayan Katha',
            date: '2024-02-20',
            time: '09:00 AM',
            type: 'Pooja'
        },
        {
            title: 'Bhajan Sandhya',
            date: '2024-02-22',
            time: '06:30 PM',
            type: 'Cultural'
        }
    ];

    return (
        <div className="bg-[#1e2746] p-6 rounded-xl">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-semibold text-white">Upcoming Events</h3>
                    <p className="text-sm text-gray-400">Temple events and festivals</p>
                </div>
                <button className="text-sm text-blue-400 hover:text-blue-300">View All</button>
            </div>

            <div className="space-y-4">
                {events.map((event, index) => (
                    <div key={index} className="flex items-start gap-4 p-3 rounded-lg hover:bg-[#252d3d] transition-colors">
                        <div className="bg-violet-500/20 rounded-lg p-2 text-center min-w-[60px]">
                            <Calendar className="text-violet-400 mx-auto" size={20} />
                            <p className="text-xs text-violet-400 mt-1">
                                {new Date(event.date).toLocaleDateString('en-US', { day: '2-digit', month: 'short' })}
                            </p>
                        </div>
                        <div>
                            <h4 className="font-medium text-white">{event.title}</h4>
                            <p className="text-sm text-gray-400 mt-1">{event.time}</p>
                            <span className="inline-block mt-2 text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-400">
                                {event.type}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UpcomingEvents;