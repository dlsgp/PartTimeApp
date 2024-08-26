// import React, { useState, useEffect } from "react";
// import { StyleSheet, View, Text, FlatList, TextInput } from "react-native";
// import { Calendar } from "react-native-calendars";
// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import API_BASE_URL from "@/config";

// const INITIAL_DATE = new Date().toISOString().split("T")[0];

// const MyCalendar = () => {
//   const [markedDates, setMarkedDates] = useState({});
//   const [scheduleData, setScheduleData] = useState([]);
//   const [formData, setFormData] = useState({
//     sch_workstarttime: "",
//     sch_workendtime: "",
//     sch_reststarttime: "",
//     sch_restendtime: "",
//   });

//   useEffect(() => {
//     fetchSchedules();
//   }, []);

//   const fetchSchedules = async () => {
//     try {
//       const accessToken = await AsyncStorage.getItem("accessToken");
//       const response = await axios.get(`${API_BASE_URL}:3000/api/myschedules`, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//         withCredentials: true,
//       });

//       const fetchedSchedules = response.data;
//       const newMarkedDates = {};
//       const scheduleList = [];

//       fetchedSchedules.forEach((schedule) => {
//         const startDate = validateDate(schedule[2]); // SCH_STARTDATE
//         const endDate = validateDate(schedule[3]); // SCH_ENDDATE
//         const workStartTime = schedule[4]; // SCH_WORKSTARTTIME
//         const workEndTime = schedule[5]; // SCH_WORKENDTIME
//         const restStartTime = schedule[6]; // SCH_RESTSTARTTIME
//         const restEndTime = schedule[7]; // SCH_RESTENDTIME
//         const color = schedule[8] || "#50cebb"; // COLOR, 디폴트 컬러 사용

//         if (!startDate || !endDate) {
//           console.warn(
//             "Skipping schedule due to invalid date range:",
//             schedule
//           );
//           return;
//         }

//         // 일정 데이터를 배열에 추가
//         scheduleList.push({
//           id: schedule[0],
//           name: schedule[1],
//           startDate: startDate,
//           endDate: endDate,
//           workStartTime: workStartTime,
//           workEndTime: workEndTime,
//           restStartTime: restStartTime,
//           restEndTime: restEndTime,
//           color: color,
//           memo: schedule[9],
//         });

//         // 마킹 데이터 생성
//         let date = startDate;
//         while (date <= endDate) {
//           if (!newMarkedDates[date]) {
//             newMarkedDates[date] = {
//               color: color,
//               textColor: "white",
//               startingDay: date === startDate,
//               endingDay: date === endDate,
//               marked: true,
//               dotColor:
//                 date === startDate || date === endDate ? "#FFFFFF" : undefined, // 시작일과 종료일에 점 표시
//             };
//           } else {
//             // 기존에 마킹된 날짜에 추가로 dot 마킹을 추가합니다.
//             newMarkedDates[date].marked = true;
//             newMarkedDates[date].dotColor = "#FFFFFF"; // 여기도 색상을 맞춰줍니다.
//           }

//           date = incrementDate(date);
//         }
//       });

//       setMarkedDates(newMarkedDates);
//       setScheduleData(scheduleList);
//     } catch (error) {
//       console.error("Error fetching schedules:", error);
//     }
//   };

//   const validateDate = (dateString) => {
//     if (!dateString || dateString === "null") {
//       console.error("Invalid date string:", dateString);
//       return null;
//     }

//     const date = new Date(dateString);
//     if (isNaN(date.getTime())) {
//       console.error("Invalid date object:", dateString);
//       return null;
//     }

//     // 로컬 타임존을 기준으로 날짜를 처리
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
//     const day = String(date.getDate()).padStart(2, "0");

//     return `${year}-${month}-${day}`; // YYYY-MM-DD 포맷으로 변환
//   };

//   const incrementDate = (dateString) => {
//     const date = new Date(dateString);
//     if (isNaN(date.getTime())) {
//       console.error("Invalid date for incrementing:", dateString);
//       return dateString; // 에러 방지를 위해 원래 문자열 반환
//     }

//     date.setUTCDate(date.getUTCDate() + 1);
//     return date.toISOString().split("T")[0];
//   };

//   const renderScheduleCard = ({ item }) => {
//     return (
//       <View style={[styles.card, { borderColor: item.color }]}>
//         <Text style={styles.cardTitle}>{item.name}</Text>
//         <Text>기간: {item.startDate} - {item.endDate}</Text>
//         <Text>근무 시간: {item.workStartTime} - {item.workEndTime}</Text>
//         <Text>휴게 시간: {item.restStartTime} - {item.restEndTime}</Text>
//         <Text>메모: {item.memo}</Text>
//       </View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.calendarContainer}>
//         <Calendar
//           current={INITIAL_DATE}
//           style={styles.calendar}
//           markingType={"period"} // period 타입으로 설정합니다.
//           markedDates={markedDates} // fetchSchedules 함수에서 생성된 markedDates 사용
//           monthFormat={"yyyy년 M월"}
//           dayNames={["일", "월", "화", "수", "목", "금", "토"]}
//           theme={{
//             "stylesheet.calendar.header": {
//               dayTextAtIndex0: {
//                 color: "#D30505",
//               },
//               dayTextAtIndex6: {
//                 color: "#7FB3FA",
//               },
//             },
//           }}
//         />
//       </View>

