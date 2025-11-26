import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const ChangePasswordPopup = ({ isOpen, onClose }) => {
  const { updatePassword } = useAuth();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    try {
      await updatePassword(currentPassword, newPassword);
      setSuccess("Password updated successfully!");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setTimeout(() => onClose(), 1200);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-xl p-6 shadow-lg w-full max-w-md scale-100 transition">
        
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4">Change Password</h2>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-600 text-sm">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          <div>
            <label className="text-sm font-medium">Current Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">New Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Confirm New Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-purple-600 text-white px-5 py-2 rounded-full w-full"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordPopup;
