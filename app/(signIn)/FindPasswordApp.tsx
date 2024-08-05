import { useEffect, useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import {
  sendVerificationCode,
  resetPassword,
  verifyCode,
} from "@/components/src/services/apiService";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

const FindPasswordApp = () => {
  const [step, setStep] = useState(1);
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setError("");
  }, [step]);

  const handleSendCode = async () => {
    setLoading(true);
    try {
      const response = await sendVerificationCode(id, email);
      console.log("sendVerificationCode response:", response);
      if (response.success) {
        console.log("Verification code sent successfully.");
        setStep(2);
        console.log("Step updated to 2");
      } else {
        setError(response.message || "Failed to send verification code");
      }
    } catch (error) {
      setError(error.message || "Failed to send verification code");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    setLoading(true);
    try {
      const response = await verifyCode(email, verificationCode); 
      console.log("verifyCode response:", response);
      if (response.success) {
        setStep(3);
        console.log("Step updated to 3");
      } else {
        setError(response.message || "Failed to verify code");
      }
    } catch (error) {
      setError(error.message || "Failed to verify code");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmNewPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const response = await resetPassword(email, verificationCode, newPassword);
      console.log("resetPassword response:", response);
      if (response.success) {
        setStep(4);
        console.log("Step updated to 4");
      } else {
        setError(response.message || "Failed to reset password");
      }
    } catch (error) {
      setError(error.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {step === 1 && (
        <>
          <Text style={styles.title}>비밀번호 찾기</Text>
          <TextInput
            style={styles.input}
            placeholder="아이디를 입력하세요."
            placeholderTextColor="#aaa"
            value={id}
            onChangeText={setId}
            editable={!loading}
          />
          <TextInput
            style={styles.input}
            placeholder="이메일을 입력하세요."
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail}
            editable={!loading}
          />

          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <TouchableOpacity style={styles.Button} onPress={handleSendCode} disabled={loading}>
            <Text style={styles.ButtonText}>{loading ? "인증번호 보내는 중..." : "인증번호 보내기"}</Text>
          </TouchableOpacity>
        </>
      )}
      {step === 2 && (
        <>
          <Text style={styles.title}>인증번호 확인</Text>
          <TextInput
            style={styles.input}
            placeholder="이메일로 받은 인증번호를 입력하세요."
            placeholderTextColor="#aaa"
            value={verificationCode}
            onChangeText={setVerificationCode}
            editable={!loading}
          />

          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <TouchableOpacity style={styles.Button} onPress={handleVerifyCode} disabled={loading}>
            <Text style={styles.ButtonText}>{loading ? "인증번호 확인 중..." : "인증번호 확인"}</Text>
          </TouchableOpacity>
        </>
      )}
      {step === 3 && (
        <>
          <Text style={styles.title}>새 비밀번호 설정</Text>
          <TextInput
            style={styles.input}
            placeholder="새 비밀번호를 입력하세요."
            placeholderTextColor="#aaa"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
            editable={!loading}
          />
          <TextInput
            style={styles.input}
            placeholder="새 비밀번호를 다시 입력하세요."
            placeholderTextColor="#aaa"
            secureTextEntry
            value={confirmNewPassword}
            onChangeText={setConfirmNewPassword}
            editable={!loading}
          />
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <TouchableOpacity style={styles.Button} onPress={handleResetPassword} disabled={loading}>
            <Text style={styles.ButtonText}>{loading ? "비밀번호 재설정 중..." : "비밀번호 재설정"}</Text>
          </TouchableOpacity>
        </>
      )}
      {step === 4 && (
        <>
          <Text style={styles.title}>비밀번호 재설정 완료</Text>
          <Text style={styles.successText}>
            비밀번호가 성공적으로 재설정되었습니다.
          </Text>
          <TouchableOpacity
            style={styles.Button}
            onPress={() => router.push("/SignInApp")}
          >
            <Text style={styles.ButtonText}>로그인 화면으로 돌아가기</Text>
          </TouchableOpacity>
        </>
      )}
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
  errorText: {
    color: "red",
    marginBottom: 20,
  },
  successText: {
    color: "green",
    marginBottom: 20,
  },
});

export default FindPasswordApp;
