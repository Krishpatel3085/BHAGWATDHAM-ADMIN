// import { useState, ChangeEvent } from "react"
import { useState, ChangeEvent, FormEvent, useEffect } from "react";

import { Loader2, Pencil, Trash } from 'lucide-react'
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import { APi_URL } from "../Server";


interface ImageData {
    _id: string;
    Img: string;
    ImageName: string;
    ImageSubject: string;
    Imageyear: string;
    year?: string | number;
}
export default function Gallery() {
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [uploadedImages, setUploadedImages] = useState<ImageData[]>([]);
    const [editingImage, setEditingImage] = useState<ImageData | null>(null);

    const [selectedYear, setSelectedYear] = useState<string | null>(null);
    const [filteredImages, setFilteredImages] = useState<ImageData[]>([]);
    const [formData, setFormData] = useState({
        name: "",
        subject: "",
        year: "",
    })

    const fetchImages = async () => {
        try {
            const response = await axios.get(APi_URL + "GalleryPage/getGPa");
            setUploadedImages(response.data.galleries);
            setFilteredImages(response.data.galleries);
        } catch (error) {
            console.error("Error fetching images", error);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);


    const uniqueYears = [...new Set(uploadedImages.map(img => img.Imageyear))]
        .filter(year => Number(year) >= new Date().getFullYear() - 5) // Convert to number before comparison
        .sort((a, b) => Number(b) - Number(a)); // Sort descending

    // Handle Year Click
    const filterByYear = (year: string | null) => {
        setSelectedYear(year);
        if (year) {
            setFilteredImages(uploadedImages.filter(img => img.Imageyear === year));
        } else {
            setFilteredImages(uploadedImages);
        }
    };
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!imageFile) {
            alert("Please upload an image");
            return;
        }

        setIsLoading(true);

        const formDataToSend = new FormData();
        formDataToSend.append("ImageName", formData.name);
        formDataToSend.append("ImageSubject", formData.subject);
        formDataToSend.append("Imageyear", formData.year);
        formDataToSend.append("Img", imageFile);

        try {
            await axios.post(APi_URL + "GalleryPage/uploadGPa", formDataToSend, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            alert("Upload Successful");
            resetForm();
            fetchImages(); // Refresh images
        } catch (error) {
            console.error("Error uploading image", error);
            alert("Upload failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdate = async (e: FormEvent) => {
        e.preventDefault();
        if (!editingImage) return;

        setIsLoading(true);

        const formDataToSend = new FormData();
        formDataToSend.append("ImageName", formData.name);
        formDataToSend.append("ImageSubject", formData.subject);

        if (imageFile) {
            formDataToSend.append("Img", imageFile);
        } else {
            formDataToSend.append("Img", ""); // Ensure backend gets an empty value if no file is uploaded
        }

        try {
            await axios.put(`${APi_URL}GalleryPage/updateGPa/${editingImage._id}`, formDataToSend, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            alert("Update Successful");
            resetForm();
            fetchImages();
        } catch (error) {
            console.error("Error updating image", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (image: ImageData) => {
        setFormData({ name: image.ImageName, subject: image.ImageSubject, year: image.Imageyear });
        setImagePreview(image.Img);
        setEditingImage(image);
    };



    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this image?")) {
            try {
                await axios.delete(`${APi_URL}GalleryPage/deleteGPa/${id}`);
                setUploadedImages((prev) => prev.filter((img) => img._id !== id));
            } catch (error) {
                console.error("Error deleting image", error);
            }
        }
    };

    const resetForm = () => {
        setFormData({ name: "", subject: "", year: "" });
        setImageFile(null);
        setImagePreview(null);
        setEditingImage(null);
    };

    return (
        <div className="p-6">



            <div className="space-y-6">

                <div className="bg-[#1e2746] rounded-xl p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                        <div>
                            <h1 className="text-xl font-semibold text-white">Images Management</h1>
                            <p className="text-gray-400 text-sm mt-1">Track and manage student fees</p>
                        </div>
                    </div>
                    <form onSubmit={editingImage ? handleUpdate : handleSubmit} className="space-y-6">
                        <div className="bg-[#1e2746] rounded-xl p-6">
                            <Card className="w-full max-w-4xl border border-light-800 mt-4">
                                <div className="p-6 grid gap-6 md:grid-cols-2">
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Form.Label htmlFor="name" className="text-gray-200">
                                                IMAGE NAME
                                            </Form.Label>
                                            <Form.Control
                                                id="name"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full bg-transparent border p-1.5 border-gray-600 text-white rounded-lg"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Form.Label htmlFor="subject" className="text-gray-200">
                                                IMAGE SUBJECT
                                            </Form.Label>
                                            <Form.Control
                                                id="subject"
                                                value={formData.subject}
                                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                                className="w-full bg-transparent border p-1.5 border-gray-600 text-white rounded-lg"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Form.Label htmlFor="year" className="text-gray-200">
                                                IMAGE YEAR
                                            </Form.Label>
                                            <Form.Control
                                                id="year"
                                                value={formData.year}
                                                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                                                className="w-full bg-transparent border p-1.5 border-gray-600 text-white rounded-lg input-lg"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Form.Label htmlFor="image" className="text-gray-200">
                                                UPLOAD IMAGE
                                            </Form.Label>
                                            <Form.Control
                                                id="image"
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="w-full bg-transparent border p-1.5 border-gray-600 text-white file:bg-gray-800 file:text-white file:border-0 rounded-lg"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 disabled:bg-gray-600"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : editingImage ? "Update" : "Submit"}
                                        </button>
                                    </div>
                                    <div className="relative aspect-square rounded-lg border border-gray-600 overflow-hidden">
                                        {imagePreview ? (
                                            <img src={imagePreview} alt="Preview" className="w-full h-full object-contain" />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                                UPLOADED IMAGE
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </form>
                </div>
            </div>

            <div className="flex gap-4 mb-0 mt-4">
                {uniqueYears.map(year => (
                    <button
                        key={year}
                        onClick={() => filterByYear(year)}
                        className={`px-4 py-2 rounded-lg ${selectedYear === year ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"}`}
                    >
                        {year}
                    </button>
                ))}
                {selectedYear && (
                    <button onClick={() => filterByYear(null)} className="bg-red-500 text-white px-4 py-2 rounded-lg">
                        Clear Filter
                    </button>
                )}
            </div>

            <div className="mt-10">
                <h2 className="text-lg font-semibold text-white mb-4">Uploaded Images</h2>
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {filteredImages.map((img) => (
                        <div key={img._id} className="relative group bg-gray-800 p-3 rounded-lg">
                            <img src={img.Img} alt={img.ImageName} className="w-full h-48 object-cover object-center rounded-lg" />
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <p className="text-white font-semibold">{img.ImageName}</p>
                                <div className="flex gap-3 mt-2">
                                    <button onClick={() => handleEdit(img)} className="bg-blue-500 p-2 rounded-full text-white hover:bg-blue-600">
                                        <Pencil className="h-5 w-5" />
                                    </button>
                                    <button onClick={() => handleDelete(img._id)} className="bg-red-500 p-2 rounded-full text-white hover:bg-red-600">
                                        <Trash className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}
