import { useEffect, useState } from 'react';
import { Event } from '../types/event';
import axios from 'axios';


const API_URL = 'https://ldfs6814-8000.inc1.devtunnels.ms/';


export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);

  // Fetch All Events
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch requests from the API
  const fetchEvent = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}Event/getEvent`);
      console.log('Event is Come', response.data);

      // Transform API data into a usable format
      const transformedEvents = response.data.map((event: any) => ({
        id: event._id,
        EventDate: event.EventDate,
        EventDescriptions: event.EventDescriptions,
        EventName: event.EventName,
        EventTime: event.EventTime,
        type: 'General', // Default type if not provided by API
      }));

      setEvents(transformedEvents);
    } catch (err: any) {
      console.error('Error fetching requests:', err);
      setError(err.message || 'Failed to fetch events.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, []);

  // Create a new event
  const addEvent = async (event: Omit<Event, 'id'>) => {
    try {
      const response = await axios.post(API_URL + 'Event/CreateEvent', event);
      const createdEvent: Event = response.data;
      setEvents([...events, createdEvent]);
      fetchEvent();
      alert('Event created successfully.');

    } catch (error) {
      console.error('Error adding event:', error);
      alert('Failed to create event. Please try again.');
    }
  };


  const updateEvent = (id: string, updatedEvent: Omit<Event, 'id'>) => {
    setEvents(events.map(event =>
      event.id === id ? { ...updatedEvent, id } : event
    ));
  };

  const deleteEvent = async (id: string) => {
    try {
      await axios.delete(`${API_URL}Event/DeleteEvent/${id}`);
      setEvents(prevEvents => prevEvents.filter(event => event.id !== id));
      alert('Event deleted successfully.');
      fetchEvent();

    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Failed to delete event. Please try again.');
    }
  };

  return {
    events,
    loading,
    error,
    addEvent,
    updateEvent,
    deleteEvent,
  };
};