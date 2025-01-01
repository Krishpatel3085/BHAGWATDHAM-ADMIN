import { useState } from 'react';
import { Plus } from 'lucide-react';
import Layout from '../components/Layout';
import CourseGrid from '../components/course/CousrseGrid';
import CourseForm from '../components/course/CourseForm';
import { Course } from '../types/course';

const CoursePage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const handleEdit = (course: Course) => {
    setSelectedCourse(course);
    setIsFormOpen(true);
  };

  return (

    <div className="space-y-6">
      <div className="bg-[#1e2746] rounded-xl p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-xl font-semibold text-white">Course Management</h1>
            <p className="text-gray-400 text-sm mt-1">Manage and organize courses</p>
          </div>
          <button
            onClick={() => {
              setSelectedCourse(null);
              setIsFormOpen(true);
            }}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
            <span>Add Course</span>
          </button>
        </div>

        <CourseGrid onEdit={handleEdit} />
      </div>

      {isFormOpen && (
        <CourseForm
          course={selectedCourse}
          onClose={() => {
            setIsFormOpen(false);
            setSelectedCourse(null);
          }}
        />
      )}
    </div>

  );
};

export default CoursePage;