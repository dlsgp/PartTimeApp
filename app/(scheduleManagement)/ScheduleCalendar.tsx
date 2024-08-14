// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   Modal,
//   TouchableOpacity,
//   StyleSheet,
//   TextInput,
//   Button,
// } from "react-native";
// import { Calendar } from "react-native-calendars";
// import { Picker } from "@react-native-picker/picker";
// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import API_BASE_URL from "@/config";

// const ScheduleCalendar = () => {
//   const [markedDates, setMarkedDates] = useState({});
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [workIds, setWorkIds] = useState([]);
//   const [selectedWorkId, setSelectedWorkId] = useState("");
//   const [formData, setFormData] = useState({
//     name: "",
//     sch_worktime: "",
//     sch_resttime: "",
//     color: "",
//     memo: "",
//     restdate: "",
//   });

//   useEffect(() => {
//     fetchSchedules();
//     fetchWorkIds();
//   }, []);

//   const fetchSchedules = async () => {
//     try {
//       const accessToken = await AsyncStorage.getItem("accessToken");
//       const response = await axios.get(`${API_BASE_URL}:3000/api/schedules`, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//         withCredentials: true,
//       });
//       const fetchedData = response.data;
//       const newMarkedDates = {};
//       fetchedData.forEach((schedule) => {
//         newMarkedDates[schedule.SCH_WORKDATE] = {
//           marked: true,
//           dotColor: schedule.COLOR,
//         };
//       });
//       setMarkedDates(newMarkedDates);
//     } catch (error) {
//       console.error("Error fetching schedules:", error);
//     }
//   };

//   const fetchWorkIds = async () => {
//     try {
//       const accessToken = await AsyncStorage.getItem("accessToken");
//       const response = await axios.get(`${API_BASE_URL}:3000/api/work-ids`, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//         withCredentials: true,
//       });

//       // 서버로부터 받은 데이터가 2차원 배열이므로 이를 적절히 구조화합니다.
//       const structuredData = response.data.map((item) => ({
//         work_id: item[0], // 첫 번째 요소는 work_id
//         name: item[1], // 두 번째 요소는 name
//       }));

//       console.log("Structured Work IDs:", structuredData); // 콘솔에 데이터 구조를 확인합니다.
//       setWorkIds(structuredData); // structuredData를 사용하여 상태를 업데이트합니다.
//     } catch (error) {
//       console.error("Error fetching work ids:", error);
//     }
//   };

//   const openModal = (date) => {
//     setSelectedDate(date);
//     setFormData({
//       ...formData,
//       sch_workdate: date,
//     });
//     setModalVisible(true);
//   };

//   const handleSave = async () => {
//     try {
//       const accessToken = await AsyncStorage.getItem("accessToken");
//       const response = await axios.post(
//         `${API_BASE_URL}:3000/api/schedules`,
//         {
//           ...formData,
//           workId: selectedWorkId, // 선택된 work_id도 함께 전송
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );
//       if (response.status === 200) {
//         setModalVisible(false);
//         fetchSchedules(); // 일정을 새로고침
//       }
//     } catch (error) {
//       console.error("Error saving schedule:", error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.calendarContainer}>
//         <Calendar
//           onDayPress={(day) => openModal(day.dateString)}
//           markedDates={markedDates}
//           style={styles.calendar} // 중앙에 위치시키기 위해 스타일 추가
//         />
//       </View>
//       <Modal
//         visible={modalVisible}
//         animationType="slide"
//         onRequestClose={() => setModalVisible(false)}
//         transparent={true} // 모달을 투명하게 만들어 배경을 볼 수 있게 함
//       >
//         <View style={styles.modalWrapper}>
//           <View style={styles.modalContent}>
//             <Text>일정 추가</Text>

