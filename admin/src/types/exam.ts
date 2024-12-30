export interface Exam {
    id: string;
    Subject: string;
    Class: string;
    ExamDate: string;
    ExamTime: string;
    Room: string;
    status: 'Upcoming' | 'Completed' | 'In Progress';
}