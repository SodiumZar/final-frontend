import React, { useState, useEffect } from 'react';

// --- IMPORT FEATURES (Punya Kita) ---
import HeroSection from '../components/features/HeroSection';
import UserStats from '../components/features/UserStats'; // Stats yang ambil data sendiri
import ReportDetailModal from '../components/features/ReportDetailModal'; // Modal Detail

// --- IMPORT COMMON (Punya Teman) ---
// Pastikan path-nya sesuai gambar struktur folder kamu
import ReportCard from '../components/features/ReportCard';
import SearchBar from '../components/common/SearchBar';
import Button from '../components/common/Button';
import { ArrowUp,ArrowDown } from 'lucide-react';
const HomePage = () => {
  // 1. STATE MANAGEMENT
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest"); // 'newest' or 'oldest'
  const [selectedReport, setSelectedReport] = useState(null);

  // 2. FETCH DATA (Untuk List Card)
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch('http://localhost:3000/reports');
        const data = await response.json();
        setReports(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching reports:", error);
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  // 3. LOGIC PROCESSING (Search & Sort & Format)
  
  // Helper: Format Tanggal
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  // Filter & Sorting Data
  const filteredReports = reports
    .filter((item) => {
      // Logic pencarian (Category atau Description)
      const query = searchTerm.toLowerCase();
      return (
        (item.category && item.category.toLowerCase().includes(query)) ||
        (item.description && item.description.toLowerCase().includes(query))
      );
    })
    .sort((a, b) => {
      // Logic Sorting (Newest vs Oldest)
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    })
    .map((item) => ({
      // Mapping Data DB ke Format UI
      ...item,
      uiTitle: item.category ? item.category.charAt(0).toUpperCase() + item.category.slice(1) + " Issue" : "Report Issue",
      uiDate: formatDate(item.createdAt),
    }));

  // Handler untuk Toggle Sort
  const toggleSort = () => {
    setSortOrder(prev => prev === 'newest' ? 'oldest' : 'newest');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      {/* 1. HERO SECTION */}
      <HeroSection />

  

      <div className="max-w-6xl mx-auto pt-16 px-4 mt-8">
        
        {/* 3. CONTROL BAR (Search & Sort) */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          
          {/* Search Bar (Kiri) */}
          <div className="w-full md:w-1/3">
            {/* Menggunakan SearchBar temanmu. Asumsi props-nya value & onChange */}
            <SearchBar 
              placeholder="Search report..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Judul & Sort (Kanan) */}
          <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
            <h2 className="text-2xl font-bold text-purple-700">Recent Report</h2>
            
            {/* Tombol Sort (Menggunakan Button temanmu) */}
           <Button 
                onClick={toggleSort}
                className="flex items-center gap-2 bg-white !text-black border border-gray-200 hover:bg-gray-100 !rounded-4xl"
                >
                {/* Logika Ganti Icon & Teks */}
                {sortOrder === 'newest' ? (
                    <div className="flex items-center gap-2">
                    <ArrowDown size={18} /> {/* Icon Panah Bawah */}
                    <span>Newest</span>
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                    <ArrowUp size={18} />   {/* Icon Panah Atas */}
                    <span>Oldest</span>
                    </div>
                )}
            </Button>
          </div>
        </div>

        {/* 4. CARD GRID */}
        {loading ? (
          <div className="text-center py-10 text-gray-500">Loading reports...</div>
        ) : (
          <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
            {filteredReports.length > 0 ? (
              filteredReports.map((report) => (
                
                // KITA GUNAKAN REPORT CARD YANG BARU DIBUAT
                <ReportCard 
                  key={report.id}
                  // Mengirim data hasil mapping ke props ReportCard
                  title={report.uiTitle}
                  image={report.imageUrl}   // Ingat, kita sudah map 'imageUrl' jadi 'image' di logika atas
                  date={report.uiDate}
                  location={report.location}
                  category={report.category}
                  status={report.status}
                  
                  // Agar Modal terbuka saat kartu diklik
                  onClick={() => setSelectedReport(report)}
                />

              ))
            ) : (
              <div className="col-span-full text-center py-10 text-gray-400">
                No reports found matching your search.
              </div>
            )}
          </div>
        )}
      </div>
      {/* 5. MODAL DETAIL */}
      {/* Muncul hanya jika ada report yang dipilih */}
      {selectedReport && (
        <ReportDetailModal 
          report={{
            ...selectedReport,
            // Mapping ulang agar sesuai props Modal kita yang sebelumnya
            title: selectedReport.uiTitle,
            image: selectedReport.imageUrl,
            date: selectedReport.uiDate
          }} 
          onClose={() => setSelectedReport(null)} 
        />
      )}

    </div>
  );
};

export default HomePage;