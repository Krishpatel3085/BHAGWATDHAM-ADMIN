import { useState, useRef, useEffect } from 'react';
import { ChevronDown, User, Settings, HelpCircle } from 'lucide-react';

const ProfileMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 hover:bg-[#252d3d] rounded-lg p-1 transition-colors"
            >
                <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                />
                <span className="text-gray-300 text-sm hidden md:block">John Smith</span>
                <ChevronDown size={16} className="text-gray-400 hidden md:block" />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-[#252d3d] rounded-lg shadow-lg py-1 z-50">
                    <div className="px-4 py-3 border-b border-gray-700">
                        <p className="text-sm text-white font-medium">John Smith</p>
                        <p className="text-xs text-gray-400 mt-0.5">john.smith@example.com</p>
                    </div>

                    <div className="py-1">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-300 hover:bg-[#1e2746] transition-colors"
                        >
                            <User size={16} />
                            <span>Your Profile</span>
                        </button>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-300 hover:bg-[#1e2746] transition-colors"
                        >
                            <Settings size={16} />
                            <span>Settings</span>
                        </button>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-300 hover:bg-[#1e2746] transition-colors"
                        >
                            <HelpCircle size={16} />
                            <span>Help & Support</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileMenu;