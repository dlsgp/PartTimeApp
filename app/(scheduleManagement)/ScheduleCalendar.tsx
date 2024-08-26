import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
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
  const [sortCriteria, setSortCriteria] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc"); // 오름차순이 기본값
  const [formData, setFormData] = useState({
    scheduleNum: "",
    name: "",
    sch_startdate: "",
    sch_enddate: "",
    sch_workstarttime: "",
    sch_workendtime: "",
    sch_reststarttime: "",
    sch_restendtime: "",
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
        const color = schedule[9] || "#50cebb"; // COLOR, 디폴트 컬러 사용

        if (!startDate || !endDate) {
          console.warn(
            "Skipping schedule due to invalid date range:",
            schedule
          );
          return;
        }

        let date = startDate;
        while (new Date(date) <= new Date(endDate)) {
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
            newMarkedDates[date].periods.push({
              color: color,
              startingDay: date === startDate,
              endingDay: date === endDate,
            });
          }

          date = incrementDate(date);
        }
      });

      setMarkedDates(newMarkedDates);
    } catch (error) {
      console.error("Error fetching schedules:", error);
    }
  };

  const validateDate = (dateString) => {
    if (!dateString || dateString === "null") {
      return null;
    }

    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
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
      return dateString;
    }

    date.setUTCDate(date.getUTCDate() + 1);
    return date.toISOString().split("T")[0];
  };

  const openModal = () => {
    setFormData({
      name: "",
      sch_startdate: "",
      sch_enddate: "",
      sch_workstarttime: "",
      sch_workendtime: "",
      sch_reststarttime: "",
      sch_restendtime: "",
      color: "",
      memo: "",
      scheduleNum: "",
    });
    setSelectedWorkId("");
    setModalVisible(true);
  };

  const toggleDatePicker1 = () => {
    setShowDatePicker1(!showDatePicker1);
  };

  const toggleDatePicker2 = () => {
    setShowDatePicker2(!showDatePicker2);
  };

  const handleChange1 = (selectedDate) => {
    const formattedDate = formatDateToInput(selectedDate);
    setFormData({ ...formData, sch_startdate: formattedDate });
    toggleDatePicker1();
  };

  const handleChange2 = (selectedDate) => {
    const formattedDate = formatDateToInput(selectedDate);
    setFormData({ ...formData, sch_enddate: formattedDate });
    toggleDatePicker2();
  };

  const handleSave1 = async () => {
    try {
      const formattedStartDate = formData.sch_startdate.replace(/\//g, "-");
      const formattedEndDate = formData.sch_enddate.replace(/\//g, "-");

      const accessToken = await AsyncStorage.getItem("accessToken");
      const response = await axios.post(
        `${API_BASE_URL}:3000/api/schedules`,
        {
          ...formData,
          sch_startdate: formattedStartDate,
          sch_enddate: formattedEndDate,
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

  const handleSave2 = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");

      const response = await axios.put(
        `${API_BASE_URL}:3000/api/schedules/${formData.scheduleNum}`,
        {
          ...formData,
          sch_startdate: formData.sch_startdate.replace(/\//g, "-"),
          sch_enddate: formData.sch_enddate.replace(/\//g, "-"),
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
      console.error("Error updating schedule:", error);
    }
  };

  const handleSave = () => {
    if (formData.scheduleNum) {
      handleSave2();
    } else {
      handleSave1();
    }
  };

  const openEditModal = (item) => {
    setFormData({
      scheduleNum: item[0],
      name: item[3],
      sch_startdate: formatDateToInput(item[4]),
      sch_enddate: formatDateToInput(item[5]),
      sch_workstarttime: item[6],
      sch_workendtime: item[7],
      sch_reststarttime: item[11],
      sch_restendtime: item[12],
      color: item[9],
      memo: item[10],
    });
    setSelectedWorkId(item[13]);
    setModalVisible(true);
  };

  const getModalTitle = () => {
    return formData.scheduleNum ? "일정 수정" : "일정 추가";
  };

  const formatDateToInput = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const toggleSortCriteria = (criteria) => {
    if (sortCriteria === criteria) {
      // 동일한 기준을 다시 누르면 정렬 방향을 토글
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // 새로운 기준을 누르면 오름차순으로 시작
      setSortCriteria(criteria);
      setSortOrder("asc");
    }
  };

  const sortedSchedules = [...schedules].sort((a, b) => {
    let valueA, valueB;

    if (sortCriteria === "name") {
      valueA = a[3].toLowerCase();
      valueB = b[3].toLowerCase();
    } else if (sortCriteria === "date") {
      valueA = new Date(a[4]);
      valueB = new Date(b[4]);
    }

    if (valueA < valueB) {
      return sortOrder === "asc" ? -1 : 1;
    }
    if (valueA > valueB) {
      return sortOrder === "asc" ? 1 : -1;
    }
    return 0;
  });

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
          onDayPress={() => {}}
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

      <View style={styles.sortContainer}>
        <TouchableOpacity
          style={styles.sortButton}
          onPress={() => toggleSortCriteria("name")}
        >
          <Text style={styles.sortButtonText}>
            이름별 {sortCriteria === "name" && sortOrder === "asc" ? "▲" : "▼"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sortButton}
          onPress={() => toggleSortCriteria("date")}
        >
          <Text style={styles.sortButtonText}>
            날짜별 {sortCriteria === "date" && sortOrder === "asc" ? "▲" : "▼"}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        style={styles.cardlist}
        data={sortedSchedules}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item[0].toString()}
        renderItem={({ item }) => {
          const workStartDate = new Date(item[4]);
          workStartDate.setDate(workStartDate.getDate() + 1);
          const workStartDateString = workStartDate.toISOString().split("T")[0];

          const workEndDate = new Date(item[5]);
          workEndDate.setDate(workEndDate.getDate() + 1);
          const workEndDateString = workEndDate.toISOString().split("T")[0];

          return (
            <TouchableOpacity
              onPress={() => openEditModal(item)}
              style={[styles.scheduleCard, { borderColor: item[9] }]}
            >
              <Text style={styles.cardText}>이름: {item[3]}</Text>
              <Text style={styles.cardText}>
                근무 날짜: {workStartDateString} ~ {workEndDateString}
              </Text>
              <Text style={styles.cardText}>
                근무 시간: {item[6]} - {item[7]}
              </Text>
              <Text style={styles.cardText}>
                휴게 시간: {item[11]} - {item[12]}
              </Text>
              <Text style={styles.cardText}>메모: {item[10]}</Text>
            </TouchableOpacity>
          );
        }}
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
              <Text style={styles.modaltitle}>{getModalTitle()}</Text>

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
                  placeholder="근무 시작일"
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
                  placeholder="근무 종료일"
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
                placeholder="휴게 시작 시간 (예: 12:00)"
                value={formData.sch_reststarttime}
                onChangeText={(text) =>
                  setFormData({ ...formData, sch_reststarttime: text })
                }
                style={styles.input}
              />

              <TextInput
                placeholder="휴게 종료 시간 (예: 12:30)"
                value={formData.sch_restendtime}
                onChangeText={(text) =>
                  setFormData({ ...formData, sch_restendtime: text })
                }
                style={styles.input}
              />

              <Text style={styles.color}>일정 색상</Text>
              <Picker
                selectedValue={formData.color}
                onValueChange={(color) => setFormData({ ...formData, color })}
                style={styles.picker}
              >
                <Picker.Item label="빨간색" value="#EF9A9A" />
                <Picker.Item label="파란색" value="#90CAF9" />
                <Picker.Item label="초록색" value="#A5D6A7" />
                <Picker.Item label="노란색" value="#FFF59D" />
                <Picker.Item label="보라색" value="#CE93D8" />
                <Picker.Item label="주황색" value="#FFCC80" />
                <Picker.Item label="남색" value="#9FA8DA" />
              </Picker>

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
  sortContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    // marginTop: 10,
    marginBottom: 10,
  },
  sortButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#FFBD00",
    borderRadius: 5,
    height: 30,
    justifyContent: 'center',
  },
  sortButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
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
    borderWidth: 1,
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
    height: 35,
    width: "100%",
    marginBottom: 20,
    marginTop: 5,
  },
  color: {
    alignSelf: "flex-start",
    marginLeft: 5,
    marginVertical: 10,
  },
  modaltitle: {
    fontWeight: "bold",
    marginBottom: 15,
  },
  TextIcon: {
    flexDirection: "row",
    width: "100%",
    marginVertical: 5,
  },
  formcontainerIcon: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    padding: 5,
    marginRight: -10,
    width: "90%",
  },
  calendarButton: {
    marginLeft: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    padding: 5,
    width: 40,
  },
});

export default ScheduleCalendar;
