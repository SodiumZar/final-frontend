import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ChangePasswordPopup from "../components/features/ChangePasswordPopup"; 
import UserStats from "../components/features/UserStats";
import { useState } from "react";
import Footer from "../components/layout/Footer.jsx"

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  if (!user) return <p>Loading...</p>;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
    <div className="px-25 pb-6 pt-10 gap-6">

      

      {/* Popup Modal */}
      <ChangePasswordPopup isOpen={open} onClose={() => setOpen(false)} />

      <div className="py-10 space-y-10 flex gap-6">
        <img className="rounded-full w-32 h-32 mt-7" src="Ellipse 14.png" />

        <div className="mt-7">
          <h1 className="text-3xl font-bold">{user.name}</h1>
          <div className="bg-[#6F42C1] text-white font-semibold w-40 px-4 py-2 rounded-full text-center mt-4">
            Student
          </div>
          <div className="text-purple-800 mt-3 text-sm opacity-50">
            Member Since 2025
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="font-semibold ml-auto bg-red-600 text-white px-5 rounded-full h-10 mt-7 flex items-center gap-2"
        >
          <img src="Vector.svg" alt="icon" className="w-6 h-6" />
          Log Out
        </button>
      </div>

      {/* Email */}
      <p className="text-gray-500 text-sm font-medium opacity-50">Email</p>
      <div className="bg-gray-50 mt-1 rounded-full px-4 mb-10 flex items-center h-12 shadow-sm w-100">
        <img src="Vector-3.svg" className="w-6 h-6" />
        <p className="ml-3">{user.email}</p>
      </div>

      {/* Student ID */}
      <p className="text-gray-500 text-sm font-medium opacity-50">Student ID</p>
      <div className="bg-gray-50 mt-1 rounded-full px-4 mb-10 flex items-center h-12 shadow-sm w-100">
        <img src="tabler_id1.svg" className="w-6 h-6" />
        <p className="ml-3">{user.studentId}</p>
      </div>
      
      {/* Change Password Button */}
      <button
        onClick={() => setOpen(true)}
        className="bg-[#6F42C1] text-white px-4 py-2 rounded-full"
      >
        Change Password
      </button>
      {/* Stats */}
      <div className="mt-10">
        <h1 className="text-xl font-semibold mb-4">Statistic</h1>
        <UserStats />
      </div>
        
    </div>
    <div>
        <Footer />
    </div>
    </>
  );
}
