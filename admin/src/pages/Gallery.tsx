import { useState, ChangeEvent } from "react"
import { Upload } from 'lucide-react'
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

export default function Gallery() {
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const [formData, setFormData] = useState({
        name: "",
        subject: "",
        year: "",
    })

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setImagePreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }
    return (

        <div className="space-y-6">

            <div className="bg-[#1e2746] rounded-xl p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div>
                        <h1 className="text-xl font-semibold text-white">Images Management</h1>
                        <p className="text-gray-400 text-sm mt-1">Track and manage student fees</p>
                    </div>
                </div>
                <Card className="w-full max-w-5xl border border-light-800">
                    <div className="p-6 grid gap-6 md:grid-cols-2">
                        {/* Form Section */}
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Form.Label htmlFor="name" className="text-gray-200">
                                    IMAGE NAME
                                </Form.Label>
                                <div className="relative">
                                    <Form.Control
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-transparent border p-1.5 border-gray-600 text-white pl-8 rounded-lg"
                                    />
                                    <Upload className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Form.Label htmlFor="subject" className="text-gray-200">
                                    IMAGE SUBJECT
                                </Form.Label> <br />
                                <Form.Control
                                    id="subject"
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    className="w-full bg-transparent  border p-1.5 border-gray-600 text-white rounded-lg"
                                />
                            </div>

                            <div className="space-y-2">
                                <Form.Label htmlFor="year" className="text-gray-200">
                                    IMAGE YEAR
                                </Form.Label> <br />
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
                                </Form.Label> <br />
                                <Form.Control
                                    id="image"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="w-full bg-transparent border p-1.5 border-rounded border-gray-600 text-white file:bg-gray-800 file:text-white file:border-0 rounded-lg"
                                />

                            </div>
                        </div>

                        {/* Image Preview Section */}
                        <div className="relative aspect-square rounded-lg border border-gray-600 overflow-hidden">
                            {imagePreview ? (
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="w-full h-full object-contain"
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                    UPLOADED IMAGE
                                </div>
                            )}
                        </div>
                    </div>
                </Card>
            </div>
        </div>

    )
}
