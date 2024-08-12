import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { Dimensions, StyleSheet, Text, View, ScrollView } from "react-native";
import { Card, Provider } from "react-native-paper";
import RNPickerSelect from "react-native-picker-select";
import axios from "axios";

const EmployeeList = () => {
  const { width } = Dimensions.get("window");
  const [selectedDate, setSelectedDate] = useState<string>("2024-07");
  const [data, setData] = useState([]);

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
              <Card.Content>
                <View style={styles.row}>
                  <Text style={styles.label}>사원번호:</Text>
                  <Text style={styles.value}>{row.STAFF_NUMBER}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>이름:</Text>
                  <Text style={styles.value}>{row.NAME}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>시급:</Text>
                  <Text style={styles.value}>{row.HOURWAGE}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>입사일:</Text>
                  <Text style={styles.value}>{row.EMPLOY_DATE}</Text>
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

export default EmployeeList;
