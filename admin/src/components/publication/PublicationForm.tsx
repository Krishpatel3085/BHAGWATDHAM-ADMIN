import React, { useState, useEffect } from 'react';
import { Upload, X } from 'lucide-react';
import { PublicationType, Publication } from '../../types/publication';

interface PublicationFormProps {
    onSubmit: (data: any) => void;
    publication?: Publication | null;
}

const publicationTypes: PublicationType[] = ['Kirtan', 'Katha', 'Video', 'Book', 'Wallpaper'];

const PublicationForm: React.FC<PublicationFormProps> = ({ onSubmit, publication }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [formData, setFormData] = useState({
        Publication: '',
        PublicationName: '',
        Description: '',
        PublicationDate: '',
        Link: '',
    });
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    useEffect(() => {
        if (publication) {
            setFormData({
                Publication: publication.Publication,
                PublicationName: publication.PublicationName,
                Description: publication.Description,
                PublicationDate: publication.PublicationDate,
                Link: publication.Link || '',
            });
            setImagePreview(publication.Img);
        }
    }, [publication]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file); // Store file for submission
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedFile) return alert("Please select an image");

        onSubmit({
            ...formData,
            file: selectedFile, // Pass file to backend
            id: publication?._id,
        });

        // Reset form
        setFormData({
            Publication: '',
            PublicationName: '',
            Description: '',
            PublicationDate: '',
            Link: '',
        });
        setImagePreview(null);
        setSelectedFile(null);

    };

    return (
        <div className="bg-[#1e2746] rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6">
                {publication ? 'Update Publication' : 'Create Publication'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            Publication Type *
                        </label>
                        <select
                            name="Publication"
                            value={formData.Publication}
                            onChange={handleChange}
                            className="w-full bg-[#252d3d] border border-gray-700 rounded-lg px-4 py-2.5 text-white"
                            required
                        >
                            <option value="">Select Type</option>
                            {publicationTypes.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            Publication Name *
                        </label>
                        <input
                            type="text"
                            name="PublicationName"
                            value={formData.PublicationName}
                            onChange={handleChange}
                            className="w-full bg-[#252d3d] border border-gray-700 rounded-lg px-4 py-2.5 text-white"
                            required
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            Description *
                        </label>
                        <textarea
                            name="Description"
                            value={formData.Description}
                            onChange={handleChange}
                            rows={3}
                            className="w-full bg-[#252d3d] border border-gray-700 rounded-lg px-4 py-2.5 text-white"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            Publication Date *
                        </label>
                        <input
                            type="date"
                            name="PublicationDate"
                            value={formData.PublicationDate}
                            onChange={handleChange}
                            className="w-full bg-[#252d3d] border border-gray-700 rounded-lg px-4 py-2.5 text-white"
                            required
                        />
                    </div>

                    {formData.Publication === 'Katha' && (
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                YouTube Link *
                            </label>
                            <input
                                type="url"
                                name="Link"
                                value={formData.Link}
                                onChange={handleChange}
                                className="w-full bg-[#252d3d] border border-gray-700 rounded-lg px-4 py-2.5 text-white"
                                required
                                placeholder="https://youtube.com/watch?v=..."
                            />
                        </div>
                    )}

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            Publication Image *
                        </label>
                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-700 px-6 py-10">
                            <div className="text-center">
                                {imagePreview ? (
                                    <div className="relative">
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="mx-auto h-32 w-32 object-cover rounded-lg"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setImagePreview(null)}
                                            className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center">
                                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                        <div className="mt-4 flex text-sm leading-6 text-gray-400">
                                            <label className="relative cursor-pointer rounded-md bg-transparent font-semibold text-blue-400 hover:text-blue-300">
                                                <span>Upload a file</span>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="sr-only"
                                                    onChange={handleImageChange}
                                                    required={!publication}
                                                />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs leading-5 text-gray-400">
                                            PNG, JPG, GIF up to 10MB
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-6">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        {publication ? 'Update Publication' : 'Create Publication'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PublicationForm;