import React, { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Teacher } from "../../types/teacher";
import { Student } from '../../types/student';

interface AttendanceCalendarModalProps {
    isOpen: boolean;
    onClose: () => void;
    teacher?: Teacher;
    student?: Student;
    type: "student" | "teacher";
}

const AttendanceCalendarModal: React.FC<AttendanceCalendarModalProps> = ({ isOpen, onClose, teacher, student, type }) => {
    if (!isOpen) return null;

    // Extract attendance array
    const attendanceData = type === "teacher" ? teacher?.Attendance || [] : student?.Attendance || [];
    const currentYear = new Date().getFullYear();
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const incrementYear = () => setSelectedYear((prev) => prev + 1);
    const decrementYear = () => setSelectedYear((prev) => prev - 1);

    const getDaysInMonth = (year: number, month: number) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getAttendanceStatus = (year: number, month: number, day: number) => {
        const dateString = new Date(year, month, day).toISOString().split("T")[0]; // Format date as YYYY-MM-DD
        const attendance = attendanceData.find((entry) => {
            return String(entry.date).startsWith(dateString);
        });
        return attendance ? attendance.attendance : null; // "present" or "absent"
    };
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#1e2746] text-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-auto">
                <h2 className="text-lg font-semibold mb-4">{`Attendance for ${type === "teacher" ? teacher?.name : student?.name}`}</h2>
                {/* Year Selector */}
                <div className="flex justify-between items-center mb-4">
                    <button
                        onClick={decrementYear}
                        className="p-2 rounded-full hover:bg-gray-700"
                        aria-label="Decrement Year"
                    >
                        <ChevronUp size={20} />
                    </button>
                    <span className="text-xl font-semibold">{selectedYear}</span>
                    <button
                        onClick={incrementYear}
                        className="p-2 rounded-full hover:bg-gray-700"
                        aria-label="Increment Year"
                    >
                        <ChevronDown size={20} />
                    </button>
                </div>

                {/* Months Grid */}
                <div className="grid grid-cols-4 gap-2 mb-6">
                    {months.map((month, index) => (
                        <button
                            key={month}
                            onClick={() => setSelectedMonth(index)}
                            className={`py-2 px-3 flex items-center justify-center rounded-md text-sm font-medium transition-all ${selectedMonth === index
                                ? "bg-blue-500 text-white"
                                : "bg-gray-800 hover:bg-gray-700"
                                }`}
                        >
                            {month.slice(0, 3)}
                        </button>
                    ))}
                </div>

                {/* Days Grid */}
                {selectedMonth !== null && (
                    <div>
                        <h3 className="text-lg font-semibold mb-4">
                            {months[selectedMonth]} {selectedYear}
                        </h3>
                        <div className="grid grid-cols-7 gap-2">
                            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                                <div key={day} className="text-center font-medium text-gray-400">
                                    {day}
                                </div>
                            ))}
                            {Array.from({
                                length: new Date(selectedYear, selectedMonth, 1).getDay(),
                            }).map((_, index) => (
                                <div key={index} />
                            ))}
                            {Array.from({
                                length: getDaysInMonth(selectedYear, selectedMonth),
                            }).map((_, day) => {
                                const attendanceStatus = getAttendanceStatus(
                                    selectedYear,
                                    selectedMonth,
                                    day + 1
                                );
                                const isSunday =
                                    new Date(selectedYear, selectedMonth, day + 1).getDay() === 0;

                                let bgColor = "bg-gray-500"; // Default for days with no attendance data
                                if (attendanceStatus === "present") bgColor = "bg-green-500";
                                else if (attendanceStatus === "absent") bgColor = "bg-red-500";
                                else if (isSunday) bgColor = "bg-yellow-500";

                                return (
                                    <div
                                        key={day}
                                        className={`text-center py-2 rounded-md ${bgColor}`}
                                    >
                                        {day + 1}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
                <button
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default AttendanceCalendarModal;
