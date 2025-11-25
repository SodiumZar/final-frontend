// Report Form Component
import { useState } from "react";
import ImageUploader from "./ImageUploader";
import CategorySelector from "./CategorySelector";
import { validateReport } from "../../utils/validation";
import reportService from "../../services/reportService";

export default function ReportForm() {
  const [form, setForm] = useState({
    image: null,
    category: "",
    priority: "",
    location: "",
    description: "",
    confirm: false,
  });

  const [error, setError] = useState("");

  const handleChange = (name, value) => {
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const message = validateReport(form);
    if (message) {
      setError(message);
      return;
    }

    await reportService.createReport(form);
    alert("Report submitted successfully!");
  };

  return (
    <div className="space-y-6">

      {error && (
        <div className="p-3 bg-red-200 text-red-700 rounded">{error}</div>
      )}

      <ImageUploader
        image={form.image}
        onChange={file => handleChange("image", file)}
      />
    
      <div className="mt-35 mb-5 text-2xl font-semibold text-center">What is the category of the reports ?</div>

      <CategorySelector
        selected={form.category}
        onSelect={value => handleChange("category", value)}
      />

      <div className="mt-35 mb-5 text-2xl font-semibold text-center">What is the details of the reports ?</div>


      <input
        type="text"
        placeholder="Enter location"
        className="w-full  p-3 rounded bg-gray-50"
        onChange={e => handleChange("location", e.target.value)}
      />

      <textarea
        className="w-full  p-3 rounded min-h-[150px] bg-gray-50"
        placeholder="Description"
        onChange={e => handleChange("description", e.target.value)}
      />

      <label className="flex gap-2">
        <input
          className="mb-2 w-7 h-7"
          type="checkbox"
          checked={form.confirm}
          onChange={e => handleChange("confirm", e.target.checked)}
        />
        <span className="text-sm text-gray-600">
          I confirm that all the information I have submitted is true, accurate, and based on my actual experience. I understand that false or misleading reports may affect the response process.
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