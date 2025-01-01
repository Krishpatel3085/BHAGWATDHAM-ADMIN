import React from 'react';
import { Eye, Edit2, Trash2 } from 'lucide-react';
import { useImages } from '../../hooks/useImage';

interface ImageGridProps {
    onEdit: (image: any) => void;
}

const ImageGrid: React.FC<ImageGridProps> = ({ onEdit }) => {   
    const { images, deleteImage } = useImages();

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image) => (
                <div key={image.id} className="bg-[#252d3d] rounded-lg overflow-hidden">
                    <div className="aspect-square relative bg-gray-800">
                        <img
                            src={image.url}
                            alt={image.name}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <button
                                onClick={() => window.open(image.url, '_blank')}
                                className="p-2 bg-blue-500/80 rounded-full text-white hover:bg-blue-600/80"
                                title="View"
                            >
                                <Eye size={16} />
                            </button>
                            <button
                                onClick={() => onEdit(image)}
                                className="p-2 bg-green-500/80 rounded-full text-white hover:bg-green-600/80"
                                title="Edit"
                            >
                                <Edit2 size={16} />
                            </button>
                            <button
                                onClick={() => deleteImage(image.id)}
                                className="p-2 bg-red-500/80 rounded-full text-white hover:bg-red-600/80"
                                title="Delete"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                    <div className="p-3">
                        <h3 className="text-white text-sm font-medium truncate">{image.name}</h3>
                        <p className="text-gray-400 text-xs mt-1">{image.subject}</p>
                        <p className="text-gray-400 text-xs">{image.year}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ImageGrid;