import { useState } from 'react';
import { Event } from '../types/event';

const initialEvents: Event[] = [
  {
    id: '1',
    title: 'Annual Sports Day',
    date: '2024-02-15',
    time: '09:00',
    description: 'Annual sports competition for all students',
  },
  {
    id: '2',
    title: 'Parent-Teacher Meeting',
    date: '2024-02-20',
    time: '14:00',
    description: 'Semester progress discussion with parents',
  },
];

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>(initialEvents);

  const addEvent = (event: Omit<Event, 'id'>) => {
    const newEvent = {
      ...event,
      id: Date.now().toString(),
    };
    setEvents([...events, newEvent]);
  };

  const updateEvent = (id: string, updatedEvent: Omit<Event, 'id'>) => {
    setEvents(events.map(event => 
      event.id === id ? { ...updatedEvent, id } : event
    ));
  };

  const deleteEvent = (id: string) => {
    setEvents(events.filter(event => event.id !== id));
  };

  return {
    events,
    addEvent,
    updateEvent,
    deleteEvent,
  };
};