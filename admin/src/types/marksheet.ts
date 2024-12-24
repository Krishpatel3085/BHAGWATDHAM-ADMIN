export interface Subject {
    id: string;
    name: string;
    totalMarks: number;
    passingMarks: number;
}

export interface StudentMark {
    id: string;
    studentId: string;
    studentName: string;
    rollNo: string;
    class: string;
    examType: 'Midterm' | 'Final' | 'Unit Test';
    subjects: {
        subjectId: string;
        marks: number;
        grade: string;
    }[];
    totalMarks: number;
    percentage: number;
    result: 'Pass' | 'Fail';
    examDate: string;
}