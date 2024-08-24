import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
  Platform,
  Picker,
} from "react-native";
import { Calendar } from "react-native-calendars";
import DatePicker from "../(staffLayout)/ModalCalendar";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API_BASE_URL from "@/config";

const INITIAL_DATE = new Date().toISOString().split("T")[0];

const ScheduleCalendar = () => {
  const [markedDates, setMarkedDates] = useState({});
  const [schedules, setSchedules] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [showDatePicker1, setShowDatePicker1] = useState(false);
  const [showDatePicker2, setShowDatePicker2] = useState(false);
  const [workIds, setWorkIds] = useState([]);
  const [selectedWorkId, setSelectedWorkId] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    sch_startdate: "",
    sch_enddate: "",
    sch_workstarttime: "",
    sch_workendtime: "",
    color: "",
    memo: "",
  });

  useEffect(() => {
    fetchSchedules();
    fetchWorkIds();
  }, []);

  const fetchWorkIds = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      const response = await axios.get(`${API_BASE_URL}:3000/api/work-ids`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      });

      const structuredData = response.data.map((item) => ({
        work_id: item[0],
        name: item[1],
      }));

      console.log("Structured Work IDs:", structuredData);
      setWorkIds(structuredData);
    } catch (error) {
      console.error("Error fetching work ids:", error);
    }
  };

  const fetchSchedules = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      const response = await axios.get(`${API_BASE_URL}:3000/api/schedules`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      });

      const fetchedSchedules = response.data;
      setSchedules(fetchedSchedules);

      const newMarkedDates = {};

      fetchedSchedules.forEach((schedule) => {
        const startDate = validateDate(schedule[4]); // SCH_STARTDATE
        const endDate = validateDate(schedule[5]); // SCH_ENDDATE
        const color = schedule[7] || "#50cebb"; // COLOR, 디폴트 컬러 사용

        if (!startDate || !endDate) {
          console.warn(
            "Skipping schedule due to invalid date range:",
            schedule
          );
          return;
        }

        // Period Marking for the schedule
        let date = startDate;
        while (date <= endDate) {
          if (!newMarkedDates[date]) {
            newMarkedDates[date] = {
              periods: [
                {
                  color: color,
                  startingDay: date === startDate,
                  endingDay: date === endDate,
                },
              ],
              marked: true,
              textColor: "white",
            };
          } else {
            // Multi-Period 처리
            newMarkedDates[date].periods.push({
              color: color,
              startingDay: date === startDate,
              endingDay: date === endDate,
            });
          }

          date = incrementDate(date);
        }

        console.log("Marked Dates Structure:", newMarkedDates);
      });

      setMarkedDates(newMarkedDates);
    } catch (error) {
      console.error("Error fetching schedules:", error);
    }
  };

  const validateDate = (dateString) => {
    if (!dateString || dateString === "null") {
      console.error("Invalid date string:", dateString);
      return null;
    }

    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      console.error("Invalid date object:", dateString);
      return null;
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const incrementDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      console.error("Invalid date for incrementing:", dateString);
      return dateString;
    }

    date.setUTCDate(date.getUTCDate() + 1);
    return date.toISOString().split("T")[0];
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const toggleDatePicker1 = () => {
    setShowDatePicker1(!showDatePicker1);
  };

  const toggleDatePicker2 = () => {
    setShowDatePicker2(!showDatePicker2);
  };

  const handleChange1 = (selectedDate) => {
    const formattedDate = validateDate(selectedDate.toISOString());
    setFormData({ ...formData, sch_startdate: formattedDate });
    toggleDatePicker1();
  };

  const handleChange2 = (selectedDate) => {
    const formattedDate = validateDate(selectedDate.toISOString());
    setFormData({ ...formData, sch_enddate: formattedDate });
    toggleDatePicker2();
  };

  const handleSave = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      const response = await axios.post(
        `${API_BASE_URL}:3000/api/schedules`,
        {
          ...formData,
          regNum: selectedWorkId,
          workId: selectedWorkId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status === 200) {
        setModalVisible(false);
        fetchSchedules();
      }
    } catch (error) {
      console.error("Error saving schedule:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.calendarContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={openModal}
          style={styles.button}
        >
          <FontAwesome name="plus" size={18} color="#FFBD00" />
        </TouchableOpacity>
        <Calendar
          current={INITIAL_DATE}
          style={styles.calendar}
          markingType={"multi-period"}
          markedDates={markedDates}
          monthFormat={"yyyy년 M월"}
          dayNames={["일", "월", "화", "수", "목", "금", "토"]}
          onDayPress={() => {}} // 날짜 선택 비활성화
          theme={{
            "stylesheet.calendar.header": {
              dayTextAtIndex0: {
                color: "#D30505",
              },
              dayTextAtIndex6: {
                color: "#7FB3FA",
              },
            },
          }}
        />
      </View>

      <FlatList
        style={styles.cardlist}
        data={schedules}
        keyExtractor={(item) => item[0].toString()}
        renderItem={({ item }) => (
          <View style={styles.scheduleCard}>
            <Text style={styles.cardText}>이름: {item[3]}</Text>
            <Text style={styles.cardText}>근무 시작 시간: {item[4]}</Text>
            <Text style={styles.cardText}>근무 종료 시간: {item[5]}</Text>
            <Text style={styles.cardText}>휴게 시작 시간: {item[6]}</Text>
            <Text style={styles.cardText}>휴게 종료 시간: {item[7]}</Text>
          </View>
        )}
      />

      {modalVisible && (
        <Modal
          visible={modalVisible}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
          transparent={true}
        >
          <View style={styles.modalWrapper}>
            <View style={styles.modalContent}>
              <Text>일정 추가</Text>

              <Picker
                selectedValue={selectedWorkId}
                onValueChange={(itemValue) => {
                  setSelectedWorkId(itemValue);
                  const selectedName = workIds.find(
                    (work) => work.work_id === itemValue
                  )?.name;
                  setFormData({ ...formData, name: selectedName });
                }}
                style={styles.picker}
              >
                {workIds.length > 0 ? (
                  workIds.map((work) => (
                    <Picker.Item
                      key={work.work_id}
                      label={work.name}
                      value={work.work_id}
                    />
                  ))
                ) : (
                  <Picker.Item label="No data available" value="" />
                )}
              </Picker>

              <View style={styles.TextIcon}>
                <TextInput
                  style={styles.formcontainerIcon}
                  placeholder="시작일"
                  value={formData.sch_startdate}
                  editable={false}
                />
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={toggleDatePicker1}
                  style={styles.calendarButton}
                >
                  <FontAwesome name="calendar-o" size={20} color="e5e5e5" />
                </TouchableOpacity>
                {showDatePicker1 && (
                  <DatePicker
                    mode="date"
                    date={new Date(formData.sch_startdate || INITIAL_DATE)}
                    onDateChange={handleChange1}
                  />
                )}
              </View>

              <View style={styles.TextIcon}>
                <TextInput
                  style={styles.formcontainerIcon}
                  placeholder="종료일"
                  value={formData.sch_enddate}
                  editable={false}
                />
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={toggleDatePicker2}
                  style={styles.calendarButton}
                >
                  <FontAwesome name="calendar-o" size={20} color="e5e5e5" />
                </TouchableOpacity>
                {showDatePicker2 && (
                  <DatePicker
                    mode="date"
                    date={new Date(formData.sch_enddate || INITIAL_DATE)}
                    onDateChange={handleChange2}
                  />
                )}
              </View>

              <TextInput
                placeholder="근무 시작 시간 (예: 09:00)"
                value={formData.sch_workstarttime}
                onChangeText={(text) =>
                  setFormData({ ...formData, sch_workstarttime: text })
                }
                style={styles.input}
              />

              <TextInput
                placeholder="근무 종료 시간 (예: 18:00)"
                value={formData.sch_workendtime}
                onChangeText={(text) =>
                  setFormData({ ...formData, sch_workendtime: text })
                }
                style={styles.input}
              />

              <TextInput
                placeholder="일정 색상"
                value={formData.color}
                onChangeText={(text) =>
                  setFormData({ ...formData, color: text })
                }
                style={styles.input}
              />

              <TextInput
                placeholder="메모"
                value={formData.memo}
                onChangeText={(text) =>
                  setFormData({ ...formData, memo: text })
                }
                style={styles.input}
              />

              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button2} onPress={handleSave}>
                  <Text style={styles.buttonText}>저장</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button2}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.buttonText}>취소</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  calendarContainer: {
    width: "100%",
    borderRadius: 10,
    overflow: "hidden",
    elevation: 3,
    borderWidth: 0,
    paddingBottom: "10%",
  },
  calendar: {
    flex: 1,
    alignSelf: "center",
    marginTop: 10,
    width: "100%",
    height: "100%",
  },
  button: {
    alignSelf: "flex-end",
    padding: 10,
    borderRadius: 5,
    marginRight: "4%",
  },
  scheduleCard: {
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    marginVertical: 5,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  cardText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  cardlist: {
    maxHeight: 300,
    width: "90%",
  },
  modalWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  input: {
    marginVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    padding: 5,
    width: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  button2: {
    marginLeft: "20%",
    marginRight: "20%",
    width: 110,
    height: 34,
    borderRadius: 30,
    backgroundColor: "#2E294E",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "10%",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },
  picker: {
    height: 50,
    width: "100%",
    marginBottom: 20,
  },
  TextIcon: {
    flexDirection: "row",
    alignItems: "center",
  },
  formcontainerIcon: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    padding: 5,
  },
  calendarButton: {
    marginLeft: 10,
  },
});

export default ScheduleCalendar;
