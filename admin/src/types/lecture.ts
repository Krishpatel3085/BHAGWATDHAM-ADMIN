export interface Lecture {
    id: string;
    subject: string;
    startTime: string;
    endTime: string;
    teacherName: string;
    dayOfWeek: string;
    grade: string;
}

export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';