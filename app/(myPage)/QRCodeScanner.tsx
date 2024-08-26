import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API_BASE_URL from "@/config";

const QRCodeScannerScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [hasCheckedIn, setHasCheckedIn] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    const checkCurrentStatus = async () => {
      const workId = await AsyncStorage.getItem("userId");
      const ceoId = await AsyncStorage.getItem("ceo_id"); // 저장된 ceo_id 가져오기

      if (workId && ceoId) {
        try {
          const response = await axios.get(`${API_BASE_URL}:3000/api/check-status`, {
            params: { ceo_id: ceoId }, // ceo_id를 파라미터로 보냅니다.
            headers: { Authorization: `Bearer ${workId}` }
          });
          setHasCheckedIn(response.data.checkedIn);
        } catch (error) {
          console.error("Error checking status:", error);
        }
      }
    };

    getBarCodeScannerPermissions();
    checkCurrentStatus();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    if (scanned) {
      return; // 이미 스캔이 완료된 상태이므로 추가 스캔을 방지
    }

    setScanned(true); // 스캔이 완료되었음을 표시
    try {
      const qrData = JSON.parse(data);

      // AsyncStorage에서 사용자 ID를 가져옵니다.
      const workId = await AsyncStorage.getItem("userId");

      if (!workId || !qrData.ceo_id) {
        console.error("workId 또는 ceo_id가 누락되었습니다.");
        Alert.alert("오류", "사용자 ID 또는 ceo_id가 없습니다.");
        return;
      }

      const endpoint = hasCheckedIn ? "workout" : "workin";
      const payload = { workId, ceo_id: qrData.ceo_id };

      console.log("Sending payload:", payload);

      const response = await axios.post(
        `${API_BASE_URL}:3000/api/${endpoint}`,
        payload
      );

      if (response.data.success) {
        setHasCheckedIn(!hasCheckedIn); // 출근 상태 변경
        Alert.alert(`체크 ${hasCheckedIn ? "아웃" : "인"} 성공!`);
      } else {
        Alert.alert("오류", "출석 체크에 실패했습니다.");
      }
    } catch (error) {
      console.error("QR 코드 처리 중 오류가 발생했습니다.", error);
      Alert.alert("오류", "QR 코드 처리 중 오류가 발생했습니다.");
    }
  };

  if (hasPermission === null) {
    return <Text>카메라 권한을 요청 중입니다...</Text>;
  }
  if (hasPermission === false) {
    return <Text>카메라 권한이 없습니다.</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title={"다시 스캔하기"} onPress={() => setScanned(false)} />
      )}
      <Text style={styles.centerText}>QR 코드를 스캔하세요.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centerText: {
    fontSize: 18,
    color: "#000",
    textAlign: "center",
    marginTop: 20,
  },
});

export default QRCodeScannerScreen;