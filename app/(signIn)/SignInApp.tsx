import React, { useEffect, useState } from "react";
import * as Font from 'expo-font';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Checkbox } from "react-native-paper";
import { Image } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect, useRouter } from "expo-router";
import { getAuthToken, login } from "../../components/src/services/apiService";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

const SignInApp = () => {
  const [checked, setChecked] = useState(false);
  const navigation = useNavigation();
  const router = useRouter();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const HorizonLine = ({ text }) => {
    return (
      <View style={styles.horizonLine}>
        <View style={styles.line} />
        <Text style={styles.horizonLineText}>{text}</Text>
        <View style={styles.line} />
      </View>
    );
  };

  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = await getAuthToken(); // getAuthToken을 호출하여 토큰 유효성을 검사하고 갱신
      if (token) {
        const userType = await AsyncStorage.getItem("userType");
        if (userType === "1") {
          navigation.navigate("StaffTabs");
        } else if (userType === "2") {
          navigation.navigate("AdminTabs");
        }
      }
      setLoading(false); // 로딩 상태 해제
      // loadFonts();
    };

    // const loadFonts = async () => {
    //   await Font.loadAsync({
    //     'GmarketSansLight': require('../../assets/fonts/GmarketSansTTFLight.ttf'),
    //     'GmarketSansBold': require('../../assets/fonts/GmarketSansTTFBold.ttf'),
    //     'GmarketSansMedium': require('../../assets/fonts/GmarketSansTTFMedium.ttf'),
    //     'MangoDdobak-B': require('../../assets/fonts/MangoDdobak-B(ttf).ttf'),
    //     'MangoDdobak-L': require('../../assets/fonts/MangoDdobak-L(ttf).ttf'),
    //     'MangoDdobak-R': require('../../assets/fonts/MangoDdobak-R(ttf).ttf'),
    //   });
    //   setFontsLoaded(true);
    // };
    // loadFonts();
    checkLoggedIn();
  }, []);


  useFocusEffect(
    React.useCallback(() => {
      const resetLoginState = async () => {
        const token = await AsyncStorage.getItem("userToken");
        const tokenExpiration = await AsyncStorage.getItem("tokenExpiration");
        const now = new Date().getTime();

        if (
          token &&
          (!tokenExpiration || now < parseInt(tokenExpiration, 10))
        ) {
          const userType = await AsyncStorage.getItem("userType");
          if (userType === "1") {
            navigation.navigate("StaffTabs");
          } else if (userType === "2") {
            navigation.navigate("AdminTabs");
          }
        } else {
          await AsyncStorage.removeItem("userToken");
          await AsyncStorage.removeItem("userId");
          await AsyncStorage.removeItem("userType");
          await AsyncStorage.removeItem("tokenExpiration");
        }
      };
      resetLoginState();
    }, [])
  );

  const handleLogin = async () => {
    try {
      const response = await login(id, password);
      if (response.success) {
        console.log("Login successful:", response);

        const { accessToken, refreshToken, userId, userType } = response;
        const tokenExpiration = checked
          ? null
          : new Date().getTime() + 24 * 60 * 60 * 1000; // 24 hours from now

        if (accessToken && refreshToken) {
          await AsyncStorage.setItem("accessToken", accessToken);
          await AsyncStorage.setItem("refreshToken", refreshToken);
        } else {
          console.error("Login API response did not include tokens.");
        }

        await AsyncStorage.setItem("userId", userId);
        await AsyncStorage.setItem("userType", userType.toString());
        if (tokenExpiration) {
          await AsyncStorage.setItem(
            "tokenExpiration",
            tokenExpiration.toString()
          );
        } else {
          await AsyncStorage.removeItem("tokenExpiration");
        }

        if (userType === 1) {
          navigation.navigate("StaffTabs");
        } else if (userType === 2) {
          navigation.navigate("AdminTabs");
        }
      } else {
        setError(response.message || "로그인 실패");
      }
    } catch (error) {
      console.log("Login error:", error);
      setError("로그인 중 오류가 발생했습니다.");
    }
  };

  // 새로고침이나 라우트 변경 시 호출
  const checkTokenValidity = async () => {
    const accessToken = await AsyncStorage.getItem("accessToken");
    const refreshToken = await AsyncStorage.getItem("refreshToken");
    const tokenExpiration = await AsyncStorage.getItem("tokenExpiration");
    const now = new Date().getTime();

    if (!accessToken || now >= parseInt(tokenExpiration, 10)) {
      // accessToken이 없거나 만료된 경우
      if (refreshToken) {
        try {
          const response = await axios.post(`${API_BASE_URL}/refresh-token`, {
            refreshToken,
          });

          if (response.data.accessToken) {
            const newAccessToken = response.data.accessToken;
            const newExpiration = new Date().getTime() + 60 * 60 * 1000; // 1시간

            await AsyncStorage.setItem("accessToken", newAccessToken);
            await AsyncStorage.setItem(
              "tokenExpiration",
              newExpiration.toString()
            );
          } else {
            // refreshToken이 유효하지 않음
            await logout();
          }
        } catch (error) {
          console.error("Failed to refresh token:", error);
          await logout();
        }
      } else {
        // refreshToken이 없으면 로그아웃 처리
        await logout();
      }
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("refreshToken");
    await AsyncStorage.removeItem("tokenExpiration");
    await AsyncStorage.removeItem("userId");
    await AsyncStorage.removeItem("userType");
    navigation.navigate("/");
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>PartTime</Text>
      <TextInput
        style={styles.input}
        placeholder="ID"
        placeholderTextColor="#aaa"
        value={id}
        onChangeText={setId}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <View style={styles.options}>
        <View style={styles.autoLogin}>
          <Checkbox
            status={checked ? "checked" : "unchecked"}
            onPress={() => setChecked(!checked)}
            color="#f0a500"
          />
          <TouchableOpacity onPress={() => setChecked(!checked)}>
            <Text style={styles.autoLoginText}>자동로그인</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.forgotPasswordTouch}>
          <TouchableOpacity
            onPress={() => router.push("/(signIn)/FindPasswordApp")}
          >
            <Text style={styles.forgotPasswordText}>
              비밀번호를 잊으셨나요?
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>LOGIN</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/(signIn)/SignUpSelectionApp")}
      >
        <Text style={styles.registerText}>회원가입</Text>
      </TouchableOpacity>

      <HorizonLine text="소셜로그인" />

      <View style={styles.socialLoginButtons}>
        <TouchableOpacity>
          <Image
            source={require("../../assets/images/navericon.png")}
            style={styles.socialButton}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require("../../assets/images/kakaoicon.png")}
            style={styles.socialButton}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 55,
    marginBottom: 150,
    // fontFamily: 'GmarketSansBold',
    // fontFamily: 'MangoDdobak-B',
  },
  input: {
    width: width * 0.8,
    height: height * 0.055,
    borderColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    // fontFamily: 'GmarketSansMedium',
  },
  options: {
    width: width * 0.8,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  autoLogin: {
    flexDirection: "row",
    alignItems: "center",
  },
  autoLoginText: {
    marginLeft: 5,
    marginBottom: 0,
    marginTop: 5,
    color: "#FFBD00",
    // fontFamily: 'GmarketSansMedium',
  },
  forgotPasswordText: {
    color: "#FFBD00",
    marginBottom: 2,
    // fontFamily: 'GmarketSansMedium',
    marginTop: 5,
  },
  forgotPasswordTouch: {
    marginTop: 7,
  },
  loginButton: {
    width: width * 0.8,
    height: height * 0.055,
    backgroundColor: "#2E294E",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 20,
  },
  loginButtonText: {
    color: "#fff",
    fontWeight: "bold",
    // fontFamily: 'GmarketSansBold',
  },
  registerText: {
    color: "#FFBD00",
    marginBottom: 40,
    // fontFamily: 'GmarketSansMedium',
    marginTop: 10,
  },
  socialLoginText: {
    marginBottom: 20,
    // fontFamily: 'GmarketSansLight',
  },
  socialLoginButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: width * 0.5,
  },
  socialButton: {
    width: 40,
    height: 40,
  },
  horizonLine: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#aaa",
  },
  horizonLineText: {
    marginHorizontal: 10,
    backgroundColor: "#fff",
    paddingHorizontal: 5,
    color: "#aaa",
  },
  errorText: {
    color: "red",
    marginBottom: 20,
  },
});

export default SignInApp;
