import { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import AuthLayout from '../../components/auth/AuthLayout';
import InputField from '../../components/auth/InputField';
import SocialLogin from '../../components/auth/SocialLogin';
import AuthCard from '../../components/auth/AuthCard';
import RoleDropdown from '../../components/auth/RoleDropdoem';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { APi_URL } from '../../Server';


// Roles available for registration
const registerRoles = [
    { value: 'Student', label: 'Student' },
    { value: 'Teacher', label: 'Teacher' },
];
const gender = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
];

const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: '',
        gender: '',
    });

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            await axios.post(APi_URL + 'user/register', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Reset form fields
            setFormData({
                username: '',
                email: '',
                password: '',
                role: '',
                gender: '',
            });

            alert('Registration Successful.');
            navigate('/login');
        } catch (error) {
            console.error('Error:', error);
            alert(error || 'User already exists or an error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout>
            <AuthCard
                title="Create Account"
                subtitle="Join us to start managing your dashboard"
                formType="register"
            >
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Username Field */}
                    <InputField
                        icon={<User className="text-gray-400" size={20} />}
                        type="text"
                        name="username"
                        placeholder="Full name"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />

                    {/* Role Dropdown */}
                    <RoleDropdown
                        name="role"  // Added name attribute
                        value={formData.role}
                        onChange={handleChange}
                        options={registerRoles}
                        placeholder="Select Role" 
                        required
                    />

                    {/* Gender Field*/}
                    <RoleDropdown
                        name="gender"  // Added name attribute
                        value={formData.gender}
                        onChange={handleChange}
                        options={gender}
                        placeholder="Select Gender" 
                        required
                    />

                    {/* Email Field */}
                    <InputField
                        icon={<Mail className="text-gray-400" size={20} />}
                        type="email"
                        name="email"
                        placeholder="Email address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    {/* Password Field */}
                    <InputField
                        icon={<Lock className="text-gray-400" size={20} />}
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        endIcon={
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="text-gray-400 hover:text-gray-600 focus:outline-none"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        }
                    />

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium
                        hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                        transform transition-transform duration-200 hover:scale-[1.02]"
                        disabled={loading}
                    >
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>

                {/* Divider and Social Login */}
                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Or continue with</span>
                        </div>
                    </div>

                    <SocialLogin />
                </div>

                {/* Sign-In Link */}
                <p className="mt-6 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <a href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                        Sign in
                    </a>
                </p>
            </AuthCard>
        </AuthLayout>
    );
};

export default RegisterPage;
