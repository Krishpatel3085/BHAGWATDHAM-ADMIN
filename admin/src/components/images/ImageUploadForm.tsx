import React from 'react';
import { Upload, X } from 'lucide-react';
import { useImageForm } from '../../hooks/useImageForm';

interface ImageUploadFormProps {
    onClose: () => void;
}

const ImageUploadForm: React.FC<ImageUploadFormProps> = ({ onClose }) => {
    const { formData, preview, handleChange, handleImageChange, handleSubmit } = useImageForm(onClose);

    return (
        <div className="bg-[#1e2746] rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-white">Upload New Image</h2>
                <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-white transition-colors"
                >
                    <X size={20} />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            Image Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full bg-[#252d3d] border border-gray-700 rounded-lg px-4 py-2.5 text-white"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            Subject
                        </label>
                        <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className="w-full bg-[#252d3d] border border-gray-700 rounded-lg px-4 py-2.5 text-white"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            Year
                        </label>
                        <input
                            type="text"
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                            className="w-full bg-[#252d3d] border border-gray-700 rounded-lg px-4 py-2.5 text-white"
                            required
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            Upload Image
                        </label>
                        <div className="aspect-square bg-[#252d3d] border-2 border-dashed border-gray-700 rounded-lg overflow-hidden">
                            {preview ? (
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center">
                                    <Upload className="text-gray-400 mb-2" size={32} />
                                    <p className="text-sm text-gray-400">Click or drag image to upload</p>
                                </div>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                        </div>
                    </div>
                </div>

                <div className="md:col-span-2 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Upload Image
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ImageUploadForm;