// User Statistics Component
import React, { useState, useEffect } from 'react';

const StatisticSection = () => {
  // 1. STATE: Untuk menyimpan angka statistik
  const [stats, setStats] = useState({
    submitted: 0,
    resolved: 0
  });

  // 2. FETCH DATA: Mengambil data langsung saat komponen ini dipasang
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Pastikan json-server berjalan di port 3000
        const response = await fetch('http://localhost:3000/reports');
        const data = await response.json();

        // Hitung Statistik
        const totalSubmitted = data.length;
        // Hitung yang statusnya 'resolved' (sesuai db.json kamu)
        const totalResolved = data.filter(item => item.status === 'resolved').length;

        // Simpan ke state
        setStats({
          submitted: totalSubmitted,
          resolved: totalResolved
        });
        
      } catch (error) {
        console.error("Gagal mengambil data statistik:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="w-[1239px] mx-auto  mb-6 ">

      <div className="grid grid-cols-2 gap-4">
        
        <div className="bg-[#6F42C1] h-[150px] rounded-2xl p-5 flex justify-between items-center text-white shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col">
            <span className="text-3xl font-semibold leading-snug">
              Reports <br /> Submitted
            </span>
          </div>
          {/* Tampilkan data dari State */}
          <span className="text-4xl font-bold ml-2">{stats.submitted}</span>
        </div>

        {/* Kartu Kuning/Lime: Resolved Issues */}
        <div className="bg-[#C6C200] h-[150px] rounded-2xl p-5 flex justify-between items-center text-white shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col">
            <span className="text-3xl font-semibold leading-snug">
              Resolved <br /> Issues
            </span>
          </div>
          {/* Tampilkan data dari State */}
          <span className="text-4xl font-bold ml-2">{stats.resolved}</span>
        </div>

      </div>
    </div>
  );
};

export default StatisticSection;