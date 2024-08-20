import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
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

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    try {
      const qrData = JSON.parse(data);

      // AsyncStorage에서 사용자 ID를 가져옵니다.
      const userId = await AsyncStorage.getItem("userId");

      // 서버로 요청을 보냅니다.
      const response = await axios.post(
        `${API_BASE_URL}:3000/api/attendance-check`,
        {
          userId: userId, // 현재 사용자의 ID
          ceo_id: qrData.ceo_id, // QR 코드에서 가져온 ceo_id
        }
      );

      if (response.data.success) {
        setHasCheckedIn(!hasCheckedIn); // 출근 상태 변경
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // 월은 0부터 시작하므로 +1
        const day = currentDate.getDate().toString().padStart(2, "0");
        const hours = currentDate.getHours().toString().padStart(2, "0");
        const minutes = currentDate.getMinutes().toString().padStart(2, "0");
        const seconds = currentDate.getSeconds().toString().padStart(2, "0");

        const formattedDate = `${year}-${month}-${day}`;
        const formattedTime = `${hours}:${minutes}:${seconds}`;

        alert(
          `체크 ${hasCheckedIn ? "아웃" : "인"} 성공! 

          날짜: ${formattedDate}
          시간: ${formattedTime}`
        );
      } else {
        alert("출석 체크에 실패했습니다.");
      }
    } catch (error) {
      console.error("QR 코드 처리 중 오류가 발생했습니다.", error);
      alert("QR 코드 처리 중 오류가 발생했습니다.");
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

// import React, { useState, useEffect } from 'react';
// import { View, Text, Button, StyleSheet, Alert } from 'react-native';
// import { Camera } from 'expo-camera';
// import { BarCodeScanner } from 'expo-barcode-scanner';
// import API_BASE_URL from '@/config';
// import axios from 'axios';

// const QRCodeScannerScreen = () => {
//   const [hasPermission, setHasPermission] = useState(null);
//   const [scanned, setScanned] = useState(false);
//   const [hasCheckedIn, setHasCheckedIn] = useState(false);

//   useEffect(() => {
//     (async () => {
//       const { status } = await Camera.requestCameraPermissionsAsync();
//       setHasPermission(status === 'granted');
//     })();
//   }, []);

//   const handleBarCodeScanned = async ({ type, data }) => {
//     setScanned(true);
//     try {
//       const qrData = JSON.parse(data);
//       const response = await axios.post(`${API_BASE_URL}:3000/attendance-check`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           userId: qrData.userId,
//           uuid: qrData.uuid,
//           hasCheckedIn: !hasCheckedIn,
//         }),
//       });

//       const result = await response.json();

//       if (result.success) {
//         setHasCheckedIn(!hasCheckedIn);
//         Alert.alert('성공', `체크 ${hasCheckedIn ? '아웃' : '인'} 성공!`);
//       } else {
//         Alert.alert('실패', '출석 체크에 실패했습니다.');
//       }
//     } catch (error) {
//       console.error('Error processing QR Code:', error);
//       Alert.alert('오류', 'QR 코드 처리 중 오류가 발생했습니다.');
//     }
//   };

//   if (hasPermission === null) {
//     return <Text>카메라 접근 권한 요청 중...</Text>;
//   }
//   if (hasPermission === false) {
//     return <Text>카메라 접근 권한이 없습니다.</Text>;
//   }

//   return (
//     <View style={styles.container}>
//       <BarCodeScanner
//         onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
//         style={StyleSheet.absoluteFillObject}
//       />
//       {scanned && <Button title={'다시 스캔'} onPress={() => setScanned(false)} />}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'column',
//     justifyContent: 'center',
//   },
// });

// export default QRCodeScannerScreen;
