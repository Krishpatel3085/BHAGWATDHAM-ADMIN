import React from 'react';
import { X, Upload } from 'lucide-react';
import { useCourseForm } from '../../hooks/useCourseForm';
import { Course } from '../../types/course';

interface CourseFormProps {
    course: Course | null;
    onClose: () => void;
}

const CourseForm: React.FC<CourseFormProps> = ({ course, onClose }) => {
    const { formData, preview, handleChange, handleImageChange, handleSubmit } = useCourseForm(course, onClose);

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto" >
            <div className="fixed inset-0 bg-black/50" onClick={onClose} />

            <div className="relative min-h-screen flex items-center justify-center p-4" >
                <div className="relative bg-[#1e2746] rounded-xl w-full max-w-md p-6" >
                    <div className="flex items-center justify-between mb-6" >
                        <h2 className="text-lg font-semibold text-white" >
                            {course ? 'Edit Course' : 'Add Course'}
                        </h2>
                        < button
                            onClick={onClose}
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    < form onSubmit={handleSubmit} className="space-y-4" >
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1" >
                                Course Name
                            </label>
                            < input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full bg-[#252d3d] border border-gray-700 rounded-lg px-4 py-2.5 text-white"
                                required
                            />
                        </div>

                        < div >
                            <label className="block text-sm font-medium text-gray-300 mb-1" >
                                Subject
                            </label>
                            < input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                className="w-full bg-[#252d3d] border border-gray-700 rounded-lg px-4 py-2.5 text-white"
                                required
                            />
                        </div>

                        < div >
                            <label className="block text-sm font-medium text-gray-300 mb-1" >
                                Year
                            </label>
                            < input
                                type="text"
                                name="year"
                                value={formData.year}
                                onChange={handleChange}
                                className="w-full bg-[#252d3d] border border-gray-700 rounded-lg px-4 py-2.5 text-white"
                                required
                            />
                        </div>

                        < div >
                            <label className="block text-sm font-medium text-gray-300 mb-1" >
                                Course Image
                            </label>
                            < div className="grid grid-cols-2 gap-4" >
                                <div className="relative aspect-square bg-[#252d3d] border border-gray-700 rounded-lg overflow-hidden" >
                                    {
                                        preview ? (
                                            <img
                                                src={preview}
                                                alt="Preview"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <Image className="text-gray-600" size={32} />
                                            </div>
                                        )}
                                </div>
                                < div className="flex items-center" >
                                    <label className="flex-1 cursor-pointer" >
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="hidden"
                                        />
                                        <div className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors" >
                                            <Upload size={20} />
                                            < span > Upload </span>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        < div className="flex justify-end gap-3 mt-6" >
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                            >
                                Cancel
                            </button>
                            < button
                                type="submit"
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                {course ? 'Update' : 'Add'} Course
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CourseForm;