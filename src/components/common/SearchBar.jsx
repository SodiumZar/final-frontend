import React from 'react';
// Asumsikan Anda menggunakan Ikon (Misal: Heroicons)
// import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'; 

const SearchBar = ({ value, onChange, placeholder = 'Search', className = '' }) => {
  return (
    <div className={`relative w-full ${className}`}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition duration-150 text-dark-text"
      />
      {/* Ikon Pencarian */}
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400">
        {/* Placeholder Ikon Magnifying Glass */}
        <span className="h-5 w-5">🔍</span>
      </div>
    </div>
  );
};

export default SearchBar;