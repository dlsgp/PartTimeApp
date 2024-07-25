import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

const { width, height } = Dimensions.get("window");

const FindPasswordApp = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>비밀번호 찾기</Text>
      <TextInput
        style={styles.input}
        placeholder="아이디를 입력하세요."
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        placeholder="이메일을 입력하세요."
        placeholderTextColor="#aaa"
      />

      <TouchableOpacity style={styles.Button}>
        <Text style={styles.ButtonText}>비밀번호 찾기</Text>
      </TouchableOpacity>
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
    fontSize: 35,
    marginBottom: 80,
    textAlign: "center",
    fontWeight: "bold",
  },
  input: {
    width: width * 0.8,
    height: height * 0.055,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  Button: {
    width: width * 0.6,
    height: height * 0.055,
    backgroundColor: "#2E294E",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 20,
    marginTop: 30,
  },
  ButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default FindPasswordApp;