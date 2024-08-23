import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// Expo 터널 URL을 사용
const API_URL = "http://192.168.0.84:3000/api";

export const login = async (id, password) => {
  try {
    const response = await axios.post(
      `${API_URL}/login`,
      { id, password },
      {
        withCredentials: true,
      }
    );

    if (response.data.success) {
      const { accessToken, refreshToken } = response.data;

      if (accessToken && refreshToken) {
        const tokenExpiration = new Date().getTime() + 60 * 60 * 1000; // 1시간

        await AsyncStorage.setItem("accessToken", accessToken);
        await AsyncStorage.setItem("refreshToken", refreshToken);
        await AsyncStorage.setItem(
          "tokenExpiration",
          tokenExpiration.toString()
        );
      } else {
        console.error("Login API response did not include tokens.");
      }

      console.log("Login successful:", response.data);
      return response.data;
    } else {
      throw new Error(response.data.message || "Login failed");
    }
  } catch (error) {
    console.error("Login API call failed:", error);
    throw error.response ? error.response.data : error;
  }
};

export const logout = async () => {
  await AsyncStorage.removeItem("accessToken");
  await AsyncStorage.removeItem("refreshToken");
  await AsyncStorage.removeItem("tokenExpiration");
  await AsyncStorage.removeItem("userId");
  // 필요 시 서버에 로그아웃 요청을 보냅니다.
};

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
  let accessToken = await AsyncStorage.getItem("accessToken");
  const tokenExpiration = await AsyncStorage.getItem("tokenExpiration");
  const refreshToken = await AsyncStorage.getItem("refreshToken");
  const now = new Date().getTime();

  if (!accessToken || now >= parseInt(tokenExpiration, 10)) {
    // accessToken이 없거나 만료된 경우
    if (refreshToken) {
      try {
        const response = await axios.post(`${API_URL}/refresh-token`, {
          refreshToken,
        });

        if (response.data.accessToken) {
          accessToken = response.data.accessToken;
          const newExpiration = new Date().getTime() + 60 * 60 * 1000; // 1시간

          await AsyncStorage.setItem("accessToken", accessToken);
          await AsyncStorage.setItem("tokenExpiration", newExpiration.toString());
        } else {
          // refreshToken이 유효하지 않음
          await logout();
          return null;  // 로그아웃 처리 후 null 반환
        }
      } catch (error) {
        console.error("Failed to refresh token:", error);
        await logout();
        return null;  // 로그아웃 처리 후 null 반환
      }
    } else {
      // refreshToken이 없으면 로그아웃 처리
      await logout();
      return null;  // 로그아웃 처리 후 null 반환
    }
  }

  return accessToken;
};


export const fetchData = async (endpoint) => {
  const token = await getAuthToken(); // 유효한 토큰을 가져옴
  const response = await axios.get(`${API_URL}/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`, // 가져온 토큰을 헤더에 추가
    },
  });
  return response.data;
};

export const sendVerificationCode = async (id, email) => {
  try {
    const response = await axios.post(`${API_URL}/send-verification-code`, {
      id,
      email,
    });
    return response.data;
  } catch (error) {
    console.error("Send verification code API call failed:", error);
    throw error.response ? error.response.data : error;
  }
};

export const verifyCode = async (email, verificationCode) => {
  try {
    const response = await axios.post(`${API_URL}/verify-code`, {
      email,
      verificationCode,
    });
    return response.data;
  } catch (error) {
    console.error("Verify code API call failed:", error);
    throw error.response ? error.response.data : error;
  }
};

export const resetPassword = async (email, verificationCode, newPassword) => {
  try {
    const response = await axios.post(`${API_URL}/reset-password`, {
      email,
      verificationCode,
      newPassword,
    });
    return response.data;
  } catch (error) {
    console.error("Reset password API call failed:", error);
    throw error.response ? error.response.data : error;
  }
};

export const getUserInfo = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Get user info API call failed:", error);
    throw error.response ? error.response.data : error;
  }
};

export const updateUserInfo = async (userId, userInfo) => {
  try {
    const response = await axios.post(`${API_URL}/update-user`, {
      id: userId,
      ...userInfo,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to update user info:", error);
    throw error;
  }
};
