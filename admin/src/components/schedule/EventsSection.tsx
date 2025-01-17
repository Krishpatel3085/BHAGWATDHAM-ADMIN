import { useState } from 'react';
import { Plus } from 'lucide-react';
import EventsList from './events/EventList';
import EventModal from './events/EventModal';
import { useEvents } from '../../hooks/useEvents';
import { Event } from '../../types/event';
const EventsSection = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const { events } = useEvents();

    const handleEdit = (event: Event) => {
        setSelectedEvent(event);
        setIsModalOpen(true);
    };

    return (
        <div className="bg-[#1e2746] rounded-xl p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                    <h2 className="text-xl font-semibold text-white">Upcoming Events</h2>
                    <p className="text-gray-400 text-sm mt-1">Manage school events and activities</p>
                </div>
                <button
                    onClick={() => {
                        setSelectedEvent(null);
                        setIsModalOpen(true);
                    }}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Plus size={20} />
                    <span>Add Event</span>
                </button>
            </div>

            <EventsList events={events} onEdit={handleEdit} />

            <EventModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedEvent(null);
                }}
                event={selectedEvent}
            />
        </div>
    );
}

export default EventsSection;
