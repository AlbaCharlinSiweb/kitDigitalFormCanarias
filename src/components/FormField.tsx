import React from 'react';

interface FormFieldProps {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
  error?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type,
  value,
  onChange,
  required = true,
  placeholder = '',
  error,
}) => {
  return (
    <div className="relative">
      <label 
        htmlFor={name} 
        className="block text-sm font-medium text-blue-900 mb-2"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className={`
          w-full px-4 py-3 rounded-xl shadow-sm border-2 border-blue-400
          ${error ? 'border-red-500' : 'border-blue-200'}
          focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          transition-all duration-200
          placeholder-blue-300
        `}
      />
      {error && (
        <p className="mt-2 text-sm text-red-500 absolute -bottom-6">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormField;