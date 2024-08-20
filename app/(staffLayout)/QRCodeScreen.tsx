import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import API_BASE_URL from "@/config";
import { router } from "expo-router";

const QRCodeScreen = () => {
  const [qrCodeUrl, setQrCodeUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQRCode = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        console.log("Fetched ceo_id:", userId); // 이 부분에서 제대로 가져오는지 확인
        if (userId) {
          const response = await axios.get(
            `${API_BASE_URL}:3000/api/generate-qr`,
            {
              params: { ceo_id: userId },
            }
          );

          if (response.data.success) {
            setQrCodeUrl(response.data.qrCodeUrl);
          }
        } else {
          console.error("No ceo_id found in storage");
        }
      } catch (error) {
        console.error("Error fetching QR code:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQRCode();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("userToken");
    await AsyncStorage.removeItem("userType");
    await AsyncStorage.removeItem("userId");
    router.push("/"); // 로그인 화면으로 이동
  };

  // useEffect(() => {
  //   const fetchQRCode = async () => {
  //     try {
  //       // AsyncStorage에서 ceo_id를 가져옵니다.
  //       const userId = await AsyncStorage.getItem('userId');
  //       console.log('Fetched ceo_id:', userId);

  //       if (userId) {
  //         const response = await axios.get(`${API_BASE_URL}:3000/api/generate-qr`, {
  //           params: { userId },
  //         });

  //         if (response.data.success) {
  //           setQrCodeUrl(response.data.qrCodeUrl);
  //         }
  //       } else {
  //         console.error('No ceo_id found in storage');
  //       }
  //     } catch (error) {
  //       console.error('Error fetching QR code:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchQRCode();
  // }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      {qrCodeUrl ? (
        Platform.OS === "web" ? (
          <img
            src={qrCodeUrl}
            alt="QR Code"
            style={{ width: 300, height: 300 }}
          />
        ) : (
          <Image
            source={{ uri: qrCodeUrl }}
            style={{ width: 300, height: 300 }}
          />
        )
      ) : null}

      <TouchableOpacity onPress={handleLogout} style={styles.button}>
        <Text>로그아웃</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    marginTop: "50%",
    backgroundColor: "#fff",
  },
});

export default QRCodeScreen;
