import React from 'react';

const Card = ({ children, className = '', hoverEffect = false, as: Component = 'div' }) => {
  
  // Gaya Card umum (Rounded-xl, Shadow ringan)
  const baseClasses = `
    bg-white p-4 rounded-2xl shadow-lg 
    ${hoverEffect ? 'hover:shadow-xl transition duration-300 ease-in-out' : ''} 
    ${className}
  `;

  return (
    <Component className={baseClasses}>
      {children}
    </Component>
  );
};

export default Card;