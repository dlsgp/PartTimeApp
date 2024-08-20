import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import API_BASE_URL from "@/config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

const Wage = () => {
  const [data, setData] = useState([]);
  const [totalWage, setTotalWage] = useState(0);
  const [totalWorkTime, setTotalWorkTime] = useState(0);
  const [month, setMonth] = useState(new Date());

  useEffect(() => {
    fetchWageData();
  }, [month]);

  const fetchWageData = async () => {
    try {
      const workId = await AsyncStorage.getItem("userId");
      const response = await axios.get(`${API_BASE_URL}:3000/api/wage`, {
        params: {
          month: month.getMonth() + 1,
          year: month.getFullYear(),
          work_id: workId, // work_id로 API 요청
        },
      });

      const commuteData = response.data;

      let totalWage = 0;
      let totalWorkTime = 0;
      const formattedData = commuteData.map((item) => {
        totalWage += item.PAY;
        totalWorkTime += item.WORKTIME;
        return {
          date: formatDate(new Date(item.WORKIN)),
          time: `${formatTime(new Date(item.WORKIN))} - ${formatTime(
            new Date(item.WORKOUT)
          )}`,
          wage: `${item.PAY.toLocaleString()}원`,
        };
      });
      setData(formattedData);
      setTotalWage(totalWage);
      setTotalWorkTime(totalWorkTime);
    } catch (error) {
      console.error("Error fetching wage data:", error);
    }
  };

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const weekDay = ["일", "월", "화", "수", "목", "금", "토"][date.getDay()];
    return `${month}.${day} ${weekDay}`;
  };

  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const handlePreviousMonth = () => {
    setMonth(new Date(month.setMonth(month.getMonth() - 1)));
  };

  const handleNextMonth = () => {
    setMonth(new Date(month.setMonth(month.getMonth() + 1)));
  };

  const getLastDateOfMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        {month.getMonth() + 1}월 총 급여 {totalWage.toLocaleString()}원
      </Text>
      <View style={styles.dateRangeContainer}>
        <TouchableOpacity onPress={handlePreviousMonth}>
          <Ionicons name="chevron-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.dateRangeText}>
          {month.getFullYear()}.
          {(month.getMonth() + 1).toString().padStart(2, "0")}.01 ~{" "}
          {month.getFullYear()}.
          {(month.getMonth() + 1).toString().padStart(2, "0")}.
          {getLastDateOfMonth(month.getFullYear(), month.getMonth())}
        </Text>
        <TouchableOpacity onPress={handleNextMonth}>
          <Ionicons name="chevron-forward-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Text style={styles.totalTimeText}>
        총 근무 시간: {totalWorkTime}분
      </Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {data.map((item, index) => (
          <View key={index} style={styles.listItem}>
            <View style={styles.listItemRow}>
              <Text style={styles.listItemText}>{item.date}</Text>
              <Text style={styles.listItemTime}>{item.time}</Text>
              <View style={styles.wageContainer}>
                {/* <Text style={styles.listItemWorkTime}>
                  {(item.WORKTIME / 60).toFixed(0)}시간 {item.WORKTIME % 60}분
                </Text> */}
                <Text style={styles.listItemWage}>{item.wage}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFBD00",
    marginBottom: 10,
    marginTop: "10%",
  },
  dateRangeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  dateRangeText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  totalTimeText: {
    fontSize: 16,
    color: "#000",
    marginBottom: 10,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  listItem: {
    backgroundColor: "#F6F6F6",
    borderRadius: 10,
    marginBottom: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: "#2E294E",
  },
  listItemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  listItemText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2E294E",
  },
  listItemTime: {
    fontSize: 16,
    color: "#2E294E",
  },
  wageContainer: {
    alignItems: "flex-end",
  },
  listItemWage: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2E294E",
  },
  listItemWorkTime: {
    fontSize: 14,
    color: "#2E294E",
  },
});

export default Wage;
