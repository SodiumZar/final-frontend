import { useState } from "react";
import ImageUploader from "./ImageUploader";
import CategorySelector from "./CategorySelector";
import { validateReport } from "../../utils/validation";
import reportService from "../../services/reportService";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";


export default function ReportForm() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    image: null,
    category: "",
    location: "",
    description: "",
    confirm: false,
  });

  const [error, setError] = useState("");

  const handleChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!user) {
      setError("You must be logged in to submit a report.");
      return;
    }

    const message = validateReport(form);
    if (message) {
      setError(message);
      return;
    }

    try {
      const reportData = {
        userId: user.id,               
        userName: user.name,           
        category: form.category,
        location: form.location,
        description: form.description,
        imageUrl: form.image ? URL.createObjectURL(form.image) : "",
        status: "pending",
      };

      await reportService.createReport(reportData);
      alert("Report submitted successfully!");

      setForm({
        image: null,
        category: "",
        location: "",
        description: "",
        confirm: false,
      });
      setError("");

    } catch (err) {
      console.error("Submit error:", err);
      setError("Failed to submit report. Please try again.");
    }
  };

  return (
    
    <div className="space-y-6">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-purple-600 hover:text-purple-800 mb-4"
      >
        <span className="text-lg">←</span> Back
      </button>


      {error && (
        <div className="p-3 bg-red-200 text-red-700 rounded">{error}</div>
      )}

      <ImageUploader
        image={form.image}
        onChange={(file) => handleChange("image", file)}
      />

      <div className="mt-10 mb-5 text-2xl font-semibold text-center">
        What is the category of the report?
      </div>

      <CategorySelector
        selected={form.category}
        onSelect={(value) => handleChange("category", value)}
      />

      <div className="mt-10 mb-5 text-2xl font-semibold text-center">
        What are the details of the report?
      </div>

      <input
        type="text"
        placeholder="Enter location"
        className="w-full p-3 rounded bg-gray-50"
        value={form.location}
        onChange={(e) => handleChange("location", e.target.value)}
      />

      <textarea
        className="w-full p-3 rounded min-h-[150px] bg-gray-50"
        placeholder="Description"
        value={form.description}
        onChange={(e) => handleChange("description", e.target.value)}
      />

      <label className="flex gap-2">
        <input
          className="mb-2 w-7 h-7"
          type="checkbox"
          checked={form.confirm}
          onChange={(e) => handleChange("confirm", e.target.checked)}
        />
        <span className="text-sm text-gray-600">
          I confirm that all submitted information is accurate.
        </span>
      </label>

      <button
        onClick={handleSubmit}
        className="bg-purple-600 text-white px-6 py-3 rounded-lg w-full mt-5 font-semibold"
      >
        Submit
      </button>
    </div>
  );
}
