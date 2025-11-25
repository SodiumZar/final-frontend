// API service for report operations
// API service for report operations
import axios from "axios";


const API_URL = "https://api.example.com/reports";
const reportService = {
  createReport: async (reportData) => {
    const formData = new FormData();
    formData.append("image", reportData.image);
    formData.append("category", reportData.category);
    formData.append("priority", reportData.priority);
    formData.append("location", reportData.location);
    formData.append("description", reportData.description);
    formData.append("confirm", reportData.confirm);

    const response = await axios.post(API_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
};

export default reportService;