import React from 'react';
import { Edit2, Trash2, Image } from 'lucide-react';
import { useCourses } from '../../hooks/useCourse';

interface CourseGridProps {
    onEdit: (course: any) => void;
}

const CourseGrid: React.FC<CourseGridProps> = ({ onEdit }) => {
    const { courses, deleteCourse } = useCourses();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {courses.map((course) => (
                <div key={course.id} className="bg-[#252d3d] rounded-lg overflow-hidden">
                    <div className="aspect-square relative bg-gray-800">
                        {course.imageUrl ? (
                            <img
                                src={course.imageUrl}
                                alt={course.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <Image className="text-gray-600" size={48} />
                            </div>
                        )}
                    </div>

                    <div className="p-4">
                        <h3 className="text-white font-medium truncate">{course.name}</h3>
                        <p className="text-gray-400 text-sm mt-1 truncate">{course.subject}</p>
                        <p className="text-gray-400 text-sm mt-1">{course.year}</p>
                    </div>

                    <div className="px-4 py-3 border-t border-gray-700 flex justify-end gap-2">
                        <button
                            onClick={() => onEdit(course)}
                            className="p-1.5 hover:bg-[#1e2746] rounded-lg text-blue-400 hover:text-blue-300"
                            title="Edit"
                        >
                            <Edit2 size={16} />
                        </button>
                        <button
                            onClick={() => deleteCourse(course.id)}
                            className="p-1.5 hover:bg-[#1e2746] rounded-lg text-red-400 hover:text-red-300"
                            title="Delete"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CourseGrid;