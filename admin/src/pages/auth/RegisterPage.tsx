import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import AuthLayout from '../../components/auth/AuthLayout';
import InputField from '../../components/auth/InputField';
import SocialLogin from '../../components/auth/SocialLogin';
import AuthCard from '../../components/auth/AuthCard';
import RoleDropdown from '../../components/auth/RoleDropdoem';

const registerRoles = [
  { value: 'student', label: 'Student' },
  { value: 'teacher', label: 'Teacher' },
];

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration logic here
    console.log('Register form submitted:', formData);
  };

  return (
    <AuthLayout>
      <AuthCard
        title="Create Account"
        subtitle="Join us to start managing your dashboard"
        formType="register"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            icon={<User className="text-gray-400" size={20} />}
            type="text"
            name="name"
            placeholder="Full name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <RoleDropdown
            value={formData.role}
            onChange={handleChange}
            options={registerRoles}
            required
          />

          <InputField
            icon={<Mail className="text-gray-400" size={20} />}
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            required
          />

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

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium
              hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              transform transition-transform duration-200 hover:scale-[1.02]"
          >
            Create Account
          </button>
        </form>

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