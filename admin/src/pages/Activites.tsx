import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Pencil, Trash, Loader2 } from "lucide-react"; // Icons
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { APi_URL } from "../Server";

interface ImageData {
    _id: string;
    Img: string;
    ActivitiesName: string;
    ActivitiesSubject: string;
    ActivitiesDescription?: string;
    ActivitiesDate?: string;
    ActivitiesTime?: string;
}

export default function Activities() {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [uploadedImages, setUploadedImages] = useState<ImageData[]>([]);
    const [editingImage, setEditingImage] = useState<ImageData | null>(null);

    // Include all form fields
    const [formData, setFormData] = useState({
        name: "",
        subject: "",
        description: "",
        date: "",
        time: "",
    });

    // Fetch images from backend
    const fetchImages = async () => {
        try {
            const response = await axios.get(APi_URL + "Activities/FetchAllActivities");
            setUploadedImages(response.data.activities);
            console.log(response)
        } catch (error) {
            console.error("Error fetching images", error);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

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

    // Handle form submission for new image
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!imageFile) {
            alert("Please upload an image");
            return;
        }

        setIsLoading(true);
        const formDataToSend = new FormData();
        formDataToSend.append("ActivitiesName", formData.name);
        formDataToSend.append("ActivitiesSubject", formData.subject);
        formDataToSend.append("ActivitiesDescription", formData.description);
        formDataToSend.append("ActivitiesDate", formData.date);
        formDataToSend.append("ActivitiesTime", formData.time);
        formDataToSend.append("Img", imageFile);

        try {
            await axios.post(APi_URL + "Activities/CreateActivities", formDataToSend, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            alert("Upload Successful");
            resetForm();
            fetchImages();
        } catch (error) {
            console.error("Error uploading image", error);
            alert("Upload failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    // Handle update of existing image
    const handleUpdate = async (e: FormEvent) => {
        e.preventDefault();
        if (!editingImage) return;

        setIsLoading(true);
        const formDataToSend = new FormData();
        formDataToSend.append("ActivitiesName", formData.name);
        formDataToSend.append("ActivitiesSubject", formData.subject);
        formDataToSend.append("ActivitiesDescription", formData.description);
        formDataToSend.append("ActivitiesDate", formData.date);
        formDataToSend.append("ActivitiesTime", formData.time);

        if (imageFile) {
            formDataToSend.append("Img", imageFile);
        } else {
            formDataToSend.append("Img", ""); // Ensure backend gets an empty value if no file is uploaded
        }
        try {
            await axios.put(`${APi_URL}Activities/updateActivities/${editingImage._id}`, formDataToSend, {
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

    // Populate form when editing
    const handleEdit = (image: ImageData) => {
        setFormData({
            name: image.ActivitiesName,
            subject: image.ActivitiesSubject,
            description: image.ActivitiesDescription || "",
            date: image.ActivitiesDate || "",
            time: image.ActivitiesTime || "",
        });
        setImagePreview(image.Img);
        setEditingImage(image);
    };

    // Delete an image
    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this image?")) {
            try {
                await axios.delete(`${APi_URL}Activities/deleteActivities/${id}`);
                setUploadedImages((prev) => prev.filter((img) => img._id !== id));
            } catch (error) {
                console.error("Error deleting image", error);
            }
        }
    };

    // Reset form fields
    const resetForm = () => {
        setFormData({ name: "", subject: "", description: "", date: "", time: "" });
        setImageFile(null);
        setImagePreview(null);
        setEditingImage(null);
    };

    return (
        <div className="p-6">
            {/* Upload/Edit Form */}
            <form onSubmit={editingImage ? handleUpdate : handleSubmit} className="space-y-6">
                <div className="bg-[#1e2746] rounded-xl p-6">
                    <h1 className="text-xl font-semibold text-white">Activities Management</h1>
                    <p className="text-gray-400 text-sm mt-1">Track and manage Activities</p>
                    <Card className="w-full max-w-4xl border border-light-800 mt-4">
                        <div className="p-6 grid gap-6 md:grid-cols-2">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Form.Label htmlFor="name" className="text-gray-200">
                                        Activities NAME
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
                                        Activities subject
                                    </Form.Label>
                                    <Form.Control
                                        id="subject"
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        className="w-full bg-transparent border p-1.5 border-gray-600 text-white rounded-lg"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Form.Label htmlFor="description" className="text-gray-200">
                                        Activities Description
                                    </Form.Label>
                                    <Form.Control
                                        id="description"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full bg-transparent border p-1.5 border-gray-600 text-white rounded-lg"
                                    />
                                </div>

                                <div className="space-y-2">

                                    <Form.Label htmlFor="date" className="text-gray-200">
                                        Activities Date
                                    </Form.Label>
                                    <Form.Control
                                        id="date"
                                        type="date" // Enables the calendar picker
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        className="w-full bg-transparent border p-1.5 border-gray-600 text-white rounded-lg"
                                    />
                                </div>


                                <div className="space-y-2">
                                    <Form.Label htmlFor="time" className="text-gray-200">
                                        Activities Time
                                    </Form.Label>
                                    <Form.Control
                                        id="time"
                                        value={formData.time}
                                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                        className="w-full bg-transparent border p-1.5 border-gray-600 text-white rounded-lg"
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

            {/* Uploaded Images Grid */}
            <div className="mt-10">
                <h2 className="text-lg font-semibold text-white mb-4">Uploaded Activities</h2>
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {uploadedImages.map((img) => (
                        <div key={img._id} className="relative group bg-gray-800 p-3 rounded-lg">
                            <img src={img.Img} alt={img.ActivitiesName} className="w-full h-48 object-cover rounded-lg" />
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <p className="text-white font-semibold">{img.ActivitiesName}</p>
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
    );
}
