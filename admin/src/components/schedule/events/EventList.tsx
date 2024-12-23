import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { Event } from '../../../types/event';
import { useEvents } from '../../../hooks/useEvents';

interface EventsListProps {
    events: Event[];
    onEdit: (event: Event) => void;
}

const EventsList: React.FC<EventsListProps> = ({ events, onEdit }) => {
    const { deleteEvent } = useEvents();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map((event) => (
                <div
                    key={event.id}
                    className="bg-[#252d3d] rounded-lg p-4 hover:bg-[#2a324a] transition-colors"
                >
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                            <div className="bg-violet-500/20 rounded-lg p-2 text-center min-w-[60px]">
                                <span className="text-2xl font-bold text-violet-400">
                                    {new Date(event.date).getDate()}
                                </span>
                                <p className="text-xs text-violet-400 mt-1">
                                    {new Date(event.date).toLocaleString('default', { month: 'short' })}
                                </p>
                            </div>
                            <div>
                                <h4 className="font-medium text-white">{event.title}</h4>
                                <p className="text-sm text-gray-400 mt-1">{event.time}</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                        <span className={`
              inline-block text-xs px-2 py-1 rounded-full
              ${new Date(event.date) > new Date()
                                ? 'bg-green-500/20 text-green-400'
                                : 'bg-yellow-500/20 text-yellow-400'
                            }
            `}>
                            {new Date(event.date) > new Date() ? 'Upcoming' : 'Today'}
                        </span>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => onEdit(event)}
                                className="p-1.5 hover:bg-[#1e2746] rounded-lg text-blue-400 hover:text-blue-300"
                            >
                                <Edit2 size={16} />
                            </button>
                            <button
                                onClick={() => deleteEvent(event.id)}
                                className="p-1.5 hover:bg-[#1e2746] rounded-lg text-red-400 hover:text-red-300"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default EventsList;