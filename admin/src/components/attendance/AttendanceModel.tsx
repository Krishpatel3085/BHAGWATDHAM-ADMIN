import React, { useState } from "react";
import { X, Check, X as XIcon } from "lucide-react";
import { useAttendance } from "../../hooks/useAttendance";
import axios from "axios";
import { APi_URL } from "../../Server";

interface AttendanceModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: "student" | "teacher";
    user: {
        id: string;
        name: string;
        employeeNo?: string; // For teachers
        studentId?: string; // For students
    };
}

const AttendanceModal: React.FC<AttendanceModalProps> = ({ isOpen, onClose, type, user }) => {
    const [status, setStatus] = useState<"present" | "absent" | null>(null);
    const [remark, setRemark] = useState("");
    const { markAttendance } = useAttendance();

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!status) return;

        const attendanceData = {
            userId: user.id,
            userName: user.name,
            status,
            date: new Date().toISOString().split("T")[0],
            remark,
            ...(type === "teacher" ? { employeeNo: user.employeeNo } : {}),
            ...(type === "student" ? { studentId: user.studentId } : {}),
        };
        try {
            if (type === "teacher") {
                // Call teacher attendance API
                attendanceData["employeeNo"] = user.employeeNo;
                const response = await axios.put(`${APi_URL}teacher/AttendanceTe`, attendanceData);
                console.log("Teacher attendance marked successfully:", response.data);
                alert("employee Attendace Successfully:");

            } else if (type === "student") {
                // Call student attendance API
                attendanceData["studentId"] = user.studentId;
                const response = await axios.put(`${APi_URL}student/AttendanceSt`, attendanceData);
                console.log("Student attendance marked successfully:", response.data);
                alert("Student Attendace Successfully:");
            }

            // Optionally use a hook to update local state/UI
            markAttendance({ ...attendanceData, userType: type });
        } catch (error: any) {
            console.error("Error marking attendance:", error.response?.data?.message || error.message);
            alert(error.response?.data?.message || error.message)
        }

        onClose();
    };


    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="fixed inset-0 bg-black/50" onClick={onClose} />

            <div className="relative min-h-screen flex items-center justify-center p-4">
                <div className="relative bg-[#1e2746] rounded-xl w-full max-w-md p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold text-white">
                            Mark Attendance - {user.name}
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-3">
                                Attendance Status
                            </label>
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    onClick={() => setStatus("present")}
                                    className={`flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-colors ${status === "present"
                                        ? "border-green-500 bg-green-500/20 text-green-400"
                                        : "border-gray-700 text-gray-400 hover:border-green-500/50"
                                        }`}
                                >
                                    <Check size={20} />
                                    <span>Present</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setStatus("absent")}
                                    className={`flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-colors ${status === "absent"
                                        ? "border-red-500 bg-red-500/20 text-red-400"
                                        : "border-gray-700 text-gray-400 hover:border-red-500/50"
                                        }`}
                                >
                                    <XIcon size={20} />
                                    <span>Absent</span>
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Remarks (Optional)
                            </label>
                            <textarea
                                value={remark}
                                onChange={(e) => setRemark(e.target.value)}
                                rows={3}
                                className="w-full bg-[#252d3d] border border-gray-700 rounded-lg px-4 py-2.5 text-white"
                                placeholder="Add any additional notes..."
                            />
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={!status}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Save Attendance
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AttendanceModal;
