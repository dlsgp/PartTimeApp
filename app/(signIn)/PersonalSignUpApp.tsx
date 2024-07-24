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
  Modal,
  ScrollView,
} from "react-native";
import { Checkbox } from "react-native-paper";
import PrivacyPolicy from "./PrivacyPolicy";
import ServiceTerms from "./ServiceTerm";

const { width, height } = Dimensions.get("window");

const PersonalSignUpApp: React.FC = () => {
  const [checked0, setChecked0] = React.useState(false);
  const [checked1, setChecked1] = React.useState(false);
  const [checked2, setChecked2] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalContent, setModalContent] = React.useState<React.ReactNode>(null);

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

  const openModal = (content: React.ReactNode) => {
    setModalContent(content);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>개인회원가입</Text>

      <View style={styles.id}>
      <TextInput
        style={styles.idinput}
        placeholder="아이디"
        placeholderTextColor="#aaa"
      />
      <View style={styles.duplicationcheck}>
      <TouchableOpacity >
        <Text style={styles.checkButton}>중복확인</Text>
      </TouchableOpacity>
      </View>
      </View>

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
          onPress={() => {
            setChecked1(!checked1);
          }}
          color="#f0a500"
        />
        <TouchableOpacity onPress={() => openModal(<ServiceTerms />)}>
          <View style={styles.labelContainer}>
            <Text style={styles.labelwarning}>[필수]</Text>
            <Text style={styles.label}>서비스 이용약관 동의</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.checkboxContainer}>
        <Checkbox
          status={checked2 ? "checked" : "unchecked"}
          onPress={() => {
            setChecked2(!checked2);
          }}
          color="#f0a500"
        />
        <TouchableOpacity onPress={() => openModal(<PrivacyPolicy />)}>
          <View style={styles.labelContainer}>
            <Text style={styles.labelwarning}>[필수]</Text>
            <Text style={styles.label}>개인정보 수집 및 이용 동의</Text>
          </View>
        </TouchableOpacity>
      </View>
      </View>

      <TouchableOpacity style={styles.signupButton}>
        <Text style={styles.signupButtonText}>회원가입</Text>
      </TouchableOpacity>
      </ScrollView>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView showsVerticalScrollIndicator={false}>{modalContent}</ScrollView>
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
    marginBottom: 60,
    textAlign: "center",
    fontWeight: 'bold',
  },
  id: {
    flexDirection: 'row',
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
  },
  signupButtonText: {
    color: "#fff",
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
});

export default PersonalSignUpApp;