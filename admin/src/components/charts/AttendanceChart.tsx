// import React from 'react';
import { AttendanceData } from '../../types/attendance';

const attendanceData: AttendanceData[] = [
  { day: 'Mon', present: 85, absent: 15 },
  { day: 'Tue', present: 90, absent: 10 },
  { day: 'Wed', present: 88, absent: 12 },
  { day: 'Thu', present: 92, absent: 8 },
  { day: 'Fri', present: 87, absent: 13 },
];

const AttendanceChart = () => {
  return (
    <div className="bg-[#1e2746] p-6 rounded-xl">
      <h3 className="text-lg font-semibold mb-4 text-white">Attendance</h3>
      <div className="flex items-end h-64 gap-4">
        {attendanceData.map((item, index) => (
          <div key={index} className="flex-1">
            <div className="relative h-48">
              <div
                className="absolute bottom-0 w-full bg-green-500/20"
                style={{ height: `${item.present}%` }}
              />
              <div
                className="absolute bottom-0 w-full bg-red-500/20"
                style={{ height: `${item.absent}%` }}
              />
            </div>
            <p className="text-center mt-2 text-sm text-gray-400">{item.day}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttendanceChart;