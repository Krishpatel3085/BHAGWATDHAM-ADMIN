import { Event } from '../../types/event';

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  return (
    <div className="flex items-start gap-4">
      <div className="bg-violet-500/20 rounded-lg p-2 text-center min-w-[60px]">
        <span className="text-2xl font-bold text-violet-400">{new Date(event.EventDate).getDate()}</span>
        <p className="text-xs text-violet-400 mt-1">{new Date(event.EventDate).toLocaleString('default', { month: 'short' })}</p>
      </div>
      <div>
        <h4 className="font-medium text-white">{event.EventName}</h4>
        <p className="text-sm text-gray-400 mt-1">{event.EventTime}</p>
        <span
          className={`inline-block mt-2 text-xs px-2 py-1 rounded-full 
              ${event.EventStatus === 'Upcoming'
              ? 'bg-green-500/20 text-green-400'
              : event.EventStatus === 'Today'
                ? 'bg-yellow-500/20 text-yellow-400'
                : 'bg-red-500/20 text-red-400'
            }
          `}
        >
          {event.EventStatus}
        </span>
      </div>
    </div>
  );
};

export default EventCard;