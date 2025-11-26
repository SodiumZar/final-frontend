import React, { useState } from 'react';
import logoImage from '../../assets/logo.png'; 
const HeroSection = () => {
  // 1. DATA SLIDES (Gambar & Judul)
  const slides = [
    {
      title: "Facility",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1986&auto=format&fit=crop", // Gambar Gedung
    },
    {
      title: "Security",
      image: "https://images.unsplash.com/photo-1555436169-20e93ee0a887?q=80&w=2000&auto=format&fit=crop", // Gambar CCTV/Security
    },
    {
      title: "Environment",
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=2000&auto=format&fit=crop", // Gambar Taman/Sampah
    },
    {
      title: "Academic",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2000&auto=format&fit=crop", // Gambar Kelas/Belajar
    },
  ];

  // 2. STATE (Untuk melacak slide mana yang aktif)
  const [currentIndex, setCurrentIndex] = useState(0);

  // 3. LOGIC TOMBOL NEXT
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  // 4. LOGIC TOMBOL PREV
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="bg-purple-700 py-12 px-4 md:px-8 lg:px-16 text-white rounded-b-3xl mb-8">
      
      {/* --- BAGIAN ATAS: Teks dan Logo --- */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8 mb-12 pt-4">
        <div className="md:w-2/3 pt-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            Student form reports <br /> for Universitas Klabat
          </h1>
          <p className="text-purple-200 text-sm md:text-base leading-relaxed max-w-2xl">
            UK Guard is here to support you every step of the way. Our platform allows you to report issues quickly, receive timely information, and stay aware of what’s happening around you. By working together and staying engaged, we can build a stronger, safer, and more watchful community for everyone.          </p>
        </div>
        <div className="md:w-1/3 flex justify-start md:justify-end pb-12">
         <img src={logoImage} alt="University Logo"  className="w-full h-auto object-contain ">
             {/* <img src={logoImage} alt="University Logo" className="w-full h-auto object-contain" /> */}
             
          </img>
        </div>
      </div>

      {/* --- BAGIAN BAWAH: Banner Slider --- */}
      <div className="max-w-6xl mx-auto relative h-64 md:h-[400px] rounded-3xl overflow-hidden shadow-2xl group select-none">
        
        {/* GAMBAR BACKGROUND (Dinamis berdasarkan currentIndex) */}
        <img 
          // Key agar React me-render ulang animasi saat gambar berubah
          key={currentIndex} 
          src={slides[currentIndex].image} 
          alt={slides[currentIndex].title} 
          className="w-full h-full object-cover brightness-75 animate-fade-in transition-transform duration-700 group-hover:scale-105"
        />

        {/* TEKS OVERLAY (Dinamis berdasarkan currentIndex) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="text-white text-5xl md:text-7xl font-bold tracking-wider drop-shadow-lg animate-fade-in-up">
            {slides[currentIndex].title}
          </h2>
        </div>

        {/* TOMBOL PREV (Kiri) */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 md:p-4 rounded-full backdrop-blur-sm transition hover:scale-110 active:scale-95 cursor-pointer z-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6 md:w-8 md:h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        {/* TOMBOL NEXT (Kanan) */}
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 md:p-4 rounded-full backdrop-blur-sm transition hover:scale-110 active:scale-95 cursor-pointer z-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6 md:w-8 md:h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>

        {/* Indikator Titik (Opsional - Biar user tahu ada 4 slide) */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <div 
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full cursor-pointer transition-all ${
                index === currentIndex ? "bg-white w-6" : "bg-white/50"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default HeroSection;