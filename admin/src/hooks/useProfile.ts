import { useState, useEffect } from 'react';
import { ProfileData } from '../types/profile';
import { APi_URL } from '../Server';
// const API_URL = "https://ldfs6814-8000.inc1.devtunnels.ms/";

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
                const response = await fetch(`${APi_URL}student/getStudent/${id}`, {
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