import { useState } from 'react';
import PublicationForm from '../components/publication/PublicationForm';
import PublicationCard from '../components/publication/PublicationCard';
import { usePublications } from '../hooks/usePublication';
import { PublicationType, Publication } from '../types/publication';
const publicationTypes: PublicationType[] = ['Kirtan', 'Katha', 'Video', 'Book', 'Wallpaper'];

const PublicationPage = () => {
    const { publications, addPublication, updatePublication, deletePublication, getPublicationsByType } = usePublications();
    const [selectedType, setSelectedType] = useState<PublicationType | 'all'>('all');
    const [selectedPublication, setSelectedPublication] = useState<Publication | null>(null);

    const handleSubmit = (data: any) => {
        if (data.id) {
            updatePublication(data.id, data);
            setSelectedPublication(null);
        } else {
            addPublication(data);
        }
    };

    const handleEdit = (publication: Publication) => {
        setSelectedPublication(publication);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this publication?')) {
            deletePublication(id);
        }
    };

    const filteredPublications = selectedType === 'all'
        ? publications
        : getPublicationsByType(selectedType);

    return (

        <div className="space-y-6">
            <PublicationForm
                onSubmit={handleSubmit}
                publication={selectedPublication}
            />

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
                        <PublicationCard
                            key={publication.id}
                            publication={publication}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PublicationPage;