//             <Picker
//               selectedValue={selectedWorkId}
//               onValueChange={(itemValue) => {
//                 setSelectedWorkId(itemValue);
//                 const selectedName = workIds.find(
//                   (work) => work.work_id === itemValue
//                 )?.name;
//                 setFormData({ ...formData, name: selectedName });
//               }}
//               style={styles.picker}
//             >
//               {workIds.length > 0 ? (
//                 workIds.map((work) => (
//                   <Picker.Item
//                     key={work.work_id} // 고유한 key 값으로 work_id 사용
//                     label={work.name} // label로 name 사용
//                     value={work.work_id} // value로 work_id 사용
//                   />
//                 ))
//               ) : (
//                 <Picker.Item label="No data available" value="" />
//               )}
//             </Picker>

//             <TextInput
//               placeholder="이름"
//               value={formData.name}
//               onChangeText={(text) => setFormData({ ...formData, name: text })}
//               style={styles.input}
//               editable={false} // 이름은 수정 불가 (자동 채워짐)
//             />
//             <TextInput
//               placeholder="근무시간"
//               value={formData.sch_worktime}
//               onChangeText={(text) =>
//                 setFormData({ ...formData, sch_worktime: text })
//               }
//               style={styles.input}
//             />
//             <TextInput
//               placeholder="휴게시간"
//               value={formData.sch_resttime}
//               onChangeText={(text) =>
//                 setFormData({ ...formData, sch_resttime: text })
//               }
//               style={styles.input}
//             />
//             <TextInput
//               placeholder="일정 색상"
//               value={formData.color}
//               onChangeText={(text) => setFormData({ ...formData, color: text })}
//               style={styles.input}
//             />
//             <TextInput
//               placeholder="메모"
//               value={formData.memo}
//               onChangeText={(text) => setFormData({ ...formData, memo: text })}
//               style={styles.input}
//             />
//             <View style={styles.buttonContainer}>
//               <TouchableOpacity style={styles.button} onPress={handleSave}>
//                 <Text>저장</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={styles.button}
//                 onPress={() => setModalVisible(false)}
//               >
//                 <Text>취소</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center", // 세로 중앙 정렬
//     alignItems: "center", // 가로 중앙 정렬
//     backgroundColor: "#fff",
//   },
//   calendarContainer: {
//     width: "100%",
//     borderRadius: 10,
//     overflow: "hidden",
//     elevation: 3,
//     borderWidth: 0,
//   },
//   calendar: {
//     width: "100%",
//     borderRadius: 10,
//     elevation: 5,
//   },
//   modalWrapper: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0,0,0,0.5)", // 배경을 어둡게
//   },
//   modalContent: {
//     width: "80%",
//     padding: 20,
//     backgroundColor: "white",
//     borderRadius: 10,
//     alignItems: "center",
//   },
//   picker: {
//     height: 50,
//     width: "100%",
//     marginVertical: 10,
//   },
//   input: {
//     marginVertical: 10,
//     borderBottomWidth: 1,
//     borderColor: "#ccc",
//     padding: 5,
//     width: "100%",
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//   },
//   button: {
//     marginLeft: "20%",
//     marginRight: "20%",
//   },
// });

// export default ScheduleCalendar;

// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   Modal,
//   TouchableOpacity,
//   StyleSheet,
//   TextInput,
// } from "react-native";
// import { Calendar } from "react-native-calendars";
// import { Picker } from "@react-native-picker/picker";
// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { FontAwesome6 } from "@expo/vector-icons";
// import API_BASE_URL from "@/config";

// const ScheduleCalendar = () => {
//   const [markedDates, setMarkedDates] = useState({});
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [workIds, setWorkIds] = useState([]);
//   const [selectedWorkId, setSelectedWorkId] = useState("");
//   const [formData, setFormData] = useState({
//     name: "",
//     sch_worktime: "",
//     sch_resttime: "",
//     color: "",
//     memo: "",
//     restdate: "",
//   });

//   useEffect(() => {
//     fetchSchedules();
//     fetchWorkIds();
//   }, []);

