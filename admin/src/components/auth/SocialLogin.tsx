// import React from 'react';
import { motion } from 'framer-motion';

const SocialLogin = () => {
    const socialButtons = [
        { name: 'Google', icon: '🌐' },
        { name: 'GitHub', icon: '⚡' },
        { name: 'Twitter', icon: '🐦' },
    ];

    return (
        <div className="mt-4 grid grid-cols-3 gap-3">
            {socialButtons.map((button, index) => (
                <motion.button
                    key={button.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex justify-center items-center px-4 py-2 border border-gray-300 rounded-lg
            shadow-sm text-sm font-medium text-gray-700 bg-white
            hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
            transform transition-transform duration-200 hover:scale-105"
                >
                    <span className="mr-2">{button.icon}</span>
                    {button.name}
                </motion.button>
            ))}
        </div>
    );
};

export default SocialLogin;