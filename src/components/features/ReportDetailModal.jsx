import React from 'react';
import { CircleCheck, AlertCircle, Clock, Loader } from 'lucide-react';
const ReportDetailModal = ({ report, onClose }) => {
  if (!report) return null;

  return (
    <>
      {/* 1. STYLE ANIMASI KHUSUS (Agar smooth tanpa install library tambahan) */}
      <style>
        {`
          @keyframes openOverlay {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes openModal {
            from { 
              opacity: 0; 
              transform: scale(0.95) translateY(10px); 
            }
            to { 
              opacity: 1; 
              transform: scale(1) translateY(0); 
            }
          }
          .animate-overlay {
            animation: openOverlay 0.3s ease-out forwards;
          }
          .animate-modal {
            animation: openModal 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
        `}
      </style>

      {/* 2. OVERLAY BACKGROUND (Hitam Transparan) */}
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center  p-4 backdrop-blur-sm animate-overlay"
        onClick={onClose} // Klik di luar area modal untuk menutup
      >
        
        {/* 3. CONTAINER MODAL PUTIH */}
        {/* stopPropagation agar saat klik modal, dia tidak ikut tertutup */}
        <div 
          onClick={(e) => e.stopPropagation()} 
          className="bg-white rounded-[2rem] shadow-2xl w-full  max-w-lg overflow-hidden relative animate-modal p-7"
        >
          
          {/* Header: Tombol Back/Close */}
          <div className="absolute top-4 left-4 z-10">
            <button 
              onClick={onClose}
              className="bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all hover:scale-110 active:scale-95 "
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 text-black">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
          </div>

          {/* --- KONTEN SCROLLABLE --- */}
          <div className="max-h-[90vh] overflow-y-auto custom-scrollbar">
            
            {/* Gambar Laporan */}
            <div className="p-6 pb-0">
              <img 
                src={report.image || report.imageUrl} 
                alt={report.title} 
                className="w-full h-64 object-cover rounded-3xl shadow-sm"
              />
            </div>

            <div className="p-8">
              {/* Header Title & Date */}
              <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
                <h2 className="text-3xl font-extrabold text-black leading-tight flex-1">
                  {report.title || (report.category ? report.category + " Issue" : "Report Detail")}
                </h2>

                <div className="flex flex-col gap-2 items-end">
                  {/* Waktu */}
                  <span className="bg-[#C6C200] text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg>
                    {report.date || (report.createdAt ? new Date(report.createdAt).toLocaleDateString() : "-")}
                  </span>
                  
                  {/* Lokasi */}
                  <span className="bg-[#6F42C1] text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm text-right">
                    <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                    <span className="truncate max-w-[150px]">{report.location || "Unknown Location"}</span>
                  </span>
                </div>
              </div>

              {/* Kategori */}
              <div className="mb-6">
                <span className="bg-[#6F42C1] text-white px-6 py-1.5 rounded-full text-sm font-semibold shadow-sm capitalize">
                  {report.category || "General"}
                </span>
              </div>

              {/* Deskripsi */}
              <p className="text-gray-700 leading-relaxed mb-8 text-sm md:text-base">
                {report.description || "Tidak ada deskripsi tersedia."}
              </p>

              {/* Status Button */}
             {/* Status Button Area */}
           {/* Status Button Area */}
            <div className="flex justify-end mt-8">
              {(() => {
                const status = report.status?.toLowerCase();

                // 1. Logic Warna Background
                const getStatusColor = () => {
                  if (status === 'resolved' || status === 'fixed') return 'bg-[#74D800]'; // Hijau
                  if (status === 'in-progress') return 'bg-blue-500'; // Biru
                  return 'bg-[#FF0000]'; // Kuning (Default/Pending)
                };

                // 2. Logic Icon Menggunakan Lucide React
                const renderIcon = () => {
                  // --- ICON CENTANG (Fixed) ---
                  if (status === 'resolved' || status === 'fixed') {
                    return <CircleCheck size={20} strokeWidth={2.5} />;
                  }
                  
                  // --- ICON JAM (Pending) ---
                  if (status === 'pending') {
                    return <AlertCircle size={20} strokeWidth={2.5} />;
                
                  }

                  // --- ICON LOADING (In-Progress) ---
                  if (status === 'in-progress') {
                    // Kita tambah class 'animate-spin' biar muter
                    return <Loader size={20} strokeWidth={2.5} className="animate-spin" />;
                  }
                  
                  return null;
                };

                return (
                  <div className={`
                    ${getStatusColor()} 
                    text-white px-6 py-2 rounded-full font-bold flex items-center gap-2 shadow-md capitalize transition-colors
                  `}>
                    {renderIcon()}
                    <span>{report.status}</span>
                  </div>
                );
              })()}
            </div>

            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default ReportDetailModal;