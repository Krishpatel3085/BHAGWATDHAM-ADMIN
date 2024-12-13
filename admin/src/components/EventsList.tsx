// import React from 'react';
import EventCard from './events/EventCard';
import { Event } from '../types/event';

const events: Event[] = [
  { date: { day: 4, month: 'Jan' }, title: 'Science Fair', time: '11:00 AM - 12:30 PM', type: 'Today' },
  { date: { day: 12, month: 'Jan' }, title: 'Guest Speaker', time: '11:00 AM - 12:30 PM', type: 'In 5 days' },
  { date: { day: 18, month: 'Jan' }, title: 'Art Exhibition Opening', time: '10:00 AM - 12:00 PM', type: 'In 8 days' },
];

const EventsList = () => {
  return (
    <div className="bg-[#1e2746] rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-white">Upcoming Events</h3>
        <button className="text-sm text-blue-400 hover:text-blue-300">View All</button>
      </div>
      <div className="space-y-4">
        {events.map((event, index) => (
          <EventCard key={index} event={event} />
        ))}
      </div>
    </div>
  );
};

export default EventsList;