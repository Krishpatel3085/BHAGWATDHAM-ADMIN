import { UserCircle } from 'lucide-react';

interface RoleDropdownProps {
  name: string;  // Added 'name' prop to identify the input
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  required?: boolean;
  placeholder?: string;
}

const RoleDropdown = ({ name, value, onChange, options, required, placeholder }: RoleDropdownProps) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <UserCircle className="text-gray-400" size={20} />
      </div>
      <select
        name={name}  // Added name attribute to link to form data
        value={value}
        onChange={onChange}
        required={required}
        className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg
          focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          placeholder-gray-400 bg-white text-gray-900
          appearance-none transition-all duration-200"
      >
        <option value="">{placeholder || 'Select an option'}</option> {/* Dynamically set placeholder */}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
};

export default RoleDropdown;
