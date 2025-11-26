import React from 'react'

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  disabled = false, 
  type = 'button',
  LeftIcon = null, // Prop untuk ikon di kiri
}) => {
  
  // 1. Tentukan Ukuran (Size)
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-3 text-base', // Padding standar untuk tombol besar
    icon: 'p-2', // Untuk tombol yang hanya ikon
  };

  // 2. Tentukan Varian (Warna dan Gaya Spesifik dari Desain Anda)
  const variantClasses = {
    // Varian Ungu Utama (Digunakan di "Submit reports", "Submit", Nav bar)
    primary: 'bg-[#6F42C1] text-white hover:bg-[#5a32a3] shadow-md transition duration-200',
    
    // Varian Status "Fixed" (Warna Hijau Khusus)
    // Catatan: Menggunakan rounded-full untuk tombol status
    statusFixed: 'bg-[#74D800] text-black hover:bg-[#66BA04] font-bold text-sm px-4 py-1.5', 
    
    // Varian Status "Pending" (Warna Merah/Oranye)
    statusPending: 'bg-red-500 text-white hover:bg-red-600 font-bold text-sm px-4 py-1.5',
    
    // Varian Sekunder/Outline (Misalnya, tombol "Sort" atau tombol Logout)
    secondary: 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 transition duration-200',
    
    // Varian yang mungkin digunakan di Profile Page
    link: 'bg-transparent text-primary hover:underline transition duration-150',
  };

  // Tentukan radius berdasarkan varian
  const getRadius = () => {
    if (variant === 'statusFixed' || variant === 'statusPending') {
      return 'rounded-full'; // Menggunakan rounded-full (50px)
    }
    return 'rounded-xl'; // Menggunakan rounded-xl untuk tombol kotak/utama
  };


  // 3. Gabungkan Semua Kelas
  const baseClasses = `
    font-semibold focus:outline-none  
    flex items-center justify-center whitespace-nowrap gap-2 // gap-2 untuk jarak ikon
    ${getRadius()} // Menerapkan radius
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'active:scale-[0.98]'} 
    ${sizeClasses[size]} 
    ${variantClasses[variant]} 
    ${className} // Untuk penyesuaian kustom dari komponen induk
  `;

  const IconComponent = LeftIcon; 

  return (
    <button
      type={type}
      className={baseClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {/* Render ikon di kiri jika ada */}
      {IconComponent && <IconComponent className="h-4 w-4" />} 
      
      {children}
    </button>
  );
};

export default Button;
