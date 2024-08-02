import axios from "axios";

// Expo 터널 URL을 사용
const API_URL = "http://localhost:3000/api";

export const signUp = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, userData);
    console.log("Signup successful:", response.data);
    return response.data;
  } catch (error) {
    console.error("Signup API call failed:", error);
    throw error;
  }
};

export const login = async (id, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { id, password });
    console.log("Login successful:", response.data);
    return response.data;
  } catch (error) {
    console.error("Login API call failed:", error);
    throw error;
  }
};

export const bsignUp = async (businessData) => {
  try {
    const response = await axios.post(`${API_URL}/bsignup`, businessData);
    console.log("businessSignup successful:", response.data);
    return response.data;
  } catch (error) {
    console.error("businessSignup API call failed:", error);
    throw error;
  }
};
