import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Checkbox } from "react-native-paper";
import { Image } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { login } from "../../components/src/services/apiService";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

const SignInApp = () => {
  const [checked, setChecked] = useState(false);
  const navigation = useNavigation();
  const router = useRouter();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
      const token = await AsyncStorage.getItem("userToken");
      if (token) {
        router.push("/(staffLayout)/FormBox");
      }
    };
    checkLoggedIn();
  }, []);

  const handleLogin = async () => {
    try {
      const response = await login(id, password);
      if (response.success) {
        console.log("Login successful:", response);
        if(checked) {
          await AsyncStorage.setItem("userToken", response.token);
        }
        // 로그인 성공 시 홈 화면으로 이동
        router.push("/(staffLayout)/FormBox"); // 라우터 설정에 따라 변경
      } else {
        setError(response.message || "로그인 실패");
      }
    } catch (error) {
      console.log("Login error:", error);
      setError("로그인 중 오류가 발생했습니다.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
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
  },
  input: {
    width: width * 0.8,
    height: height * 0.055,
    borderColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
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
    marginBottom: 2,
    color: "#FFBD00",
  },
  forgotPasswordText: {
    color: "#FFBD00",
    marginBottom: 2,
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
  },
  registerText: {
    color: "#FFBD00",
    marginBottom: 40,
  },
  socialLoginText: {
    marginBottom: 20,
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
