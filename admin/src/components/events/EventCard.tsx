// import React from 'react';
import { Event } from '../../types/event';

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  return (
    <div className="flex items-start gap-4">
      <div className="bg-violet-500/20 rounded-lg p-2 text-center min-w-[60px]">
        <span className="text-2xl font-bold text-violet-400">{event.date.day}</span>
        <p className="text-xs text-violet-400 mt-1">{event.date.month}</p>
      </div>
      <div>
        <h4 className="font-medium text-white">{event.title}</h4>
        <p className="text-sm text-gray-400 mt-1">{event.time}</p>
        <span className="inline-block mt-2 text-xs px-2 py-1 rounded-full bg-pink-500/20 text-pink-400">
          {event.type}
        </span>
      </div>
    </div>
  );
};

export default EventCard;