import React from 'react';
import { motion } from 'framer-motion';

interface AuthCardProps {
    children: React.ReactNode;
    title: string;
    subtitle: string;
    formType: 'login' | 'register';
}

const AuthCard = ({ children, title, subtitle}: AuthCardProps) => {
    return (
        <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
            <div className="p-8">
                <div className="text-center mb-8">
                    <motion.h1
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl font-bold text-gray-900 mb-2"
                    >
                        {title}
                    </motion.h1>
                    <motion.p
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-600"
                    >
                        {subtitle}
                    </motion.p>
                </div>
                {children}
            </div>
        </motion.div>
    );
};

export default AuthCard;