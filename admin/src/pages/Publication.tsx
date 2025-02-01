import { useState } from 'react';
import PublicationForm from '../components/publication/PublicationForm';
import PublicationCard from '../components/publication/PublicationCard';
import { usePublications } from '../hooks/usePublication';
import { PublicationType } from '../types/publication';

const publicationTypes: PublicationType[] = ['Kirtan', 'Katha', 'Video', 'Book', 'Wallpaper'];

const PublicationPage = () => {
    const { addPublication, getPublicationsByType } = usePublications();
    const [selectedType, setSelectedType] = useState<PublicationType | 'all'>('all');

    const handleSubmit = (data: any) => {
        addPublication(data);
    };

    const filteredPublications = selectedType === 'all'
        ? [] // Show all publications
        : getPublicationsByType(selectedType);

    return (

        <div className="space-y-6">
            <PublicationForm onSubmit={handleSubmit} />

            <div className="bg-[#1e2746] rounded-xl p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <h2 className="text-xl font-semibold text-white">Publications</h2>
                    <div className="flex items-center gap-2">
                        <label className="text-sm text-gray-400">Filter by:</label>
                        <select
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value as PublicationType | 'all')}
                            className="bg-[#252d3d] border border-gray-700 rounded-lg px-3 py-1.5 text-white text-sm"
                        >
                            <option value="all">All Types</option>
                            {publicationTypes.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredPublications.map((publication) => (
                        <PublicationCard key={publication.id} publication={publication} />
                    ))}
                </div>
            </div>
        </div>

    );
};

export default PublicationPage;