import { useState, useRef, useEffect } from 'react';
import { Settings, User, LogOut } from 'lucide-react';
import Cookies from 'js-cookie'; // Added import for Cookies
import { useNavigate } from 'react-router-dom';

const SettingsDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        Cookies.remove('Admin-userEmail')
        console.log('Logging out...');
        navigate('/')
    };

    return (
        <div className="relative" ref={dropdownRef} >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 hover:bg-[#252d3d] rounded-full transition-colors"
                aria-label="Settings"
            >
                <Settings size={20} className="text-gray-400" />
            </button>

            {
                isOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-[#252d3d] rounded-lg shadow-lg py-1 z-50" >
                        <button
                            onClick={
                                () => {
                                    setIsOpen(false);
                                    // Handle profile click
                                }
                            }
                            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-300 hover:bg-[#1e2746] transition-colors"
                        >
                            <User size={16} />
                            < span > Profile </span>
                        </button>
                        < button
                            onClick={() => {
                                setIsOpen(false);
                                handleLogout();
                            }}
                            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-300 hover:bg-[#1e2746] transition-colors"
                        >
                            <LogOut size={16} />
                            < span > Logout </span>
                        </button>
                    </div>
                )
            }
        </div >
    );
};

export default SettingsDropdown;