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
import PrivacyPolicy from "./PrivacyPolicy";
import ServiceTerms from "./ServiceTerm";
import { signUp } from "@/components/src/services/apiService";
import { router } from "expo-router";
import Postcode from "@actbase/react-daum-postcode";
import axios from "axios";
import API_BASE_URL from "@/config";

const { width, height } = Dimensions.get("window");

const PersonalSignUpApp: React.FC = () => {
  const [id, setid] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [postcode, setPostcode] = useState("");
  const [add1, setAdd1] = useState("");
  const [add2, setAdd2] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<any>({});
  const [checked0, setChecked0] = useState(false);
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [duplicationCheck1, setDuplicationCheck1] = useState(false);
  const [duplicationCheck2, setDuplicationCheck2] = useState(false);
  const [currentCheckbox, setCurrentCheckbox] = useState<number | null>(null);
  const [tel, setTel] = useState("");
  const [postcodeModalVisible, setPostcodeModalVisible] = useState(false);
  const [signupCompleteModalVisible, setSignupCompleteModalVisible] =
    useState(false);

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
      if (checked1) setChecked0(true);
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

  const handleSignUp = async () => {
    let newErrors: any = {};
    if (!id) newErrors.id = "필수 입력 항목입니다.";
    if (!password) newErrors.password = "필수 입력 항목입니다.";
    if (!confirmPassword) newErrors.confirmPassword = "필수 입력 항목입니다.";
    if (!name) newErrors.name = "필수 입력 항목입니다.";
    if (!birth) newErrors.birth = "필수 입력 항목입니다.";
    if (!postcode) newErrors.postcode = "필수 입력 항목입니다.";
    if (!add1) newErrors.add1 = "필수 입력 항목입니다.";
    if (!add2) newErrors.add2 = "필수 입력 항목입니다.";
    if (!email) newErrors.email = "필수 입력 항목입니다.";
    if (!tel) newErrors.tel = "필수 입력 항목입니다.";
    if (!checked1) newErrors.checked1 = "필수 체크 항목입니다.";
    if (!checked2) newErrors.checked2 = "필수 체크 항목입니다.";
    if (!duplicationCheck1)
      newErrors.duplicationCheck1 = "중복 확인은 필수입니다.";
    if (!duplicationCheck2)
      newErrors.duplicationCheck2 = "중복 확인은 필수입니다.";
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const userData = {
          id,
          password,
          name,
          birth,
          add1,
          add2,
          email,
          tel,
        };
        const response = await signUp(userData);
        if (response.success) {
          console.log(response); // 회원가입 성공
          // router.push("/");
          setSignupCompleteModalVisible(true);
        } else {
          setErrors({
            ...errors,
            signUp: response.message || "개인 회원가입 실패",
          });
        }
      } catch (error) {
        console.error("개인 회원가입 실패", error); // 회원가입 실패
      }
    }
  };

  const handleDuplicationCheck1 = async () => {
    if (id.trim() === "") {
      setErrors((prev: any) => ({
        ...prev,
        duplicationCheck1: "아이디를 입력하세요.",
      }));
      return;
    }

    try {
      const response = await axios.get(
        `${API_BASE_URL}:3000/api/check-id/${id}`
      );
      if (response.data.duplicated) {
        setErrors((prev: any) => ({
          ...prev,
          duplicationCheck1: "이미 사용 중인 아이디입니다.",
        }));
        setDuplicationCheck1(false);
      } else {
        setErrors((prev: any) => ({
          ...prev,
          duplicationCheck1: null,
        }));
        setDuplicationCheck1(true);
      }
    } catch (error) {
      console.error("아이디 중복 확인 실패:", error);
      setErrors((prev: any) => ({
        ...prev,
        duplicationCheck1: "아이디 중복 확인 중 오류가 발생했습니다.",
      }));
    }
  };

  const handleDuplicationCheck2 = async () => {
    if (email.trim() === "") {
      setErrors((prev: any) => ({
        ...prev,
        duplicationCheck2: "이메일을 입력하세요.",
      }));
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:3000/api/check-email/${email}`
      );
      if (response.data.duplicated) {
        setErrors((prev: any) => ({
          ...prev,
          duplicationCheck2: "이미 사용 중인 이메일입니다.",
        }));
        setDuplicationCheck2(false);
      } else {
        setErrors((prev: any) => ({
          ...prev,
          duplicationCheck2: null,
        }));
        setDuplicationCheck2(true);
      }
    } catch (error) {
      console.error("이메일 중복 확인 실패:", error);
      setErrors((prev: any) => ({
        ...prev,
        duplicationCheck2: "이메일 중복 확인 중 오류가 발생했습니다.",
      }));
    }
  };

  const handlePostcodeComplete = (data) => {
    setPostcode(data.zonecode);
    setAdd1(data.address);
    setPostcodeModalVisible(false);
  };

  const handleCloseSignupCompleteModal = () => {
    setSignupCompleteModalVisible(false);
    router.push("/"); // 로그인 페이지로 이동
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>개인회원가입</Text>

        <Modal
          visible={signupCompleteModalVisible}
          animationType="slide"
          transparent={true}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>회원가입이 완료되었습니다!</Text>
              <TouchableOpacity
                onPress={handleCloseSignupCompleteModal}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>확인</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View style={styles.id}>
          <TextInput
            style={[
              styles.idinput,
              (errors.id || errors.duplicationCheck1) && styles.errorInput,
            ]}
            placeholder="아이디"
            placeholderTextColor="#aaa"
            value={id}
            onChangeText={(text) => {
              setid(text);
              if (text.trim() !== "") {
                setErrors((prev: any) => ({
                  ...prev,
                  id: null,
                  duplicationCheck1: null,
                }));
              }
            }}
          />
          <View
            style={[
              styles.duplicationcheck,
              errors.duplicationCheck1 && styles.errorInput,
            ]}
          >
            <TouchableOpacity onPress={handleDuplicationCheck1}>
              <Text style={styles.checkButton}>중복확인</Text>
            </TouchableOpacity>
          </View>
        </View>
        {duplicationCheck1 && !errors.duplicationCheck1 && (
          <Text style={styles.successText}>사용 가능한 아이디입니다.</Text>
        )}
        {errors.id && <Text style={styles.errorText}>{errors.id}</Text>}
        {errors.duplicationCheck1 && (
          <Text style={styles.errorText}>{errors.duplicationCheck1}</Text>
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
          style={[styles.input, errors.confirmPassword && styles.errorInput]}
          placeholder="비밀번호확인"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
            if (text.trim() !== "") {
              setErrors((prev: any) => ({ ...prev, confirmPassword: null }));
            }
          }}
        />
        {errors.confirmPassword && (
          <Text style={styles.errorText}>{errors.confirmPassword}</Text>
        )}

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
          style={[styles.input, errors.birthdate && styles.errorInput]}
          placeholder="생년월일"
          placeholderTextColor="#aaa"
          value={birth}
          onChangeText={(text) => {
            setBirth(text);
            if (text.trim() !== "") {
              setErrors((prev: any) => ({ ...prev, birth: null }));
            }
          }}
        />
        {errors.birth && <Text style={styles.errorText}>{errors.birth}</Text>}

        <View style={styles.postcode}>
          <TextInput
            style={[
              styles.postcodeinput,
              (errors.postcode || errors.postcode) && styles.postcode,
            ]}
            placeholder="우편번호"
            placeholderTextColor="#aaa"
            value={postcode}
            onChangeText={(text) => {
              setPostcode(text);
              if (text.trim() !== "") {
                setErrors((prev: any) => ({
                  ...prev,
                  postcode: null,
                }));
              }
            }}
          />
          <View style={[styles.postcodesearch]}>
            <TouchableOpacity onPress={() => setPostcodeModalVisible(true)}>
              <Text style={styles.checkButton}>우편번호 찾기</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TextInput
          style={[styles.input, errors.add1 && styles.errorInput]}
          placeholder="주소"
          placeholderTextColor="#aaa"
          value={add1}
          onChangeText={(text) => {
            setAdd1(text);
            if (text.trim() !== "") {
              setErrors((prev: any) => ({ ...prev, add1: null }));
            }
          }}
        />
        {errors.add2 && <Text style={styles.errorText}>{errors.add2}</Text>}
        <TextInput
          style={[styles.input, errors.add2 && styles.errorInput]}
          placeholder="상세주소"
          placeholderTextColor="#aaa"
          value={add2}
          onChangeText={(text) => {
            setAdd2(text);
            if (text.trim() !== "") {
              setErrors((prev: any) => ({ ...prev, add2: null }));
            }
          }}
        />
        {errors.add2 && <Text style={styles.errorText}>{errors.add2}</Text>}

        <TextInput
          style={[styles.input, errors.tel && styles.errorInput]}
          placeholder="전화번호"
          placeholderTextColor="#aaa"
          value={tel}
          onChangeText={(text) => {
            setTel(text);
            if (text.trim() !== "") {
              setErrors((prev: any) => ({ ...prev, tel: null }));
            }
          }}
        />
        {errors.tel && <Text style={styles.errorText}>{errors.tel}</Text>}

        <View style={styles.id}>
          <TextInput
            style={[
              styles.idinput,
              (errors.email || errors.duplicationCheck2) && styles.errorInput,
            ]}
            placeholder="이메일"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (text.trim() !== "") {
                setErrors((prev: any) => ({
                  ...prev,
                  email: null,
                  duplicationCheck2: null,
                }));
              }
            }}
          />
          <View
            style={[
              styles.duplicationcheck,
              errors.duplicationCheck2 && styles.errorInput,
            ]}
          >
            <TouchableOpacity onPress={handleDuplicationCheck2}>
              <Text style={styles.checkButton}>중복확인</Text>
            </TouchableOpacity>
          </View>
        </View>
        {duplicationCheck2 && !errors.duplicationCheck2 && (
          <Text style={styles.successText}>사용 가능한 이메일입니다.</Text>
        )}
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        {errors.duplicationCheck2 && (
          <Text style={styles.errorText}>{errors.duplicationCheck2}</Text>
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

      <Modal
        visible={postcodeModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer2}>
          <View style={styles.modalContent2}>
            <Postcode
              style={{ width: "100%", height: "100%" }}
              jsOptions={{ animation: true }}
              onSelected={handlePostcodeComplete}
            />
            <View>
              <TouchableOpacity
                onPress={() => setPostcodeModalVisible(false)}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>닫기</Text>
              </TouchableOpacity>
            </View>
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
    justifyContent: "center",
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
    justifyContent: "center",
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
  modalText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: "50%",
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
  postcode: {
    flexDirection: "row",
  },
  postcodeinput: {
    borderColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: width * 0.5,
    height: height * 0.055,
  },
  postcodesearch: {
    borderColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: width * 0.3,
    justifyContent: "center",
  },
  modalContainer2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent2: {
    width: width * 0.9,
    height: height * 0.65,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  successText: {
    color: "green",
    alignSelf: "flex-start",
    marginBottom: 10,
    marginLeft: 10,
  },
});

export default PersonalSignUpApp;
