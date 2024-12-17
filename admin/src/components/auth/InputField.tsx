import React from 'react';
import { motion } from 'framer-motion';

interface InputFieldProps {
    icon: React.ReactNode;
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    endIcon?: React.ReactNode;
    name?: string;
}

const InputField = ({
    icon,
    type,
    placeholder,
    value,
    onChange,
    required,
    endIcon,
    name,
}: InputFieldProps) => {
    return (
        <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="relative"
        >
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {icon}
            </div>
            <input
                type={type}
                name={name}
                className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg
          focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          placeholder-gray-400 bg-white text-gray-900
          transition-all duration-200"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
            />
            {endIcon && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    {endIcon}
                </div>
            )}
        </motion.div>
    );
};

export default InputField;