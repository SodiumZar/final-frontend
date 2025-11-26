// Report categories and other constants
// Sinkron dengan data di db.json bagian "reports" (UNKLAB Campus context)

/**
 * List of available report categories.
 * Used for dropdowns, filters, and displaying category information.
 */
export const Report_Categories = [
  {
    id: "facility",
    label: "Fasilitas",
    description: "AC, toilet, WiFi, ruang kelas, dll",
    icon: "Vector2.svg",
    color: "blue",
  },
  {
    id: "security",
    label: "Keamanan",
    description: "Lampu parkir, CCTV, keamanan kampus",
    icon: "Security.svg",
    color: "red",
  },
  {
    id: "academic",
    label: "Akademik",
    description: "Lab komputer, sound system, proyektor",
    icon: "Academic.svg",
    color: "purple",
  },
  {
    id: "environment",
    label: "Lingkungan",
    description: "Sampah, kebersihan, drainage",
    icon: "Environment.svg",
    color: "green",
  },
];

/**
 * List of possible report statuses.
 * Used for tracking the progress of a report.
 */
export const Report_Statuses = [
  {
    id: "pending",
    label: "Menunggu",
    color: "gray",
  },
  {
    id: "in-progress",
    label: "Sedang Diproses",
    color: "blue",
  },
  {
    id: "resolved",
    label: "Selesai",
    color: "green",
  },
  {
    id: "rejected",
    label: "Ditolak",
    color: "red",
  },
];

// Helper functions

/**
 * Find a category object by its ID.
 * @param {string} id - The category ID (e.g., 'facility')
 * @returns {Object|undefined} The category object or undefined if not found
 */
export function getCategoryById(id) {
  return Report_Categories.find((cat) => cat.id === id);
};

/**
 * Find a status object by its ID.
 * @param {string} id - The status ID (e.g., 'pending')
 * @returns {Object|undefined} The status object or undefined if not found
 */
export const getStatusById = (id) => {
  return Report_Statuses.find((status) => status.id === id);
};

/**
 * Get the display label for a category.
 * @param {string} id - The category ID
 * @returns {string} The category label or 'Unknown'
 */
export const getCategoryLabel = (id) => {
  const category = getCategoryById(id);
  return category ? category.label : "Unknown";
};

/**
 * Get the display label for a status.
 * @param {string} id - The status ID
 * @returns {string} The status label or 'Unknown'
 */
export const getStatusLabel = (id) => {
  const status = getStatusById(id);
  return status ? status.label : "Unknown";
};
