import { useState, useEffect } from 'react';
import { ProfileData } from '../types/profile';

// const mockProfile: ProfileData = {
//     studentId: 'STU001',
//     name: 'John Smith',
//     grade: '10th',
//     parentName: 'Michael Smith',
//     parentPhone: '(555) 123-4567',
//     address: '123 Main Street, City, State - 12345',
//     imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//     totalFees: 50000,
//     paidFees: 35000,
//     feesStatus: 'pending',
// };
const API_URL = "https://ldfs6814-8000.inc1.devtunnels.ms/";

export const useProfile = () => {
    const [profile, setProfile] = useState<ProfileData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null); // Add error state
    const id = localStorage.getItem("id");

    useEffect(() => {
        // Simulate API call
        const fetchProfile = async () => {
            if (!id) {
                setError("No ID found in local storage");
                setIsLoading(false);
                return;
            }
            try {
                const response = await fetch(`${API_URL}student/getStudent/${id}`, {
                    method: "GET",
                });

                if (!response.ok) {
                    throw new Error(
                        `Failed to fetch profile. Status: ${response.status}`
                    );
                }
                const data: ProfileData = await response.json();
                console.log("Fetched Profile Data student:", data);
                setProfile(data.student);

            } catch (error) {
                console.error('Error fetching profile:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, [id]);

    return { profile, isLoading, error };
};