//   const fetchSchedules = async () => {
//     try {
//       const accessToken = await AsyncStorage.getItem("accessToken");
//       const response = await axios.get(`${API_BASE_URL}:3000/api/schedules`, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//         withCredentials: true,
//       });
//       const fetchedData = response.data;
//       const newMarkedDates = {};
//       fetchedData.forEach((schedule) => {
//         newMarkedDates[schedule.SCH_WORKDATE] = {
//           marked: true,
//           dotColor: schedule.COLOR,
//         };
//       });
//       setMarkedDates(newMarkedDates);
//     } catch (error) {
//       console.error("Error fetching schedules:", error);
//     }
//   };

//   const fetchWorkIds = async () => {
//     try {
//       const accessToken = await AsyncStorage.getItem("accessToken");
//       const response = await axios.get(`${API_BASE_URL}:3000/api/work-ids`, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//         withCredentials: true,
//       });

//       const structuredData = response.data.map((item) => ({
//         work_id: item[0], // 첫 번째 요소는 work_id
//         name: item[1], // 두 번째 요소는 name
//       }));

//       console.log("Structured Work IDs:", structuredData);
//       setWorkIds(structuredData);
//     } catch (error) {
//       console.error("Error fetching work ids:", error);
//     }
//   };

//   const openModal = (date) => {
//     setSelectedDate(date);
//     setFormData({
//       ...formData,
//       sch_workdate: date,
//     });
//     setModalVisible(true);
//   };

//   const handleSave = async () => {
//     try {
//       const accessToken = await AsyncStorage.getItem("accessToken");
//       const response = await axios.post(
//         `${API_BASE_URL}:3000/api/schedules`,
//         {
//           ...formData,
//           workId: selectedWorkId, // 선택된 work_id도 함께 전송
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );
//       if (response.status === 200) {
//         setModalVisible(false);
//         fetchSchedules(); // 일정을 새로고침
//       }
//     } catch (error) {
//       console.error("Error saving schedule:", error);
//     }
//   };

//   const daySchedule = (day) => {
//     const schedule = markedDates[day];
//     console.log(schedule);
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.calendarContainer}>
//         <View style={styles.buttonCalendar}>
//           <TouchableOpacity
//             activeOpacity={0.8}
//             onPress={() => setModalVisible(true)}
//             style={styles.button}
//           >
//             <FontAwesome6 name="plus" size={18} color="#FFBD00" />
//           </TouchableOpacity>
//           <Calendar
//             style={styles.calendar}
//             theme={{
//               selectedDayBackgroundColor: "#2E294E",
//               arrowColor: "#2E294E",
//               dotColor: "#ffffff",
//               todayTextColor: "#2E294E",
//             }}
//             onDayPress={(day) => {
//               setSelectedDate(day.dateString);
//               openModal(day.dateString);
//               daySchedule(day.dateString);
//             }}
//             monthFormat={"yyyy MM"}
//             onMonthChange={(month) => {
//               console.log("month changed", month);
//             }}
//             hideArrows={false}
//             hideExtraDays={false}
//             disableMonthChange={false}
//             firstDay={0}
//             hideDayNames={false}
//             showWeekNumbers={false}
//             onPressArrowLeft={(subtractMonth) => subtractMonth()}
//             onPressArrowRight={(addMonth) => addMonth()}
//             disableArrowLeft={false}
//             disableArrowRight={false}
//             disableAllTouchEventsForDisabledDays={true}
//             renderHeader={(date) => {
//               const header = new Date(date).toLocaleDateString("ko-KR", {
//                 year: "numeric",
//                 month: "long",
//               });
//               return (
//                 <View
//                   style={{
//                     flexDirection: "row",
//                     justifyContent: "center",
//                     padding: 10,
//                   }}
//                 >
//                   <Text style={{ fontSize: 18, fontWeight: "bold" }}>
//                     {header}
//                   </Text>
//                 </View>
//               );
//             }}
//             enableSwipeMonths={true}
//             markedDates={markedDates}
//           />
//         </View>
//       </View>

//       <Modal
//         visible={modalVisible}
//         animationType="slide"
//         onRequestClose={() => setModalVisible(false)}
//         transparent={true}
//       >
//         <View style={styles.modalWrapper}>
//           <View style={styles.modalContent}>
//             <Text>일정 추가</Text>

