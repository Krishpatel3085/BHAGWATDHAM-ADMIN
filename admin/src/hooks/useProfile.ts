import { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import { ProfileData } from '../types/profile';
import { APi_URL } from '../Server';
// const API_URL = "https://ldfs6814-8000.inc1.devtunnels.ms/";

export const useProfile = () => {
    const [profile, setProfile] = useState<ProfileData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const id = localStorage.getItem("id");

    useEffect(() => {
        const fetchProfile = async () => {
            if (!id) {
                setError("No ID found in local storage");
                setIsLoading(false);
                return;
            }
            try {
                const response = await axios.get(`${APi_URL}student/getStudent/${id}`);
                const data = response.data;
                console.log("Fetched Profile Data student:", data);
                setProfile(data.student);
            } catch (error: any) {
                console.error('Error fetching profile:', error);
                setError(error?.response?.data?.message || error.message || "An error occurred");
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, [id]);

    return { profile, isLoading, error };
};
