// API service for report operations

import api from "./api";

const Reports_Endpoint = "/reports";

export const reportService = {
  /**
   * Get all reports.
   * @returns {Promise<Array>} List of reports
   */
  getAllReports: async () => {
    try {
      const response = await api.get(Reports_Endpoint);
      return response.data;
    } catch (e) {
      console.error(`Error fetching reports: ${e}`);
      throw e;
    }
  },

  /**
   * Get a single report by ID.
   * @param {string|number} id - The report ID
   * @returns {Promise<Object>} Report object
   */
  getReportById: async (id) => {
    try {
      const response = await api.get(`${Reports_Endpoint}/${id}`);
      return response.data;
    } catch (e) {
      console.error(`Error fetching report ${id}: ${e}`);
      throw e;
    }
  },

  /**
   * Create a new report.
   * @param {Object} reportData - The report data
   * @returns {Promise<Object>} The created report
   */
  createReport: async (reportData) => {
    try {
      const newReport = {
        ...reportData,
        status: reportData.status || "pending",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const response = await api.post(Reports_Endpoint, newReport);
      return response.data;
    } catch (e) {
      console.error(`Error creating report: ${e}`);
      throw e;
    }
  },

  /**
   * Update a report (full update).
   * @param {string|number} id - The report ID
   * @param {Object} reportData - The new report data
   * @returns {Promise<Object>} The updated report
   */
  updateReport: async (id, reportData) => {
    try {
      const updatedReport = {
        ...reportData,
        updatedAt: new Date().toISOString(),
      };
      const response = await api.put(
        `${Reports_Endpoint}/${id}`,
        updatedReport
      );
      return response.data;
    } catch (e) {
      console.error(`Error updating report ${id}: ${e}`);
      throw e;
    }
  },

  /**
   * Update a report (partial update).
   * @param {string|number} id - The report ID
   * @param {Object} partialData - The fields to update
   * @returns {Promise<Object>} The updated report
   */
  patchReport: async (id, partialData) => {
    try {
      const updatedData = {
        ...partialData,
        updatedAt: new Date().toISOString(),
      };
      const response = await api.patch(
        `${Reports_Endpoint}/${id}`,
        updatedData
      );
      return response.data;
    } catch (e) {
      console.error(`Error patching report ${id}: ${e}`);
      throw e;
    }
  },

  /**
   * Delete a report.
   * @param {string|number} id - The report ID
   * @returns {Promise<Object>} Response data
   */
  deleteReport: async (id) => {
    try {
      const response = await api.delete(`${Reports_Endpoint}/${id}`);
      return response.data;
    } catch (e) {
      console.error(`Error deleting report ${id}: ${e}`);
      throw e;
    }
  },

  /**
   * Get reports by status.
   * @param {string} status - The status to filter by
   * @returns {Promise<Array>} List of reports with the status
   */
  getReportsByStatus: async (status) => {
    try {
      const response = await api.get(Reports_Endpoint, {
        params: { status },
      });
      return response.data;
    } catch (e) {
      console.error(`Error fetching reports with status ${status}: ${e}`);
      throw e;
    }
  },

  /**
   * Get reports by category.
   * @param {string} category - The category to filter by
   * @returns {Promise<Array>} List of reports in the category
   */
  getReportsByCategory: async (category) => {
    try {
      const response = await api.get(Reports_Endpoint, {
        params: { category },
      });
      return response.data;
    } catch (e) {
      console.error(`Error fetching reports with category ${category}: ${e}`);
      throw e;
    }
  },

  /**
   * Get reports by user ID.
   * @param {string|number} userId - The user ID
   * @returns {Promise<Array>} List of reports for the user
   */
  getReportsByUserId: async (userId) => {
    try {
      const response = await api.get(Reports_Endpoint, {
        params: { userId },
      });
      return response.data;
    } catch (e) {
      console.error(`Error fetching reports for user ${userId}: ${e}`);
      throw e;
    }
  },

  /**
   * Get reports with pagination and sorting options.
   * @param {Object} options - Pagination and sorting options
   * @param {number} [options.page=1] - Page number
   * @param {number} [options.limit=10] - Items per page
   * @param {string} [options.sortBy='createdAt'] - Field to sort by
   * @param {string} [options.order='desc'] - Sort order ('asc' or 'desc')
   * @returns {Promise<Object>} Object containing data and total count
   */
  getReportsWithOptions: async (options = {}) => {
    try {
      const {
        page = 1,
        limit = 10,
        sortBy = "createdAt",
        order = "desc",
      } = options;
      const response = await api.get(Reports_Endpoint, {
        params: {
          _page: page,
          _limit: limit,
          _sort: sortBy,
          _order: order,
        },
      });
      return {
        data: response.data,
        totalCount: response.headers["x-total-count"],
      };
    } catch (e) {
      console.error("Error fetching reports with options:", e);
      throw e;
    }
  },
};

export default reportService;
