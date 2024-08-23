import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  Picker,
} from "react-native";
import { Calendar } from "react-native-calendars";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FontAwesome6 } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API_BASE_URL from "@/config";

const INITIAL_DATE = new Date().toISOString().split("T")[0];

const ScheduleCalendar = () => {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [markedDates, setMarkedDates] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [currentEditingField, setCurrentEditingField] = useState(null);
  const [workIds, setWorkIds] = useState([]); // 작업자 ID 목록을 저장하는 상태
  const [selectedWorkId, setSelectedWorkId] = useState(""); // 선택된 작업자 ID를 저장하는 상태
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
    fetchWorkIds(); // 작업자 ID 목록을 가져오는 함수 호출
  }, []);

  const fetchWorkIds = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      const response = await axios.get(`${API_BASE_URL}:3000/api/workids`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      });
      setWorkIds(response.data);
    } catch (error) {
      console.error("Error fetching work IDs:", error);
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
      const newMarkedDates = {};

      fetchedSchedules.forEach((schedule) => {
        const startDate = validateDate(schedule.SCH_STARTDATE);
        const endDate = validateDate(schedule.SCH_ENDDATE);

        if (startDate && endDate) {
          if (startDate === endDate) {
            newMarkedDates[startDate] = {
              selected: true,
              color: schedule.COLOR,
              textColor: "white",
            };
          } else {
            let date = startDate;
            while (date <= endDate) {
              newMarkedDates[date] = {
                color: schedule.COLOR,
                textColor: "white",
                startingDay: date === startDate,
                endingDay: date === endDate,
              };
              date = incrementDate(date);
            }
          }
        }
      });

      setMarkedDates(newMarkedDates);
    } catch (error) {
      console.error("Error fetching schedules:", error);
    }
  };

  const validateDate = (dateString) => {
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      return date.toISOString().split("T")[0];
    }
    return null;
  };

  const incrementDate = (dateString) => {
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1);
    return date.toISOString().split("T")[0];
  };

  const onDayPress = useCallback(
    (day) => {
      if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
        setSelectedStartDate(day.dateString);
        setSelectedEndDate(null);
        setMarkedDates({
          [day.dateString]: {
            selected: true,
            startingDay: true,
            color: "#70d7c7",
            textColor: "white",
          },
        });
      } else if (!selectedEndDate) {
        setSelectedEndDate(day.dateString);
        const newMarkedDates = { ...markedDates };
        let date = selectedStartDate;
        while (date <= day.dateString) {
          newMarkedDates[date] = {
            color: "#70d7c7",
            textColor: "white",
            startingDay: date === selectedStartDate,
            endingDay: date === day.dateString,
          };
          date = incrementDate(date);
        }
        setMarkedDates(newMarkedDates);
      }
    },
    [selectedStartDate, selectedEndDate, markedDates]
  );

  const handleDateChange = (event, selectedDate) => {
    if (currentEditingField && selectedDate) {
      const formattedDate = selectedDate.toISOString().split("T")[0];
      setFormData({ ...formData, [currentEditingField]: formattedDate });
    }
    setShowDatePicker(false);
  };

  const openModal = () => {
    if (selectedStartDate && selectedEndDate) {
      setFormData({
        ...formData,
        sch_startdate: selectedStartDate,
        sch_enddate: selectedEndDate,
      });
    } else if (selectedStartDate) {
      setFormData({
        ...formData,
        sch_startdate: selectedStartDate,
        sch_enddate: selectedStartDate,
      });
    }
    setModalVisible(true);
  };

  const handleSave = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      const response = await axios.post(
        `${API_BASE_URL}:3000/api/schedules`,
        {
          ...formData,
          regNum: selectedWorkId, // REG_NUM을 선택된 Work ID로 설정
          workId: selectedWorkId, // 선택된 work_id도 함께 전송
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status === 200) {
        setModalVisible(false);
        fetchSchedules(); // 일정을 새로고침
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
          <FontAwesome6 name="plus" size={18} color="#FFBD00" />
        </TouchableOpacity>
        <Calendar
          current={INITIAL_DATE}
          style={styles.calendar}
          onDayPress={onDayPress}
          markingType={"period"}
          markedDates={markedDates}
          monthFormat={"yyyy년 M월"} // 한국어로 월 표시
          dayNames={["일", "월", "화", "수", "목", "금", "토"]} // 요일 표시
        />
      </View>

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

            <TextInput
              placeholder="이름"
              value={formData.name}
              style={styles.input}
              editable={false}
            />

            <TouchableOpacity
              onPress={() => {
                setCurrentEditingField("sch_startdate");
                setShowDatePicker(true);
              }}
            >
              <TextInput
                placeholder="시작일"
                value={formData.sch_startdate}
                style={styles.input}
                editable={false}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setCurrentEditingField("sch_enddate");
                setShowDatePicker(true);
              }}
            >
              <TextInput
                placeholder="종료일"
                value={formData.sch_enddate}
                style={styles.input}
                editable={false}
              />
            </TouchableOpacity>

            <TextInput
              placeholder="근무 시작 시간"
              value={formData.sch_workstarttime}
              onChangeText={(text) =>
                setFormData({ ...formData, sch_workstarttime: text })
              }
              style={styles.input}
            />

            <TextInput
              placeholder="근무 종료 시간"
              value={formData.sch_workendtime}
              onChangeText={(text) =>
                setFormData({ ...formData, sch_workendtime: text })
              }
              style={styles.input}
            />

            <TextInput
              placeholder="일정 색상"
              value={formData.color}
              onChangeText={(text) => setFormData({ ...formData, color: text })}
              style={styles.input}
            />

            <TextInput
              placeholder="메모"
              value={formData.memo}
              onChangeText={(text) => setFormData({ ...formData, memo: text })}
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

      {showDatePicker && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
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
});

export default ScheduleCalendar;
