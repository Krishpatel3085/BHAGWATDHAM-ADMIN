import { useState } from 'react';

interface Attendance {
    id: string;
    userId: string;
    userType: 'student' | 'teacher';
    userName: string;
    status: 'present' | 'absent';
    date: string;
    remark?: string;
}

export const useAttendance = () => {
    const [attendance, setAttendance] = useState<Attendance[]>([]);

    const markAttendance = (data: Omit<Attendance, 'id'>) => {
        const newAttendance = {
            ...data,
            id: Date.now().toString(),
        };
        setAttendance([...attendance, newAttendance]);
    };

    const getAttendance = (userId: string, date: string) => {
        return attendance.find(a => a.userId === userId && a.date === date);
    };

    const getAttendanceStats = (userId: string) => {
        const userAttendance = attendance.filter(a => a.userId === userId);
        const total = userAttendance.length;
        const present = userAttendance.filter(a => a.status === 'present').length;
        const absent = total - present;
        const percentage = total > 0 ? (present / total) * 100 : 0;

        return {
            total,
            present,
            absent,
            percentage: percentage.toFixed(2),
        };
    };

    return {
        attendance,
        markAttendance,
        getAttendance,
        getAttendanceStats,
    };
};