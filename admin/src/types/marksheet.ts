export interface StudentMark {
    id: string;
    studentId: string;
    studentName: string;
    rollNo: string;
    Class: string;
    examType: 'Midterm' | 'Final' | 'Unit Test';
    subjects: {
      name: string;
      marks: number;
      grade: string;
    }[];
    totalMarks: number;
    percentage: number;
    result: 'Pass' | 'Fail';
    examDate: string;
  }