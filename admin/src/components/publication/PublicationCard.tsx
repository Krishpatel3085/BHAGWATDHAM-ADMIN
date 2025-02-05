import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Youtube, Edit2, Trash2, FileText, ExternalLink } from 'lucide-react';
import { Publication } from '../../types/publication';

interface PublicationCardProps {
  publication: Publication;
  onEdit: (publication: Publication) => void;
  onDelete: (id: string) => void;
}

const PublicationCard: React.FC<PublicationCardProps> = ({ publication, onEdit, onDelete }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleViewContent = () => {
    if (publication.Publication === 'Book' && publication.pdfUrl) {
      window.open(publication.pdfUrl, '_blank');
    } else if ((publication.Publication === 'Katha' || publication.Publication === 'Kirtan') && publication.Link) {
      window.open(publication.Link, '_blank');
    }
  };

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
          <div className="relative group">
            <img
              src={publication.Img}
              alt={publication.PublicationName}
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              {(publication.Publication === 'Katha' || publication.Publication === 'Kirtan') && publication.Link && (
                <button
                  onClick={handleViewContent}
                  className="p-2 bg-red-500 rounded-full text-white hover:bg-red-600 transform hover:scale-110 transition-all"
                  title="Watch Video"
                >
                  <Youtube size={24} />
                </button>
              )}
              {publication.Publication === 'Book' && publication.pdfUrl && (
                <button
                  onClick={handleViewContent}
                  className="p-2 bg-blue-500 rounded-full text-white hover:bg-blue-600 transform hover:scale-110 transition-all"
                  title="View Book"
                >
                  <FileText size={24} />
                </button>
              )}
            </div>
            <div className="absolute top-2 right-2 flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(publication);
                }}
                className="p-1.5 bg-blue-500/80 rounded-lg text-white hover:bg-blue-600/80 transition-colors"
                title="Edit"
              >
                <Edit2 size={16} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(publication._id);
                }}
                className="p-1.5 bg-red-500/80 rounded-lg text-white hover:bg-red-600/80 transition-colors"
                title="Delete"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
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

            {((publication.Publication === 'Katha' || publication.Publication === 'Kirtan') && publication.Link) && (
              <button
                onClick={handleViewContent}
                className="flex items-center justify-center gap-2 mt-4 bg-red-500/20 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500/30 transition-colors"
              >
                <Youtube size={20} />
                <span>Watch Video</span>
                <ExternalLink size={16} />
              </button>
            )}

            {(publication.Publication === 'Book' && publication.pdfUrl) && (
              <button
                onClick={handleViewContent}
                className="flex items-center justify-center gap-2 mt-4 bg-blue-500/20 text-blue-400 px-4 py-2 rounded-lg hover:bg-blue-500/30 transition-colors"
              >
                <FileText size={20} />
                <span>View Book</span>
                <ExternalLink size={16} />
              </button>
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