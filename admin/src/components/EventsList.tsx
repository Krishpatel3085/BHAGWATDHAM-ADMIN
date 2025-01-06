// import React from 'react';
import EventCard from './events/EventCard';
import { Event } from '../types/event';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { APi_URL } from '../Server';
// const API_URL = 'https://ldfs6814-8000.inc1.devtunnels.ms/';

const EventsList = () => {
  const [events, useEvents] = useState<Event[]>([]);
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(APi_URL + 'Event/getEvent');
        const data = response.data;
        console.log("All Events:", data.events);
        useEvents(data.events);
      } catch (error) {
        console.error("Error fetching Events:", error); 
      }
    };

    fetchEvent();
  }, []);
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