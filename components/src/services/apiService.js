import AsyncStorage from "@react-native-async-storage/async-storage";
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

export const bsignup = async (businessData) => {
  try {
    const response = await axios.post(`${API_URL}/bsignup`, businessData);
    console.log("business Signup successful:", response.data);
    return response.data;
  } catch (error) {
    console.error("business Signup API call failed:", error);
    throw error;
  }
};

export const getAuthToken = async () => {
  return await AsyncStorage.getItem("userToken");
};

export const fetchData = async (endpoint) => {
  const token = await getAuthToken();
  const response = await axios.get(`${API_URL}/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const sendVerificationCode = async (id, email) => {
  try {
    const response = await axios.post(`${API_URL}/send-verification-code`, { id, email });
    return response.data;
  } catch (error) {
    console.error("Send verification code API call failed:", error);
    throw error.response ? error.response.data : error;
  }
};

export const verifyCode = async (email, verificationCode) => {
  try {
    const response = await axios.post(`${API_URL}/verify-code`, { email, verificationCode });
    return response.data;
  } catch (error) {
    console.error("Verify code API call failed:", error);
    throw error.response ? error.response.data : error;
  }
};

export const resetPassword = async (email, verificationCode, newPassword) => {
  try {
    const response = await axios.post(`${API_URL}/reset-password`, { email, verificationCode, newPassword });
    return response.data;
  } catch (error) {
    console.error("Reset password API call failed:", error);
    throw error.response ? error.response.data : error;
  }
};
