// Form validation utilities
export const validateReport = (form) => {
  if (!form.image) return "Photo is required.";
  if (!form.category) return "Please pick a category.";
  if (!form.location.trim()) return "Location cannot be empty.";
  if (!form.description.trim()) return "Description cannot be empty.";
  if (!form.confirm) return "You must confirm the information.";
  return "";
};