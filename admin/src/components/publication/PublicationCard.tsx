import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Youtube } from 'lucide-react';
import { Publication } from '../../types/publication';

interface PublicationCardProps {
    publication: Publication;
}

const PublicationCard: React.FC<PublicationCardProps> = ({ publication }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div className="relative h-[400px] w-full perspective-1000">
            <motion.div
                className="relative w-full h-full transition-transform duration-500"
                initial={false}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* Front of card */}
                <div className="absolute inset-0 bg-[#252d3d] rounded-xl overflow-hidden backface-hidden">
                    <img
                        src={publication.Img}
                        alt={publication.PublicationName}
                        className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                        <span className="inline-block px-2 py-1 rounded-full text-xs bg-blue-500/20 text-blue-400">
                            {publication.Publication}
                        </span>
                        <h3 className="mt-3 text-lg font-semibold text-white line-clamp-2">
                            {publication.PublicationName}
                        </h3>
                        <p className="mt-2 text-sm text-gray-400 line-clamp-2">
                            {publication.Description}
                        </p>
                        <button
                            onClick={() => setIsFlipped(true)}
                            className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            View Details
                        </button>
                    </div>
                </div>

                {/* Back of card */}
                <div
                    className="absolute inset-0 bg-[#252d3d] rounded-xl p-6 backface-hidden"
                    style={{ transform: 'rotateY(180deg)' }}
                >
                    <div className="h-full flex flex-col">
                        <h3 className="text-lg font-semibold text-white mb-4">{publication.PublicationName}</h3>

                        <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                            <Calendar size={16} />
                            <span>{new Date(publication.PublicationDate).toLocaleDateString()}</span>
                        </div>

                        <p className="text-gray-300 flex-grow">
                            {publication.Description}
                        </p>

                        {publication.Link && (
                            <a
                                href={publication.Link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-red-400 hover:text-red-300 mt-4"
                            >
                                <Youtube size={20} />
                                <span>Watch on YouTube</span>
                            </a>
                        )}

                        <button
                            onClick={() => setIsFlipped(false)}
                            className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Back to Front
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default PublicationCard;