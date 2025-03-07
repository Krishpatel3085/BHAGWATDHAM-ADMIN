export interface Student {
  id: string;
  name: string;
  address: string;
  parentName: string;
  parentPhone: string;
  grade: string;
  enrollmentDate: string;
  updatedAt: string;
  url: string;
  gender: string;
  Attendance: {
    date: number;
    attendance: string;
  }[]
}