//       <FlatList
//         data={scheduleData}
//         renderItem={renderScheduleCard}
//         keyExtractor={(item) => item.id.toString()}
//         style={styles.list}
//         contentContainerStyle={styles.listContainer}
//       />
//     </View>
//   );
// };

// export default MyCalendar;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   calendarContainer: {
//     width: "100%",
//     borderRadius: 10,
//     overflow: "hidden",
//     elevation: 3,
//     borderWidth: 0,
//     paddingTop: "30%",
//   },
//   calendar: {
//     flex: 1,
//     alignSelf: "center",
//     marginTop: 10,
//     width: "100%",
//     height: "100%",
//   },
//   list: {
//     flex: 1,
//     paddingTop: 10,
//   },
//   listContainer: {
//     paddingBottom: 20,
//   },
//   card: {
//     backgroundColor: "#f8f8f8",
//     padding: 15,
//     marginHorizontal: 20,
//     marginBottom: 10,
//     borderRadius: 10,
//     borderWidth: 2,
//   },
//   cardTitle: {
//     fontSize: 16,
//     fontWeight: "bold",
//     marginBottom: 5,
//   },
// });

import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, FlatList, TextInput } from "react-native";
import { Calendar } from "react-native-calendars";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API_BASE_URL from "@/config";

const INITIAL_DATE = new Date().toISOString().split("T")[0];

const MyCalendar = () => {
  const [markedDates, setMarkedDates] = useState({});
  const [scheduleData, setScheduleData] = useState([]);
  const [formData, setFormData] = useState({
    sch_workstarttime: "",
    sch_workendtime: "",
    sch_reststarttime: "",
    sch_restendtime: "",
  });

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      const response = await axios.get(`${API_BASE_URL}:3000/api/myschedules`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      });

      const fetchedSchedules = response.data;
      const newMarkedDates = {};
      const scheduleList = [];

      fetchedSchedules.forEach((schedule) => {
        const startDate = validateDate(schedule[2]); // SCH_STARTDATE
        const endDate = validateDate(schedule[3]); // SCH_ENDDATE
        const workStartTime = schedule[4]; // SCH_WORKSTARTTIME
        const workEndTime = schedule[5]; // SCH_WORKENDTIME
        const restStartTime = schedule[6]; // SCH_RESTSTARTTIME
        const restEndTime = schedule[7]; // SCH_RESTENDTIME
        const color = schedule[8] || "#50cebb"; // COLOR, 디폴트 컬러 사용

        if (!startDate || !endDate) {
          console.warn(
            "Skipping schedule due to invalid date range:",
            schedule
          );
          return;
        }

        // 일정 데이터를 배열에 추가
        scheduleList.push({
          id: schedule[0],
          name: schedule[1],
          startDate: startDate,
          endDate: endDate,
          workStartTime: workStartTime,
          workEndTime: workEndTime,
          restStartTime: restStartTime,
          restEndTime: restEndTime,
          color: color,
          memo: schedule[9],
        });

        // 마킹 데이터 생성
        let date = startDate;
        while (date <= endDate) {
          if (!newMarkedDates[date]) {
            newMarkedDates[date] = {
              color: color,
              textColor: "white",
              startingDay: date === startDate,
              endingDay: date === endDate,
              marked: false,
              dotColor:
                date === startDate || date === endDate ? "#FFFFFF" : undefined, // 시작일과 종료일에 점 표시
            };
          } else {
            // 기존에 마킹된 날짜에 추가로 dot 마킹을 추가합니다.
            newMarkedDates[date].marked = false;
            newMarkedDates[date].dotColor = "#FFFFFF"; // 여기도 색상을 맞춰줍니다.
          }

          date = incrementDate(date);
        }
      });

      setMarkedDates(newMarkedDates);
      setScheduleData(scheduleList);
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

    // 로컬 타임존을 기준으로 날짜를 처리
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`; // YYYY-MM-DD 포맷으로 변환
  };

  const incrementDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      console.error("Invalid date for incrementing:", dateString);
      return dateString; // 에러 방지를 위해 원래 문자열 반환
    }

    date.setUTCDate(date.getUTCDate() + 1);
    return date.toISOString().split("T")[0];
  };

  const renderScheduleCard = ({ item }) => {
    return (
      <View style={[styles.card, { borderColor: item.color }]}>
        {/* <Text style={styles.cardTitle}>{item.name}</Text> */}
        <Text>기간: {item.startDate} - {item.endDate}</Text>
        <Text>근무 시간: {item.workStartTime} - {item.workEndTime}</Text>
        <Text>휴게 시간: {item.restStartTime} - {item.restEndTime}</Text>
        <Text>메모: {item.memo}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.calendarContainer}>
        <Calendar
          current={INITIAL_DATE}
          style={styles.calendar}
          markingType={"period"} // period 타입으로 설정합니다.
          markedDates={markedDates} // fetchSchedules 함수에서 생성된 markedDates 사용
          monthFormat={"yyyy년 M월"}
          dayNames={["일", "월", "화", "수", "목", "금", "토"]}
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
        data={scheduleData}
        renderItem={renderScheduleCard}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default MyCalendar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  calendarContainer: {
    width: "100%",
    borderRadius: 10,
    overflow: "hidden",
    elevation: 3,
    borderWidth: 0,
    paddingTop: "30%",
  },
  calendar: {
    flex: 1,
    alignSelf: "center",
    marginTop: 10,
    width: "100%",
    height: "100%",
  },
  list: {
    flex: 1,
    paddingTop: 10,
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#f8f8f8",
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
});
