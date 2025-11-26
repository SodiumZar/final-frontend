// Report Card Component
import React from 'react';
// Import komponen Card temanmu
import Card from '../common/Card'; 
// Import Icons
import { Clock, MapPin, CircleCheck, AlertCircle,Loader} from 'lucide-react';

const ReportCard = ({ 
  title, 
  image, 
  date, 
  location, 
  category, 
  status, 
  onClick 
}) => {

  // Helper untuk menentukan warna badge status
  const getStatusColor = (statusText) => {
    const s = statusText?.toLowerCase();
    if (s === 'fixed' || s === 'resolved') return 'bg-[#84CC16] text-white'; // Hijau
    if (s === 'in-progress') return 'bg-blue-500 text-white'; // Biru
    return 'bg-[#FF0000] text-white'; // Default/Pending (Kuning)
  };

  return (
    // Menggunakan Card temanmu sebagai container utama
    <Card 
      hoverEffect={true} 
      className="cursor-pointer flex flex-col  h-full relative "
      // Kita tambahkan onClick di div pembungkus agar bisa diklik untuk modal
    >
      <div onClick={onClick}>
        
        {/* 1. BAGIAN GAMBAR */}
        {/* Temanmu pakai p-4, jadi gambar kita kasih rounded biar rapi di dalam padding */}
        <div className="h-48 w-full mb-4 overflow-hidden rounded-xl bg-gray-200">
          <img 
            src={image || "https://via.placeholder.com/400"} 
            alt={title} 
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        {/* 2. BAGIAN KONTEN (Grid Layout) */}
        <div className="flex flex-col gap-2">
          
          {/* Row Atas: Judul (Kiri) & Waktu/Lokasi (Kanan) */}
          <div className="flex justify-between items-start">
            
            {/* KIRI: Judul Besar */}
            <h3 className=" font-bold text-2xl text-black leading-tight w-[55%] break-words">
              {title}
            </h3>

            {/* KANAN: Stack Badge (Date & Location) */}
            <div className="flex flex-col items-end gap-2 w-[45%]">
              
              {/* Badge Waktu (Kuning Lime) */}
              <div className="bg-[#C6C200] text-white px-2 py-1 rounded-full text-[10px] font-semibold flex items-center gap-1 shadow-sm whitespace-nowrap">
                <Clock size={12} strokeWidth={3} />
                <span>{date}</span>
              </div>

              {/* Badge Lokasi (Ungu) */}
              <div className="bg-[#6F42C1] text-white px-2 py-1 rounded-full text-[10px] font-semibold flex items-center gap-1 shadow-sm max-w-full truncate">
                <MapPin size={12} strokeWidth={3} />
                <span className="truncate max-w-[80px]">{location}</span>
              </div>

            </div>
          </div>

          {/* Row Bawah: Kategori & Status */}
          <div className="flex justify-between items-end mt-3">
            
            {/* Kiri: Kategori (Ungu Tua) */}
            <span className="bg-[#6F42C1] text-white px-4 py-1 rounded-full text-xs font-semibold shadow-sm">
              {category}
            </span>

            {/* Kanan: Status (Hijau jika Fixed) */}
            {/* Kanan: Status */}
            <div className={`px-4 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm ${getStatusColor(status)}`}>
              
              {/* LOGIKA ICON: */}
              {(() => {
                const s = status?.toLowerCase();
                
                // 1. Jika Fixed / Resolved -> Centang
                if (s === 'resolved' || s === 'fixed') {
                  return <CircleCheck size={14} strokeWidth={3} />;
                }
                
                // 2. Jika In-Progress -> Loading Muter
                if (s === 'in-progress') {
                  return <Loader size={14} strokeWidth={3} className="animate-spin" />;
                }
                
                // 3. Sisanya (Pending) -> Tanda Seru
                return <AlertCircle size={14} strokeWidth={3} />;
              })()}

              <span className="capitalize">{status}</span>
            </div>

          </div>

        </div>
      </div>
    </Card>
  );
};

export default ReportCard;