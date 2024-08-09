import React, { useState, useEffect } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { Icon } from "react-native-elements";
import { Card, Provider } from "react-native-paper";
import RNPickerSelect from "react-native-picker-select";
import axios from "axios";

const SalaryList = () => {
  const { width } = Dimensions.get("window");
  const [selectedDate, setSelectedDate] = useState<string>("2024-07");
  const [selectedWorkTimes, setSelectedWorkTimes] = useState<string>("");
  const [showPicker, setShowPicker] = useState(false);
  const [data, setData] = useState([]);
  const [staffNum, setStaffNum] = useState("100401"); // 예제 staffNum

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/salary/${staffNum}`);
        setData([response.data]); // 데이터를 배열로 설정
      } catch (error) {
        console.error("데이터 가져오기 오류:", error);
      }
    };
    fetchData();
  }, [staffNum]);

  const togglePicker = () => {
    setShowPicker(!showPicker);
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
          <Icon
            name="settings"
            type="feather"
            size={24}
            style={styles.settingsIcon}
          />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {data.map((row, index) => (
            <Card style={styles.card} key={index}>
              <Card.Content>
                <View style={styles.row}>
                  <Text style={styles.label}>번호:</Text>
                  <Text style={styles.value}>{index + 1}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>사원 번호:</Text>
                  <Text style={styles.value}>{row.staffNum}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>이름:</Text>
                  <Text style={styles.value}>{row.name}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>시급:</Text>
                  <Text style={styles.value}>{row.hourWage}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>4대보험유무:</Text>
                  <Text style={styles.value}>{row.insurance}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>주휴수당:</Text>
                  <Text style={styles.value}>{row.holiday_pay}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>기타:</Text>
                  <Text style={styles.value}>{row.etc}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>근무시간:</Text>
                  <Text style={styles.value}>{row.workTime}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>전체급여:</Text>
                  <Text style={styles.value}>{row.pay}</Text>
                </View>
              </Card.Content>
            </Card>
          ))}
        </ScrollView>
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
  settingsIcon: {
    marginRight: 10,
  },
  card: {
    marginBottom: 15,
    borderRadius: 10,
    elevation: 3,
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
