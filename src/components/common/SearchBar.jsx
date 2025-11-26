import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ value, onChange, placeholder = 'Search', className = '' }) => {
  return (
    <div className={`relative w-full ${className}`}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-0  focus:border-primary transition duration-150 "
      />
      {/* Ikon Pencarian */}
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400">
        {/* Placeholder Ikon Magnifying Glass */}
        <Search className="h-5 w-5"></Search>
      </div>
    </div>
  );
};

export default SearchBar;