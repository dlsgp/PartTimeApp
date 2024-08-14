import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Test = () => {
  const handleLogout = async () => {
    await AsyncStorage.removeItem("userToken");
    await AsyncStorage.removeItem("userType");
    await AsyncStorage.removeItem("userId");
    router.push("/"); // 로그인 화면으로 이동
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleLogout} style={styles.button}>
        <Text>로그아웃</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => router.push("/(myPage)/QRCodeScanner")}>
        <Text>QRScanner</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  button: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

export default Test;
