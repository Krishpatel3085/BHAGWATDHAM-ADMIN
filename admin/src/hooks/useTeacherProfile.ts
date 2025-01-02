// import { useState, useEffect } from 'react';
// import { TeacherProfileData } from '../types/teacherProfile';

// const mockTeacherProfile: TeacherProfileData = {
//     employeeNo: 'EMP001',
//     name: 'Sarah Johnson',
//     subject: 'Mathematics',
//     grade: '10th',
//     age: 32,
//     salary: 45000,
//     address: '456 Oak Street, City, State - 12345',
//     imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
// };

// const API_URL = 'https://ldfs6814-8000.inc1.devtunnels.ms/';


// export const useTeacherProfile = () => {
//     const [profile, setProfile] = useState<TeacherProfileData | null>(null);
//     const [isLoading, setIsLoading] = useState(true);
//     const id = localStorage.getItem('id')

//     useEffect(() => {
//         // Simulate API call
//         const fetchProfile = async () => {
//             try {
//                 const response = await fetch(API_URL + `teacher/getTeacher/${id}`);
//                 console.log('Profile come', response)
//                 await new Promise(resolve => setTimeout(resolve, 1000));
//                 setProfile(response);
//             } catch (error) {
//                 console.error('Error fetching teacher profile:', error);
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchProfile();
//     }, []);

//     return { profile, isLoading };
// };

import { useState, useEffect } from "react";
import { TeacherProfileData } from "../types/teacherProfile";

const API_URL = "https://ldfs6814-8000.inc1.devtunnels.ms/";

export const useTeacherProfile = () => {
    const [profile, setProfile] = useState<TeacherProfileData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null); // Add error state
    const id = localStorage.getItem("id");

    useEffect(() => {
        const fetchProfile = async () => {
            if (!id) {
                setError("No ID found in local storage");
                setIsLoading(false);
                return;
            }
            try {
                const response = await fetch(`${API_URL}teacher/getTeacher/${id}`, {
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
            } catch (error: any) {
                console.error("Error fetching teacher profile:", error.message);
                setError(error.message); // Set error message
            } finally {
                setIsLoading(false);
            }
        };
        fetchProfile();
    }, [id]);

    return { profile, isLoading, error };
};
