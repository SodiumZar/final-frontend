// Authentication Context
import { createContext, useContext, useState, useEffect } from 'react';
import userService from "../services/userService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem('ukguard_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  /**
   * Login function - validates email and password
   * @param {string} email - User's email
   * @param {string} password - User's password
   * @returns {Promise<Object>} User object if successful
   */
  const login = async (email, password) => {
    try {
      // Get all users and find matching email and password
      const users = await userService.getAllUsers();
      const foundUser = users.find(
        (u) => u.email === email && u.password === password
      );

      if (!foundUser) {
        throw new Error('Invalid email or password');
      }

      // Store user in state and localStorage (without password)
      const userWithoutPassword = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        studentId: foundUser.studentId,
        department: foundUser.department,
      };

      setUser(userWithoutPassword);
      localStorage.setItem('ukguard_user', JSON.stringify(userWithoutPassword));
      
      return userWithoutPassword;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  /**
   * Logout function - clears user session
   */
  const logout = () => {
    setUser(null);
    localStorage.removeItem('ukguard_user');
  };

  /**
   * Update password function
   * @param {string} currentPassword - Current password
   * @param {string} newPassword - New password
   */
  const updatePassword = async (currentPassword, newPassword) => {
    try {
      if (!user) throw new Error('No user logged in');

      // Get current user data
      const currentUser = await userService.getUserById(user.id);
      
      // Verify current password
      if (currentUser.password !== currentPassword) {
        throw new Error('Current password is incorrect');
      }

      // Update password
      await userService.patchUser(user.id, { password: newPassword });
      
      return true;
    } catch (error) {
      console.error('Update password error:', error);
      throw error;
    }
  };

  const value = {
    user,
    login,
    logout,
    updatePassword,
    isAuthenticated: !!user,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Custom hook to use auth context
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export default AuthContext;
