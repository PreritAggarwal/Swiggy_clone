import axios from 'axios';

const API_URL = 'http://localhost:5000/api/admin'; 

// Signup function
export const signup = async (name, email, password, role_name) => { // Accept role parameter
  try {
    const response = await axios.post(`${API_URL}/signup`, { name, email, password, role_name });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Signup failed';
  }
};

// Login function
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Login failed';
  }
};

// Forgot Password function
export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/forgotpassword`, { email });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to send reset link';
  }
};

// Reset Password function
export const resetPassword = async (token, newPassword) => {
  try {
    const response = await axios.post(`${API_URL}/resetpassword`, { token, newPassword });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to reset password';
  }
};