//             <Picker
//               selectedValue={selectedWorkId}
//               onValueChange={(itemValue) => {
//                 setSelectedWorkId(itemValue);
//                 const selectedName = workIds.find(
//                   (work) => work.work_id === itemValue
//                 )?.name;
//                 setFormData({ ...formData, name: selectedName });
//               }}
//               style={styles.picker}
//             >
//               {workIds.length > 0 ? (
//                 workIds.map((work) => (
//                   <Picker.Item
//                     key={work.work_id}
//                     label={work.name}
//                     value={work.work_id}
//                   />
//                 ))
//               ) : (
//                 <Picker.Item label="No data available" value="" />
//               )}
//             </Picker>

//             <TextInput
//               placeholder="이름"
//               value={formData.name}
//               onChangeText={(text) => setFormData({ ...formData, name: text })}
//               style={styles.input}
//               editable={false}
//             />
//             <TextInput
//               placeholder="근무시간"
//               value={formData.sch_worktime}
//               onChangeText={(text) =>
//                 setFormData({ ...formData, sch_worktime: text })
//               }
//               style={styles.input}
//             />
//             <TextInput
//               placeholder="휴게시간"
//               value={formData.sch_resttime}
//               onChangeText={(text) =>
//                 setFormData({ ...formData, sch_resttime: text })
//               }
//               style={styles.input}
//             />
//             <TextInput
//               placeholder="일정 색상"
//               value={formData.color}
//               onChangeText={(text) => setFormData({ ...formData, color: text })}
//               style={styles.input}
//             />
//             <TextInput
//               placeholder="메모"
//               value={formData.memo}
//               onChangeText={(text) => setFormData({ ...formData, memo: text })}
//               style={styles.input}
//             />
//             <View style={styles.buttonContainer}>
//               <TouchableOpacity style={styles.button2} onPress={handleSave}>
//                 <Text style={styles.buttonText}>저장</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={styles.button2}
//                 onPress={() => setModalVisible(false)}
//               >
//                 <Text style={styles.buttonText}>취소</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#fff",
//   },
//   calendarContainer: {
//     width: "90%",
//   },
//   buttonCalendar: {
//     display: "flex",
//     marginVertical: "50%",
//   },
//   calendar: {
//     flex: 1,
//     alignSelf: "center",
//     marginTop: 10,
//     width: "100%",
//     height: 350,
//   },
//   button: {
//     alignSelf: "flex-end",
//     padding: 10,
//     borderRadius: 5,
//     marginRight: "4%",
//   },
//   modalWrapper: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0,0,0,0.5)",
//   },
//   modalContent: {
//     width: "80%",
//     padding: 20,
//     backgroundColor: "white",
//     borderRadius: 10,
//     alignItems: "center",
//   },
//   picker: {
//     height: 50,
//     width: "100%",
//     marginVertical: 10,
//   },
//   input: {
//     marginVertical: 10,
//     borderBottomWidth: 1,
//     borderColor: "#ccc",
//     padding: 5,
//     width: "100%",
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//   },
//   button2: {
//     marginLeft: "20%",
//     marginRight: "20%",
//     width: 110,
//     height: 34,
//     borderRadius: 30,
//     backgroundColor: "#2E294E",
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   buttonText: {
//     color: "#fff",
//     fontWeight: "700",
//   },
// });

// export default ScheduleCalendar;

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome6 } from "@expo/vector-icons";
import API_BASE_URL from "@/config";

// Locale 설정
LocaleConfig.locales["ko"] = {
  monthNames: [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ],
  monthNamesShort: [
    "1.",
    "2.",
    "3.",
    "4.",
    "5.",
    "6.",
    "7.",
    "8.",
    "9.",
    "10.",
    "11.",
    "12.",
  ],
  dayNames: [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ],
  dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
  today: "오늘",
};
LocaleConfig.defaultLocale = "ko";

