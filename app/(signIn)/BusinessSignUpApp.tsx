import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Modal,
  ScrollView,
} from "react-native";
import { Checkbox } from "react-native-paper";
import ServiceTerms from "./ServiceTerm";
import PrivacyPolicy from "./PrivacyPolicy";

const { width, height } = Dimensions.get("window");

const BusinessSignUpApp: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [businessNumber, setBusinessNumber] = useState("");
  const [errors, setErrors] = useState<any>({});
  const [checked0, setChecked0] = useState(false);
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [duplicationCheck, setDuplicationCheck] = useState(false);
  const [currentCheckbox, setCurrentCheckbox] = useState<number | null>(null);

  const handleCheckbox0Press = () => {
    const newChecked = !checked0;
    setChecked0(newChecked);
    setChecked1(newChecked);
    setChecked2(newChecked);
    if (newChecked) {
      setErrors((prev: any) => ({
        ...prev,
        checked1: null,
        checked2: null,
      }));
    }
  };

  const handleCheckbox1Press = () => {
    const newChecked1 = !checked1;
    setChecked1(newChecked1);
    if (newChecked1 && checked2) {
      setChecked0(true);
    } else if (!newChecked1) {
      setChecked0(false);
    }
    setErrors((prev: any) => ({ ...prev, checked1: null }));
  };

  const handleCheckbox2Press = () => {
    const newChecked2 = !checked2;
    setChecked2(newChecked2);
    if (newChecked2 && checked1) {
      setChecked0(true);
    } else if (!newChecked2) {
      setChecked0(false);
    }
    setErrors((prev: any) => ({ ...prev, checked2: null }));
  };

  const openModal = (content: React.ReactNode, checkboxNumber: number) => {
    setModalContent(content);
    setModalVisible(true);
    setCurrentCheckbox(checkboxNumber);
  };

  const closeModal = () => {
    setModalVisible(false);
    if (currentCheckbox === 1) {
      setChecked1(true);
      setErrors((prev: any) => ({ ...prev, checked1: null }));
      if (checked2) setChecked0(true);
    } else if (currentCheckbox === 2) {
      setChecked2(true);
      setErrors((prev: any) => ({ ...prev, checked2: null }));
      if (checked1) setChecked0(true);
    }
    if (checked1 && checked2) {
      setChecked0(true);
    }
    setCurrentCheckbox(null);
  };

  const handleSignUp = () => {
    let newErrors: any = {};
    if (!username) newErrors.username = "필수 입력 항목입니다.";
    if (!password) newErrors.password = "필수 입력 항목입니다.";
    if (!confirmPassword) newErrors.confirmPassword = "필수 입력 항목입니다.";
    if (!email) newErrors.email = "필수 입력 항목입니다.";
    if (!name) newErrors.name = "필수 입력 항목입니다.";
    if (!businessAddress) newErrors.businessAddress = "필수 입력 항목입니다.";
    if (!businessNumber) newErrors.businessNumber = "필수 입력 항목입니다.";
    if (!checked1) newErrors.checked1 = "필수 체크 항목입니다.";
    if (!checked2) newErrors.checked2 = "필수 체크 항목입니다.";
    if (!duplicationCheck)
      newErrors.duplicationCheck = "중복 확인은 필수입니다.";
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // 모든 필드가 올바르게 입력되었을 때의 처리
      console.log("회원가입 성공");
    }
  };

  const handleDuplicationCheck = () => {
    if (username.trim() === "") {
      setErrors((prev: any) => ({
        ...prev,
        duplicationCheck: "아이디를 입력하세요.",
      }));
    } else {
      setDuplicationCheck(true);
      setErrors((prev: any) => ({ ...prev, duplicationCheck: null }));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>사업자회원가입</Text>

        <View style={styles.id}>
          <TextInput
            style={[
              styles.idinput,
              (errors.username || errors.duplicationCheck) && styles.errorInput,
            ]}
            placeholder="아이디"
            placeholderTextColor="#aaa"
            value={username}
            onChangeText={(text) => {
              setUsername(text);
              if (text.trim() !== "") {
                setErrors((prev: any) => ({
                  ...prev,
                  username: null,
                  duplicationCheck: null,
                }));
              }
            }}
          />
          <View
            style={[
              styles.duplicationcheck,
              errors.duplicationCheck && styles.errorInput,
            ]}
          >
            <TouchableOpacity onPress={handleDuplicationCheck}>
              <Text style={styles.checkButton}>중복확인</Text>
            </TouchableOpacity>
          </View>
        </View>
        {errors.username && (
          <Text style={styles.errorText}>{errors.username}</Text>
        )}
        {errors.duplicationCheck && (
          <Text style={styles.errorText}>{errors.duplicationCheck}</Text>
        )}

        <TextInput
          style={[styles.input, errors.password && styles.errorInput]}
          placeholder="비밀번호"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            if (text.trim() !== "") {
              setErrors((prev: any) => ({ ...prev, password: null }));
            }
          }}
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password}</Text>
        )}

        <TextInput
          style={[
            styles.input,
            errors.confirmPassword && styles.errorInput,
          ]}
          placeholder="비밀번호확인"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
            if (text.trim() !== "") {
              setErrors((prev: any) => ({
                ...prev,
                confirmPassword: null,
              }));
            }
          }}
        />
        {errors.confirmPassword && (
          <Text style={styles.errorText}>{errors.confirmPassword}</Text>
        )}

        <TextInput
          style={[styles.input, errors.email && styles.errorInput]}
          placeholder="이메일"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (text.trim() !== "") {
              setErrors((prev: any) => ({ ...prev, email: null }));
            }
          }}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        <TextInput
          style={[styles.input, errors.name && styles.errorInput]}
          placeholder="이름"
          placeholderTextColor="#aaa"
          value={name}
          onChangeText={(text) => {
            setName(text);
            if (text.trim() !== "") {
              setErrors((prev: any) => ({ ...prev, name: null }));
            }
          }}
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

        <TextInput
          style={[
            styles.input,
            errors.businessAddress && styles.errorInput,
          ]}
          placeholder="사업장주소"
          placeholderTextColor="#aaa"
          value={businessAddress}
          onChangeText={(text) => {
            setBusinessAddress(text);
            if (text.trim() !== "") {
              setErrors((prev: any) => ({
                ...prev,
                businessAddress: null,
              }));
            }
          }}
        />
        {errors.businessAddress && (
          <Text style={styles.errorText}>{errors.businessAddress}</Text>
        )}

        <View style={styles.id}>
          <TextInput
            style={[styles.idinput, errors.businessNumber && styles.errorInput]}
            placeholder="사업자등록번호"
            placeholderTextColor="#aaa"
            value={businessNumber}
            onChangeText={(text) => {
              setBusinessNumber(text);
              if (text.trim() !== "") {
                setErrors((prev: any) => ({
                  ...prev,
                  businessNumber: null,
                }));
              }
            }}
          />
          <View
            style={[
              styles.duplicationcheck,
              errors.businessNumber && styles.errorInput,
            ]}
          >
            <TouchableOpacity>
              <Text style={styles.checkButton}>중복확인</Text>
            </TouchableOpacity>
          </View>
        </View>
        {errors.businessNumber && (
          <Text style={styles.errorText}>{errors.businessNumber}</Text>
        )}

        <View style={styles.term}>
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
              onPress={handleCheckbox1Press}
              color="#f0a500"
            />
            <TouchableOpacity onPress={() => openModal(<ServiceTerms />, 1)}>
              <View style={styles.labelContainer}>
                <Text style={styles.labelwarning}>[필수]</Text>
                <Text style={styles.label}>서비스 이용약관 동의</Text>
              </View>
            </TouchableOpacity>
          </View>
          {errors.checked1 && (
            <Text style={styles.errorText1}>{errors.checked1}</Text>
          )}

          <View style={styles.checkboxContainer}>
            <Checkbox
              status={checked2 ? "checked" : "unchecked"}
              onPress={handleCheckbox2Press}
              color="#f0a500"
            />
            <TouchableOpacity onPress={() => openModal(<PrivacyPolicy />, 2)}>
              <View style={styles.labelContainer}>
                <Text style={styles.labelwarning}>[필수]</Text>
                <Text style={styles.label}>개인정보 수집 및 이용 동의</Text>
              </View>
            </TouchableOpacity>
          </View>
          {errors.checked2 && (
            <Text style={styles.errorText1}>{errors.checked2}</Text>
          )}
        </View>

        <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
          <Text style={styles.signupButtonText}>회원가입</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {modalContent}
            </ScrollView>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>확인</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  term: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 30,
    marginTop: 30,
    borderRadius: 5,
    width: width * 0.8,
    padding: 10,
  },
  title: {
    fontSize: 35,
    marginBottom: 50,
    marginTop: 50,
    textAlign: "center",
    fontWeight: "bold",
  },
  id: {
    flexDirection: "row",
  },
  idinput: {
    borderColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: width * 0.6,
    height: height * 0.055,
  },
  duplicationcheck: {
    borderColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: width * 0.2,
  },
  input: {
    borderColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: width * 0.8,
    height: height * 0.055,
  },
  checkButton: {
    color: "#f0a500",
    alignSelf: "flex-end",
    marginTop: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  label: {
    marginLeft: 5,
  },
  labelwarning: {
    marginLeft: 5,
    color: "red",
  },
  labelContainer: {
    justifyContent: "center",
    flexDirection: "row",
  },
  signupButton: {
    backgroundColor: "#2E294E",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width: width * 0.8,
    height: height * 0.055,
    justifyContent: 'center'
  },
  signupButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: width * 0.9,
    height: height * 0.6,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#2E294E",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
  },
  errorText: {
    color: "red",
    alignSelf: "flex-start",
    marginBottom: 10,
    marginLeft: 10,
  },
  errorText1: {
    color: "red",
    alignSelf: "flex-start",
    marginBottom: 10,
    marginLeft: 40,
    marginTop: -20,
  },
  errorInput: {
    borderColor: "red",
  },
});

export default BusinessSignUpApp;
