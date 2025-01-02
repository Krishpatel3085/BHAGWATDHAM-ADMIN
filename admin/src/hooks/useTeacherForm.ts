import { useState, useEffect } from 'react';
import { useTeachers } from './useTeachers';
import { Teacher } from '../types/teacher';

const initialFormData = {
    name: '',
    employeeNo: '',
    address: '',
    salary: '',
    grade: '',
    age: '',
};

export const useTeacherForm = (teacher: Teacher | null, onClose: () => void) => {
    const [formData, setFormData] = useState(initialFormData);
    const { addTeacher, updateTeacher } = useTeachers();

    useEffect(() => {
        if (teacher) {
            setFormData({
                name: teacher.name,
                employeeNo: teacher.employeeNo,
                address: teacher.address,
                salary: teacher.salary.toString(),
                grade: teacher.grade,
                age: teacher.age,  // Assuming age is a string in the teacher object
            });
        } else {
            setFormData(initialFormData);
        }
    }, [teacher]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const teacherData = {
            name: formData.name,
            employeeNo: formData.employeeNo,
            address: formData.address,
            salary: parseInt(formData.salary),
            grade: formData.grade,
            age: formData.age,
        };

        if (teacher) {
            updateTeacher(teacher.id, teacherData);
        } else {
            addTeacher(teacherData);
        }

        onClose();
    };

    return {
        formData,
        handleChange,
        handleSubmit,
    };
};




// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useTeachers } from './useTeachers';
// import { Teacher } from '../types/teacher';

// const initialFormData = {
//     name: '',
//     employeeNo: '',
//     address: '',
//     salary: '',
//     grade: '',
//     age: '',
// };

// const API_URL = 'https://ldfs6814-8000.inc1.devtunnels.ms/';

// export const useTeacherForm = (teacher: Teacher | null, onClose: () => void) => {
//     const [formData, setFormData] = useState(initialFormData);
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//     const { addTeacher, updateTeacher } = useTeachers();

//     useEffect(() => {
//         if (teacher) {
//             setFormData({
//                 name: teacher.name,
//                 employeeNo: teacher.employeeNo,
//                 address: teacher.address,
//                 salary: teacher.salary.toString(),
//                 grade: teacher.grade,
//                 age: teacher.age,
//             });
//         } else {
//             setFormData(initialFormData);
//         }
//     }, [teacher]);

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             [name]: value,
//         }));
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setIsLoading(true);
//         setError(null);

//         const teacherData = {
//             name: formData.name,
//             employeeNo: formData.employeeNo,
//             address: formData.address,
//             salary: parseInt(formData.salary, 10),
//             grade: formData.grade,
//             age: formData.age,
//         };

//         try {
//             if (teacher) {
//                 // Update teacher API call
//                 await axios.put(API_URL + `teacher/UpdateTeacher/${teacher.id}`, teacherData);
//                 updateTeacher(teacher.id, teacherData);
//             } else {
//                 // Add teacher API call
//                 const response = await axios.post(API_URL + 'teacher/CreateTeacher', teacherData);
//                 console.log('API Response:', response.data);
//                 addTeacher(response.data); 
//             }
//             onClose();
//         } catch (err: any) {
//             setError(err.response?.data?.message || 'An error occurred');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return {
//         formData,
//         handleChange,
//         handleSubmit,
//         isLoading,
//         error,
//     };
// };