const ScheduleCalendar = () => {
  const [markedDates, setMarkedDates] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [workIds, setWorkIds] = useState([]);
  const [selectedWorkId, setSelectedWorkId] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    sch_worktime: "",
    sch_resttime: "",
    color: "",
    memo: "",
    restdate: "",
  });

  useEffect(() => {
    fetchSchedules();
    fetchWorkIds();

    // 오늘 날짜 표시
    const today = new Date().toISOString().split("T")[0];
    setMarkedDates((prevDates) => ({
      ...prevDates,
      [today]: { selected: true, marked: true, dotColor: "red" },
    }));
  }, []);

  const fetchSchedules = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      const response = await axios.get(`${API_BASE_URL}:3000/api/schedules`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      });
      const fetchedData = response.data;
      const newMarkedDates = {};
      fetchedData.forEach((schedule) => {
        newMarkedDates[schedule.SCH_WORKDATE] = {
          marked: true,
          dotColor: schedule.COLOR,
        };
      });
      setMarkedDates((prevDates) => ({ ...prevDates, ...newMarkedDates }));
    } catch (error) {
      console.error("Error fetching schedules:", error);
    }
  };

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
        work_id: item[0], // 첫 번째 요소는 work_id
        name: item[1], // 두 번째 요소는 name
      }));

      console.log("Structured Work IDs:", structuredData);
      setWorkIds(structuredData);
    } catch (error) {
      console.error("Error fetching work ids:", error);
    }
  };

  const openModal = (date) => {
    setSelectedDate(date);
    setFormData({
      ...formData,
      sch_workdate: date,
    });
    setModalVisible(true);
  };

  const handleSave = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      const response = await axios.post(
        `${API_BASE_URL}:3000/api/schedules`,
        {
          ...formData,
          regNum: selectedWorkId, // REG_NUM을 선택된 Work ID로 설정 (이 값이 서버에서 처리될 수 있도록)
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
        <View style={styles.buttonCalendar}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setModalVisible(true)}
            style={styles.button}
          >
            <FontAwesome6 name="plus" size={18} color="#FFBD00" />
          </TouchableOpacity>
          <Calendar
            style={styles.calendar}
            theme={{
              selectedDayBackgroundColor: "#2E294E",
              arrowColor: "#2E294E",
              dotColor: "#ffffff",
              todayTextColor: "#2E294E",
              todayBackgroundColor: "#FFBD00",
            }}
            onDayPress={(day) => {
              setSelectedDate(day.dateString);
              openModal(day.dateString);
            }}
            monthFormat={"yyyy MM"}
            onMonthChange={(month) => {
              console.log("month changed", month);
            }}
            hideArrows={false}
            hideExtraDays={false}
            disableMonthChange={false}
            firstDay={1}
            hideDayNames={false}
            showWeekNumbers={false}
            onPressArrowLeft={(subtractMonth) => subtractMonth()}
            onPressArrowRight={(addMonth) => addMonth()}
            disableArrowLeft={false}
            disableArrowRight={false}
            disableAllTouchEventsForDisabledDays={true}
            renderHeader={(date) => {
              const header = new Date(date).toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "long",
              });
              return (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    padding: 10,
                  }}
                >
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    {header}
                  </Text>
                </View>
              );
            }}
            enableSwipeMonths={true}
            markedDates={markedDates}
          />
        </View>
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
              onChangeText={(text) => setFormData({ ...formData, name: text })}
              style={styles.input}
              editable={false}
            />
            <TextInput
              placeholder="근무시간"
              value={formData.sch_worktime}
              onChangeText={(text) =>
                setFormData({ ...formData, sch_worktime: text })
              }
              style={styles.input}
            />
            <TextInput
              placeholder="휴게시간"
              value={formData.sch_resttime}
              onChangeText={(text) =>
                setFormData({ ...formData, sch_resttime: text })
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
  buttonCalendar: {
    display: "flex",
    marginVertical: "50%",
  },
  calendar: {
    flex: 1,
    alignSelf: "center",
    marginTop: 10,
    width: "100%",
    height: 350,
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
  picker: {
    height: 50,
    width: "100%",
    marginVertical: 10,
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
});

export default ScheduleCalendar;
