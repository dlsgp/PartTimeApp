import { Link } from "expo-router";
import React from "react";
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

const { width, height } = Dimensions.get("window");

const PersonalSignUpApp: React.FC = () => {
  const [checked0, setChecked0] = React.useState(false);
  const [checked1, setChecked1] = React.useState(false);
  const [checked2, setChecked2] = React.useState(false);

  const handleCheckbox0Press = () => {
    if (checked1 && checked2) {
      setChecked1(false);
      setChecked2(false);
    } else {
      setChecked1(true);
      setChecked2(true);
    }
    setChecked0(!checked0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>개인회원가입</Text>

      <TextInput
        style={styles.input}
        placeholder="아이디"
        placeholderTextColor="#aaa"
      />
      {/* <TouchableOpacity>
        <Text style={styles.checkButton}>중복확인</Text>
      </TouchableOpacity> */}

      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        placeholderTextColor="#aaa"
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호확인"
        placeholderTextColor="#aaa"
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="이름"
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        placeholder="주소"
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        placeholder="이메일"
        placeholderTextColor="#aaa"
      />

      <View style={styles.checkboxContainer}>
        <Checkbox
          status={checked0 ? "checked" : "unchecked"}
          onPress={handleCheckbox0Press}
          color="#f0a500"
        />
        <Text style={styles.label}>이용약관에 전체동의</Text>
      </View>
      <View style={styles.checkboxContainer}>
        <Checkbox
          status={checked1 ? "checked" : "unchecked"}
          onPress={() => {
            setChecked1(!checked1);
          }}
          color="#f0a500"
        />
        <Text style={styles.label}>[필수] 서비스 이용약관 동의</Text>
      </View>
      <View style={styles.checkboxContainer}>
        <Checkbox
          status={checked2 ? "checked" : "unchecked"}
          onPress={() => {
            setChecked2(!checked2);
          }}
          color="#f0a500"
        />
        <Text style={styles.label}>[필수] 개인정보 수집 및 이용 동의</Text>
      </View>

      <Link href="SignInApp">
      <TouchableOpacity style={styles.signupButton}>
        <Text style={styles.signupButtonText}>회원가입</Text>
      </TouchableOpacity>
      </Link>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 50,
    marginBottom: 60,
    textAlign: "center",
    fontWeight: 'bold',
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: width * 0.8,
    height: height * 0.055,
  },
  checkButton: {
    color: "#f0a500",
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  label: {
    marginLeft: 5,
  },
  signupButton: {
    backgroundColor: "#2E294E",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    width: width * 0.8,
    height: height * 0.055,
  },
  signupButtonText: {
    color: "#fff",
  },
});

export default PersonalSignUpApp;
