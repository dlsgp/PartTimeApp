import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Checkbox } from "react-native-paper";
import { Image } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";


const SignInApp = () => {
  const [checked, setChecked] = React.useState(false);
  const navigation = useNavigation();

  const HorizonLine = ({ text }) => {
    return (
      <div
        style={{
          width: 500,
          textAlign: "center",
          borderBottom: "1px solid #aaa",
          lineHeight: "0.1em",
          margin: "10px 0 20px",
          marginBottom: 40,
        }}
      >
        <span style={{ background: "#fff", padding: "0 10px" }}>{text}</span>
      </div>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder="ID"
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
      />

      <View style={styles.options}>
        <View style={styles.autoLogin}>
          <Checkbox
            status={checked ? "checked" : "unchecked"}
            onPress={() => {
              setChecked(!checked);
            }}
            color="#f0a500"
          />
          <TouchableOpacity onPress={() => { setChecked(!checked) }}>
            <Text style={styles.autoLoginText}>자동로그인</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>비밀번호를 잊으셨나요?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>LOGIN</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/SignUpSelectionApp')}>
        <Text style={styles.registerText}>회원가입</Text>
      </TouchableOpacity>
        
        <HorizonLine text="소셜로그인"/>

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
    fontSize: 70,
    marginBottom: 150,
  },
  input: {
    width: 500,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  options: {
    width: 500,
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
    color: "#FFBD00",
  },
  forgotPassword: {
    color: "#FFBD00",
  },
  loginButton: {
    width: 500,
    height: 50,
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
    width: 150,
  },
  socialButton: {
    width: 40,
    height: 40,
  },
});

export default SignInApp;
