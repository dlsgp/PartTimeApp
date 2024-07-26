import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Modal,
  ScrollView,
  SafeAreaView,
} from "react-native";

const { width, height } = Dimensions.get("window");

const SignUpManagement = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<"accept" | "reject">("accept");
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const data = [
    {
      num: 1,
      staffNum: "1",
      name: "홍길동",
      tel: "010-2222-3333",
      email: "as2d2@gmail.com",
    },
    {
      num: 2,
      staffNum: "2",
      name: "김나나",
      tel: "010-3232-3313",
      email: "bffagarf@gmail.com",
    },
    {
      num: 3,
      staffNum: "3",
      name: "이미미",
      tel: "010-2442-3213",
      email: "daweqweq@naver.com",
    },
    {
      num: 4,
      staffNum: "4",
      name: "박니니",
      tel: "010-6252-3311",
      email: "a2ffff2@gmail.com",
    },
    {
      num: 5,
      staffNum: "5",
      name: "강리리",
      tel: "010-6622-9933",
      email: "aasqrqr@icloud.com",
    },
    {
      num: 6,
      staffNum: "6",
      name: "도디디",
      tel: "010-1242-3352",
      email: "asafg2@gmail.com",
    },
  ];

  const handleAcceptPress = (user: any) => {
    setSelectedUser(user);
    setModalType("accept");
    setModalVisible(true);
  };

  const handleRejectPress = (user: any) => {
    setSelectedUser(user);
    setModalType("reject");
    setModalVisible(true);
  };

  const handleConfirm = () => {
    if (modalType === "accept") {
      // 수락 처리 로직
    } else {
      // 거절 처리 로직
    }
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text>가입 관리</Text>
        {data.map((row) => (
          <View key={row.num} style={styles.card}>
            <View style={styles.cardRow}>
              <Text style={styles.cardText}>번호: {row.staffNum}</Text>
            </View>
            <Text style={styles.cardText}>이름: {row.name}</Text>
            <Text style={styles.cardText}>전화번호: {row.tel}</Text>
            <View style={styles.iconRow}>
              <Text style={styles.cardText}>이메일: {row.email}</Text>
            </View>
            <View style={styles.cardbutton}>
              <TouchableOpacity
                style={styles.button1}
                onPress={() => handleAcceptPress(row)}
              >
                <Text style={styles.buttonText}>수락</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button2}
                onPress={() => handleRejectPress(row)}
              >
                <Text style={styles.buttonText}>거절</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {selectedUser && (
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>{selectedUser.name}</Text>
              <Text style={styles.modalText}>
                {modalType === "accept"
                  ? "수락하시겠습니까?"
                  : "거절하시겠습니까?"}
              </Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={handleConfirm}
                >
                  <Text style={styles.modalButtonText}>확인</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.modalButtonText}>취소</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: "15%",
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: "#fff",
    marginBottom: 10,
    padding: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    elevation: 2,
    width: '100%',
    alignSelf: 'stretch',
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconRow: {
    flexDirection: "row",
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
    alignSelf: "flex-start",
  },
  cardbutton: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  button1: {
    backgroundColor: "#f0a500",
    marginTop: 10,
    width: 50,
    height: 30,
    borderRadius: 5,
    marginRight: 20,
  },
  button2: {
    backgroundColor: "#ccc",
    marginTop: 10,
    width: 50,
    height: 30,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 15,
    textAlign: "center",
    marginTop: 4,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: width * 0.8,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    backgroundColor: "#2E294E",
    padding: 10,
    borderRadius: 5,
    width: "45%",
    alignItems: "center",
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default SignUpManagement;
