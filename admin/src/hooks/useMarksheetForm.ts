import { useState, useEffect } from 'react';
import { useMarksheet } from './useMarksheet';
import { StudentMark } from '../types/marksheet';

interface SubjectForm {
    subjectId: string;
    subjectName: string;
    marks: number;
}

interface MarksheetForm {
    studentName: string;
    rollNo: string;
    class: string;
    examType: 'Midterm' | 'Final' | 'Unit Test';
    subjects: SubjectForm[];
}

const initialFormData: MarksheetForm = {
    studentName: '',
    rollNo: '',
    class: '',
    examType: 'Midterm',
    subjects: [
        { subjectId: '1', subjectName: '', marks: 0 },
        { subjectId: '2', subjectName: '', marks: 0 },
        { subjectId: '3', subjectName: '', marks: 0 },
    ],
};

export const useMarksheetForm = (mark: StudentMark | null, onClose: () => void) => {
    const [formData, setFormData] = useState<MarksheetForm>(initialFormData);
    const { addMark, updateMark } = useMarksheet();

    useEffect(() => {
        if (mark) {
            setFormData({
                studentName: mark.studentName,
                rollNo: mark.rollNo,
                class: mark.class,
                examType: mark.examType,
                subjects: mark.subjects.map(s => ({
                    subjectId: s.subjectId,
                    subjectName: '', // You'll need to store subject names in your data
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

    const handleSubjectChange = (index: number, field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            subjects: prev.subjects.map((subject, i) =>
                i === index ? { ...subject, [field]: field === 'marks' ? Number(value) : value } : subject
            ),
        }));
    };

    const calculateResults = (subjects: SubjectForm[]) => {
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
            class: formData.class,
            examType: formData.examType,
            subjects: formData.subjects.map(s => ({
                subjectId: s.subjectId,
                marks: s.marks,
                grade: getGrade(s.marks),
            })),
            totalMarks,
            percentage,
            result,
            examDate: new Date().toISOString().split('T')[0],
        };

        if (mark) {
            updateMark(mark.id, markData);
        } else {
            addMark(markData);
        }

        onClose();
    };

    return {
        formData,
        handleChange,
        handleSubjectChange,
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