import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import AuthLayout from '../../components/auth/AuthLayout';
import InputField from '../../components/auth/InputField';
import SocialLogin from '../../components/auth/SocialLogin';
import AuthCard from '../../components/auth/AuthCard';
import RoleDropdown from '../../components/auth/RoleDropdoem'; // Fixed typo
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie'; // Added import for Cookies

const loginRoles = [
  { value: 'student', label: 'Student' },
  { value: 'teacher', label: 'Teacher' },
  { value: 'principal', label: 'Principal' },
  { value: 'temple', label: 'Temple' },
];

const API_URL = 'https://ldfs6814-8000.inc1.devtunnels.ms/';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const LoginAdmin = async (e) => {
    e.preventDefault();
    const { email, password, role } = formData;
    try {
      const response = await axios.post(API_URL + 'user/login', {
        email,
        password,
        role,
      });
      console.log(response);

  
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);

      Cookies.set('Admin-userEmail', email, { expires: 7 });

      alert('Login successfully 👍');
      navigate('/dashboard');
      
      window.location.reload();


    } catch (error) {
      if (error.response && error.response.status === 403) {
        alert('Your account is not approved yet. Please wait for principal approval.');
        navigate('/request');
      } else {
        alert(error.response?.data?.message || 'User Not Found or Invalid Credentials 👎');
        console.error('Login error:', error);
        navigate('/');
      }
    };
  }

  const handleSubmit = (e) => {
    LoginAdmin(e);
  };

  return (
    <AuthLayout>
      <AuthCard
        title="Welcome Back!"
        subtitle="Log in to access your dashboard"
        formType="login"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <RoleDropdown
            name='role'
            value={formData.role}
            onChange={handleChange}
            options={loginRoles}
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

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
              <span className="ml-2 text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium
              hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              transform transition-transform duration-200 hover:scale-[1.02]"
          >
            Sign in
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
          Don't have an account?{' '}
          <a href="/register" className="text-blue-600 hover:text-blue-700 font-medium">
            Sign up
          </a>
        </p>
      </AuthCard>
    </AuthLayout>
  );
};

export default LoginPage;
