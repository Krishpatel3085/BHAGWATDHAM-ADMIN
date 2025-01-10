import React from 'react';
import { X, Printer } from 'lucide-react';
import { StudentMark } from '../../types/marksheet';

interface MarksheetViewProps {
    isOpen: boolean;
    onClose: () => void;
    mark: StudentMark | null;
}

const MarksheetView: React.FC<MarksheetViewProps> = ({ isOpen, onClose, mark }) => {
    if (!isOpen || !mark) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="fixed inset-0 bg-black/50" onClick={onClose} />

            <div className="relative min-h-screen flex items-center justify-center p-4">
                <div className="relative bg-white rounded-xl w-full max-w-4xl p-8">
                    {/* Header Actions */}
                    <div className="absolute top-4 right-4 flex items-center gap-2">
                        <button
                            className="p-2 hover:bg-gray-100 rounded-lg text-gray-600"
                            onClick={() => window.print()}
                        >
                            <Printer size={20} />
                        </button>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-lg text-gray-600"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* School Details */}
                    <div className="text-center mb-6 border-b pb-6">
                        <h1 className="text-2xl font-bold text-gray-900">SMART SCHOOL</h1>
                        <p className="text-gray-600">123 Education Street, Knowledge City - 380015</p>
                        <p className="text-gray-600">Phone: (123) 456-7890 | Email: info@smartschool.edu</p>
                        <h2 className="text-xl font-semibold mt-4 text-gray-800">
                            {mark.examType} Examination Result
                        </h2>
                    </div>

                    {/* Student Details */}
                    <div className="grid grid-cols-2 gap-6 mb-6">
                        <div className="space-y-2">
                            <p className="text-gray-600">Student Name: <span className="font-semibold text-gray-900">{mark.studentName}</span></p>
                            <p className="text-gray-600">Roll No: <span className="font-semibold text-gray-900">{mark.rollNo}</span></p>
                            <p className="text-gray-600">Class: <span className="font-semibold text-gray-900">{mark.Class}</span></p>
                        </div>
                        <div className="space-y-2 text-right">
                            <p className="text-gray-600">Academic Year: <span className="font-semibold text-gray-900">2023-24</span></p>
                            <p className="text-gray-600">Exam Date: <span className="font-semibold text-gray-900">{new Date(mark.createdAt).toLocaleDateString()}</span></p>
                        </div>
                    </div>

                    {/* Marks Table */}
                    <div className="border rounded-lg overflow-hidden mb-6">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Subject</th>
                                    <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">Max Marks</th>
                                    <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">Marks Obtained</th>
                                    <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">Grade</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {mark.subjects.map((subject, index) => (
                                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                        <td className="px-6 py-4 text-sm text-gray-900">{subject.name}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900 text-center">100</td>
                                        <td className="px-6 py-4 text-sm text-gray-900 text-center">{subject.marks}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900 text-center">{subject.grade}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Result Summary */}
                    <div className="grid grid-cols-2 gap-6 mb-6">
                        <div className="space-y-2">
                            <p className="text-gray-600">Total Marks: <span className="font-semibold text-gray-900">{mark.totalMarks}</span></p>
                            <p className="text-gray-600">Percentage: <span className="font-semibold text-gray-900">{mark.percentage}%</span></p>
                        </div>
                        <div className="space-y-2 text-right">
                            <p className="text-gray-600">Result: <span className={`font-semibold ${mark.result === 'Pass' ? 'text-green-600' : 'text-red-600'}`}>{mark.result}</span></p>
                            <p className="text-gray-600">Division: <span className="font-semibold text-gray-900">{getDivision(mark.percentage)}</span></p>
                        </div>
                    </div>

                    {/* Signatures */}
                    <div className="grid grid-cols-3 gap-6 mt-12 pt-12 border-t">
                        <div className="text-center">
                            <div className="border-t border-gray-300 mt-8 pt-2">
                                <p className="text-sm text-gray-600">Class Teacher</p>
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="border-t border-gray-300 mt-8 pt-2">
                                <p className="text-sm text-gray-600">Examination Controller</p>
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="border-t border-gray-300 mt-8 pt-2">
                                <p className="text-sm text-gray-600">Principal</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

function getDivision(percentage: number): string {
    if (percentage >= 75) return 'Distinction';
    if (percentage >= 60) return 'First Division';
    if (percentage >= 45) return 'Second Division';
    if (percentage >= 33) return 'Third Division';
    return 'Fail';
}

export default MarksheetView;