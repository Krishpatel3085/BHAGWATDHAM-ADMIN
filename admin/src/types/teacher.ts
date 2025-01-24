export interface Teacher {
  id: string;
  name: string;
  employeeNo: string;
  address: string;
  salary: number;
  grade: string;
  age: string;
  subject?: string;
  url: string;
  Attendance: {
    date: number;
    attendance: string;
  }[]
}