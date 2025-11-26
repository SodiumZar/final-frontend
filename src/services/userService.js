// API service for user operations

import api from "./api";

const Users_Endpoint = "/users";

const userService = {
  /**
   * Get all users from the database.
   * @returns {Promise<Array>} List of users
   */
  getAllUsers: async () => {
    try {
      const response = await api.get(`${Users_Endpoint}`);
      return response.data;
    } catch (e) {
      console.error(`Error Fetching users : ${e}`);
      throw e;
    }
  },

  /**
   * Get a single user by their ID.
   * @param {string|number} id - The user's ID
   * @returns {Promise<Object>} User object
   */
  getUserById: async (id) => {
    try {
      const response = await api.get(`${Users_Endpoint}/${id}`);
      return response.data;
    } catch (e) {
      console.error(`Error Fetching user ${id}: ${e}`);
      throw e;
    }
  },

  /**
   * Create a new user.
   * @param {Object} userData - The user data to create
   * @returns {Promise<Object>} The created user object
   */
  createUser: async (userData) => {
    try {
      const newUser = {
        ...userData,
        createdAt: new Date().toISOString(),
      };
      const response = await api.post(`${Users_Endpoint}`, newUser);
      return response.data;
    } catch (e) {
      console.error(`Error Creating user: ${e}`);
      throw e;
    }
  },

  /**
   * Update an existing user (full update).
   * @param {string|number} id - The user's ID
   * @param {Object} userData - The new user data
   * @returns {Promise<Object>} The updated user object
   */
  updateUser: async (id, userData) => {
    try {
      const response = await api.put(`${Users_Endpoint}/${id}`, userData);
      return response.data;
    } catch (e) {
      console.error(`Error Updating user ${id}: ${e}`);
      throw e;
    }
  },

  /**
   * Update an existing user (partial update).
   * @param {string|number} id - The user's ID
   * @param {Object} partialData - The fields to update
   * @returns {Promise<Object>} The updated user object
   */
  patchUser: async (id, partialData) => {
    try {
      const response = await api.patch(`${Users_Endpoint}/${id}`, partialData);
      return response.data;
    } catch (e) {
      console.error(`Error Patching user ${id}: ${e}`);
      throw e;
    }
  },

  /**
   * Delete a user.
   * @param {string|number} id - The user's ID
   * @returns {Promise<Object>} Response data
   */
  deleteUser: async (id) => {
    try {
      const response = await api.delete(`${Users_Endpoint}/${id}`);
      return response.data;
    } catch (e) {
      console.error(`Error Deleting user ${id}: ${e}`);
      throw e;
    }
  },

  /**
   * Get users filtered by role.
   * @param {string} role - The role to filter by (e.g., 'admin', 'user')
   * @returns {Promise<Array>} List of users with the specified role
   */
  getUsersByRole: async (role) => {
    try {
      const response = await api.get(Users_Endpoint, { params: { role } });
      return response.data;
    } catch (e) {
      console.error(`Error Fetching users with role ${role}: ${e}`);
      throw e;
    }
  },
};

export default userService;
