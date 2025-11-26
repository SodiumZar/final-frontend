import React from 'react';

const Input = ({ label, id, name, type = 'text', value, onChange, placeholder, error, className = '', ...props }) => {
  
  const baseClasses = `
    w-full p-3 md:p-4 border rounded-xl focus:outline-none 
    transition duration-150 text-dark-text 
    ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary'} 
    ${className}
  `;

  return (
    <div className="mb-6">
      {label && (
        <label htmlFor={id || name} className="block text-sm font-medium text-dark-text mb-2">
          {label}
        </label>
      )}
      {type === 'textarea' ? (
        <textarea
            id={id || name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`${baseClasses} min-h-[120px] resize-none`}
            {...props}
        />
      ) : (
        <input
            id={id || name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={baseClasses}
            {...props}
        />
      )}
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default Input;