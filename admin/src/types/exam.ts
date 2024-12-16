export interface Exam {
    id: string;
    subject: string;
    class: string;
    date: string;
    time: string;
    room: string;
    status: 'Upcoming' | 'Completed' | 'In Progress';
}