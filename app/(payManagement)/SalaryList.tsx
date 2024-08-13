import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { Dimensions, StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal } from "react-native";
import { Card, Provider } from "react-native-paper";
import RNPickerSelect from "react-native-picker-select";
import axios from "axios";
import { FontAwesome } from "@expo/vector-icons";
import SalaryForm from "./SalaryForm"; // 모달로 띄울 SalaryForm

const SalaryList = () => {
  const { width } = Dimensions.get("window");
  const [selectedDate, setSelectedDate] = useState<string>("2024-07");
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const fetchData = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      const response = await axios.get(`http://localhost:3000/api/salary`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      });
      setData(response.data);
    } catch (error) {
      console.error("데이터 가져오기 오류:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedDate]);

  const openModal = (card) => {
    setSelectedCard(card);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedCard(null);
    fetchData(); // 데이터 재조회
  };

  return (
    <Provider>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <RNPickerSelect
            onValueChange={(value) => setSelectedDate(value)}
            items={[
              { label: "2024-05", value: "2024-05" },
              { label: "2024-06", value: "2024-06" },
              { label: "2024-07", value: "2024-07" },
              { label: "2024-08", value: "2024-08" },
              { label: "2024-09", value: "2024-09" },
              { label: "2024-10", value: "2024-10" },
            ]}
            value={selectedDate}
            style={pickerSelectStyles}
          />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {data.map((row, index) => (
            <Card style={styles.card} key={index}>
              <TouchableOpacity style={styles.iconButton} onPress={() => openModal(row)}>
                <FontAwesome name="cog" size={24} color="black" />
              </TouchableOpacity>
              <Card.Content style={styles.cardContent}>
                <View style={styles.row}>
                  <Text style={styles.label}>번호:</Text>
                  <Text style={styles.value}>{row.REG_NUM}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>사원번호:</Text>
                  <Text style={styles.value}>{row.STAFF_NUMBER || "N/A"}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>이름:</Text>
                  <Text style={styles.value}>{row.NAME}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>시급:</Text>
                  <Text style={styles.value}>{row.HOURWAGE || "N/A"}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>4대보험유무:</Text>
                  <Text style={styles.value}>{row.INSURANCE === 1 ? "아니요" : "예"}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>기타:</Text>
                  <Text style={styles.value}>{row.ETC || "N/A"}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>총 근무시간:</Text>
                  <Text style={styles.value}>{row.WORKTIME || "N/A"}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>전체급여:</Text>
                  <Text style={styles.value}>{row.PAY || "N/A"}</Text>
                </View>
              </Card.Content>
            </Card>
          ))}
        </ScrollView>

        {/* 모달 컴포넌트 */}
        <Modal
          visible={modalVisible}
          animationType="slide"
          onRequestClose={closeModal}
        >
          <SalaryForm selectedCard={selectedCard} onClose={closeModal} />
        </Modal>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  card: {
    marginBottom: 15,
    borderRadius: 10,
    elevation: 3,
    position: "relative",
  },
  cardContent: {
    paddingTop: 10, // 패딩 추가로 아이콘과의 겹침 방지
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  label: {
    fontWeight: "bold",
    color: "#333",
  },
  value: {
    color: "#555",
  },
  iconButton: {
    alignSelf: 'flex-end',
    top: 10,
    right: 10,
    marginBottom: 10,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "gray",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
  },
});

export default SalaryList;
