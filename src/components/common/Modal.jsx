import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('modal-root');

// Pastikan elemen <div id="modal-root"> ada di index.html Anda
if (!modalRoot) {
    console.error("Elemen 'modal-root' tidak ditemukan. Modal mungkin tidak berfungsi.");
}

const Modal = ({ isOpen, onClose, children, title, size = 'lg' }) => {
  if (!isOpen || !modalRoot) return null;

  // Penyesuaian ukuran
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-2xl', // Ukuran default untuk detail laporan
    xl: 'max-w-4xl',
  };

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-gray-900 bg-opacity-70 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Konten Modal */}
      <div className={`bg-white rounded-xl shadow-2xl transform transition-all w-full z-50 ${sizeClasses[size]}`}>
        
        {/* Header Modal */}
        {title && (
            <div className="flex justify-between items-center p-5 border-b border-gray-200">
                <h3 className="text-xl font-bold text-dark-text">{title}</h3>
                <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600 transition"
                    aria-label="Tutup"
                >
                    <span className="text-3xl leading-none">&times;</span> 
                </button>
            </div>
        )}

        {/* Body Modal */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, modalRoot);
};

export default Modal;