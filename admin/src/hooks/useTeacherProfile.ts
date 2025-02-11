import { useState, useEffect } from "react";
import { TeacherProfileData } from "../types/teacherProfile";
import { APi_URL } from "../Server";

export const useTeacherProfile = () => {
    const [profile, setProfile] = useState<TeacherProfileData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null); // Add error state
    const id = localStorage.getItem("id");
    const [teachers, setTeacher] = useState<TeacherProfileData | null>(null)
    useEffect(() => {
        const fetchProfile = async () => {
            if (!id) {
                setError("No ID found in local storage");
                setIsLoading(false);
                return;
            }
            try {
                const response = await fetch(`${APi_URL}teacher/getTeacher/${id}`, {
                    method: "GET",
                });

                if (!response.ok) {
                    throw new Error(
                        `Failed to fetch profile. Status: ${response.status}`
                    );
                }

                const data: TeacherProfileData = await response.json();
                console.log("Fetched Profile Data:", data);
                setProfile(data.teacher);
                setTeacher(data.teacher);
            } catch (error: any) {
                console.error("Error fetching teacher profile:", error.message);
                setError(error.message); // Set error message
            } finally {
                setIsLoading(false);
            }
        };
        fetchProfile();
    }, [id]);

    return { profile, isLoading, error,teachers };
};
