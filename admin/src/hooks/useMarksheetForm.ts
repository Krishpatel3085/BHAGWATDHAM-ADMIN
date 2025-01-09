import { useState, useEffect } from 'react';
import { useMarksheet } from './useMarksheet';
import { StudentMark } from '../types/marksheet';

interface MarksheetForm {
  studentName: string;
  rollNo: string;
  Class: string;
  examType: 'Midterm' | 'Final' | 'Unit Test';
  subjects: Array<{
    name: string;
    marks: number;
  }>;
}

const initialFormData: MarksheetForm = {
  studentName: '',
  rollNo: '',
  Class: '',
  examType: 'Midterm',
  subjects: [],
};

export const useMarksheetForm = (mark: StudentMark | null, onClose: () => void) => {
  const [formData, setFormData] = useState<MarksheetForm>(initialFormData);
  const { addMark, updateMark } = useMarksheet();

  useEffect(() => {
    if (mark) {
      setFormData({
        studentName: mark.studentName,
        rollNo: mark.rollNo,
        Class: mark.Class,
        examType: mark.examType,
        subjects: mark.subjects.map(s => ({
          name: s.name,
          marks: s.marks,
        })),
      });
    } else {
      setFormData(initialFormData);
    }
  }, [mark]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubjectChange = (index: number, field: 'name' | 'marks', value: string) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.map((subject, i) => 
        i === index 
          ? { ...subject, [field]: field === 'marks' ? Number(value) : value }
          : subject
      ),
    }));
  };

  const addSubject = () => {
    setFormData(prev => ({
      ...prev,
      subjects: [...prev.subjects, { name: '', marks: 0 }],
    }));
  };

  const removeSubject = (index: number) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.filter((_, i) => i !== index),
    }));
  };

  const calculateResults = (subjects: Array<{ name: string; marks: number }>) => {
    const totalMarks = subjects.reduce((sum, subject) => sum + subject.marks, 0);
    const percentage = (totalMarks / (subjects.length * 100)) * 100;
    const result = percentage >= 40 ? 'Pass' : 'Fail';

    return { totalMarks, percentage, result };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const { totalMarks, percentage, result } = calculateResults(formData.subjects);
    
    const markData = {
      studentId: Date.now().toString(),
      studentName: formData.studentName,
      rollNo: formData.rollNo,
      Class: formData.Class,
      examType: formData.examType,
      subjects: formData.subjects.map(s => ({
        name: s.name,
        marks: s.marks,
        grade: getGrade(s.marks),
      })),
      totalMarks,
      percentage,
      result,
    };

    if (mark) {
      updateMark(mark._id, markData);
    } else {
      addMark(markData);
    }

    onClose();
  };

  return {
    formData,
    handleChange,
    handleSubjectChange,
    addSubject,
    removeSubject,
    handleSubmit,
  };
};

function getGrade(marks: number): string {
  if (marks >= 90) return 'A+';
  if (marks >= 80) return 'A';
  if (marks >= 70) return 'B';
  if (marks >= 60) return 'C';
  if (marks >= 50) return 'D';
  return 'F';
}