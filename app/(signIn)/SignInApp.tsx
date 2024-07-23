import React from "react";
import {
  Dimensions,
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
import { Link, router } from "expo-router";

// const { width, height } = Dimensions.get("window");


const SignInApp = () => {
  const [checked, setChecked] = React.useState(false);
  const navigation = useNavigation();

  const HorizonLine = ({ text }) => {
    return (
      <View style={styles.horizonLine}>
        <View style={styles.line} />
        <Text style={styles.horizonLineText}>{text}</Text>
        <View style={styles.line} />
      </View>
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
        
        <View style={styles.forgotPasswordTouch}>
        <Link href="FindPasswordApp">
        <TouchableOpacity>
          <Text style={styles.forgotPasswordText}>비밀번호를 잊으셨나요?</Text>
        </TouchableOpacity>
        </Link>
        </View>

      </View>

      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>LOGIN</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/(signIn)/SignUpSelectionApp')}>
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
<<<<<<< Updated upstream
    width: 500,
    height: 40,
=======
    width: width * 0.8,
    height: height * 0.055,
>>>>>>> Stashed changes
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
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
<<<<<<< Updated upstream
    width: 500,
    height: 50,
=======
    width: width * 0.8,
    height: height * 0.055,
>>>>>>> Stashed changes
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
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#aaa',
  },
  horizonLineText: {
    marginHorizontal: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 5,
    color: '#aaa',
  },
});

export default SignInApp;
