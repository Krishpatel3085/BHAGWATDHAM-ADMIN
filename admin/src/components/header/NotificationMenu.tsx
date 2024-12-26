import React, { useState, useRef, useEffect } from 'react';
import { Bell, MessageSquare, Calendar, Users } from 'lucide-react';

interface Notification {
    id: string;
    icon: React.ReactNode;
    title: string;
    time: string;
    isRead: boolean;
}

const notifications: Notification[] = [
    {
        id: '1',
        icon: <MessageSquare size={16} className="text-blue-400" />,
        title: 'New message from Sarah',
        time: '5 min ago',
        isRead: false,
    },
    {
        id: '2',
        icon: <Calendar size={16} className="text-green-400" />,
        title: 'Upcoming event: Parent Meeting',
        time: '1 hour ago',
        isRead: false,
    },
    {
        id: '3',
        icon: <Users size={16} className="text-violet-400" />,
        title: 'New student registration',
        time: '2 hours ago',
        isRead: true,
    },
];

const NotificationMenu = () => {
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

    const unreadCount = notifications.filter(n => !n.isRead).length;

    return (
        <div className="relative" ref={dropdownRef} >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 hover:bg-[#252d3d] rounded-full relative transition-colors"
            >
                <Bell size={20} className="text-gray-400" />
                {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                )}
            </button>

            {
                isOpen && (
                    <div className="absolute right-0 mt-2 w-80 bg-[#252d3d] rounded-lg shadow-lg overflow-hidden z-50" >
                        <div className="p-4 border-b border-gray-700" >
                            <div className="flex items-center justify-between" >
                                <h3 className="font-medium text-white" > Notifications </h3>
                                < span className="text-xs text-gray-400" > {unreadCount} new</span>
                            </div>
                        </div>

                        < div className="max-h-[300px] overflow-y-auto" >
                            {
                                notifications.map(notification => (
                                    <div
                                        key={notification.id}
                                        className={`p-4 hover:bg-[#1e2746] transition-colors ${!notification.isRead ? 'bg-[#1e2746]/50' : ''
                                            }`}
                                    >
                                        <div className="flex items-start gap-3" >
                                            <div className="p-2 bg-[#1e2746] rounded-lg" >
                                                {notification.icon}
                                            </div>
                                            < div >
                                                <p className="text-sm text-gray-300" > {notification.title} </p>
                                                < span className="text-xs text-gray-500" > {notification.time} </span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                        < div className="p-4 border-t border-gray-700" >
                            <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors" >
                                View all notifications
                            </button>
                        </div>
                    </div>
                )}
        </div>
    );
};

export default NotificationMenu;