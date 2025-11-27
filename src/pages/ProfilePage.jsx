import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ChangePasswordPopup from "../components/features/ChangePasswordPopup"; 
import UserStats from "../components/features/UserStats";
import ReportCard from "../components/features/ReportCard";
import ReportDetailModal from "../components/features/ReportDetailModal";
import { useState, useEffect } from "react";
import { Trash2 } from 'lucide-react';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [userReports, setUserReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState(null);

  // Fetch user's reports
  useEffect(() => {
    const fetchUserReports = async () => {
      if (!user) return;
      
      try {
        const response = await fetch('http://localhost:3000/reports');
        const data = await response.json();
        
        // Filter reports by current user
        const filtered = data.filter(report => report.userId === user.id);
        
        // Sort by newest first
        const sorted = filtered.sort((a, b) => 
          new Date(b.createdAt) - new Date(a.createdAt)
        );
        
        setUserReports(sorted);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user reports:", error);
        setLoading(false);
      }
    };

    fetchUserReports();
  }, [user]);

  // Helper: Format Date
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  // Delete report (only pending ones)
  const handleDeleteReport = async (reportId, status) => {
    // Only allow deletion of pending reports
    if (status.toLowerCase() !== 'pending') {
      alert('Only pending reports can be deleted.');
      return;
    }

    if (!confirm('Are you sure you want to delete this report?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/reports/${reportId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove the deleted report from state
        setUserReports(prevReports => prevReports.filter(report => report.id !== reportId));
        alert('Report deleted successfully!');
      } else {
        throw new Error('Failed to delete report');
      }
    } catch (error) {
      console.error('Error deleting report:', error);
      alert('Failed to delete report. Please try again.');
    }
  };

  if (!user) return <p>Loading...</p>;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="px-25 pb-6 pt-10 gap-6">

      

      {/* Popup Modal */}
      <ChangePasswordPopup isOpen={open} onClose={() => setOpen(false)} />

      <div className="py-10 space-y-10 flex gap-6">
        {/* Profile Picture - First Letter of Name */}
        <div className="rounded-full w-32 h-32 mt-7 bg-purple-700 text-white flex items-center justify-center text-5xl font-bold">
          {user.name?.charAt(0).toUpperCase()}
        </div>

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
        <UserStats />
      </div>

      {/* Report History */}
      <div className="mt-10">
        <h1 className="text-2xl font-bold mb-6">My Report History</h1>
        
        {loading ? (
          <div className="text-center py-10 text-gray-500">Loading your reports...</div>
        ) : userReports.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userReports.map((report) => (
              <div key={report.id} className="relative group">
                <ReportCard
                  title={report.category ? report.category.charAt(0).toUpperCase() + report.category.slice(1) + " Issue" : "Report Issue"}
                  image={report.imageUrl}
                  date={formatDate(report.createdAt)}
                  location={report.location}
                  category={report.category}
                  status={report.status}
                  onClick={() => setSelectedReport(report)}
                />
                
                {/* Delete Button - Only show for pending reports */}
                {report.status.toLowerCase() === 'pending' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteReport(report.id, report.status);
                    }}
                    className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    title="Delete Report"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-gray-400 bg-gray-50 rounded-lg">
            <p className="text-lg">No reports submitted yet.</p>
            <p className="text-sm mt-2">Click "Submit Report" to create your first report.</p>
          </div>
        )}
      </div>

      {/* Report Detail Modal */}
      {selectedReport && (
        <ReportDetailModal
          report={{
            ...selectedReport,
            title: selectedReport.category ? selectedReport.category.charAt(0).toUpperCase() + selectedReport.category.slice(1) + " Issue" : "Report Detail",
            image: selectedReport.imageUrl,
            date: formatDate(selectedReport.createdAt)
          }}
          onClose={() => setSelectedReport(null)}
        />
      )}
        
    </div>
  );
}
