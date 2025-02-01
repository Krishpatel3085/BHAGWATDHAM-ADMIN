import { useState, useEffect } from 'react';
import axios from 'axios';
import { Publication, PublicationType } from '../types/publication';
import { APi_URL } from '../Server';
// Replace with your actual API endpoint

export const usePublications = () => {
    const [publications, setPublications] = useState<Publication[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch publications from API
    useEffect(() => {
        const fetchPublications = async () => {
            setLoading(true);
            try {
                const response = await axios.get(APi_URL+ 'Publications/getPublication');
                setPublications(response.data.Publications);
                console.log(response.data); // Debugging purpose
            } catch (err) {
                setError('Failed to fetch publications');
            } finally {
                setLoading(false);
            }
        };

        fetchPublications();
    }, []);

    // Add new publication
    const addPublication = async (publication: Omit<Publication, 'id'> & { file: File }) => {
        try {
            const formData = new FormData();
            formData.append('Publication', publication.Publication); 
            formData.append('PublicationName', publication.PublicationName);
            formData.append('Description', publication.Description);
            formData.append('PublicationDate', publication.PublicationDate);
            formData.append('Img', publication.file); // Ensure this key matches the backend
    
            const response = await axios.post(`${APi_URL}Publications/CreatePublication`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
    
            alert("Publication created successfully");
            setPublications([...publications, response.data]);
        } catch (err: any) {
            console.error("Error:", err.response?.data || err.message);
            setError(err.response?.data?.message || 'Failed to create publication');
        }
    };
    


    // Get publications by type
    const getPublicationsByType = (type: PublicationType) => {
        return publications.filter(pub => pub.Publication === type);
    };

    return {
        publications,
        loading,
        error,
        addPublication,
        getPublicationsByType,
    };
};
