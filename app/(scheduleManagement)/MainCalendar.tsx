import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { format } from "date-fns";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { FontAwesome6 } from "@expo/vector-icons";
import { router } from "expo-router";

LocaleConfig.locales["fr"] = {
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
    "3",
    "4",
    "5",
    "6",
    "7.",
    "8",
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
  // today: "Aujourd'hui",
};
LocaleConfig.defaultLocale = "fr";

export default function MainCalendar() {
  const posts = [
    {
      id: 1,
      title: "제목입니다.",
      contents: "내용입니다.",
      date: "2022-02-26",
    },
    {
      id: 2,
      title: "제목입니다.",
      contents: "내용입니다.",
      date: "2022-02-27",
    },
  ];
  const markedDates = posts.reduce((acc, current) => {
    const formattedDate = format(new Date(current.date), "yyyy-MM-dd");
    acc[formattedDate] = { marked: true, dotColor: "#ffffff" };
    return acc;
  }, {});

  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), "yyyy-MM-dd")
  );
  const markedSelectedDates = {
    ...markedDates,
    [selectedDate]: {
      selected: true,
      marked: markedDates[selectedDate]?.marked,
    },
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      <ScrollView style={styles.calendarContainer}>
        <View style={styles.buttonCalendar}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.push("/ScheduleRegister")}
            style={styles.button}
          >
            <FontAwesome6 name="plus" size={18} color="#FFBD00" />
          </TouchableOpacity>
          <Calendar
            style={styles.calendar}
            markedDates={markedSelectedDates}
            // width={Dimensions.get("window").width * 0.9}
            // height={Dimensions.get("window").height * 0.7}
            theme={{
              selectedDayBackgroundColor: "#2E294E",
              arrowColor: "#2E294E",
              dotColor: "#ffffff",
              todayTextColor: "#2E294E",
            }}
            onDayPress={(day) => {
              setSelectedDate(day.dateString);
            }}
            // current={"2024-07-25"}
            // onDayPress={(day) => {
            //   console.log("selected day", day);
            // }}

            // markedDates={{
            //   "2024-07-01": {
            //     selected: true,
            //     marked: true,
            //     selectedColor: "#2E294E",
            //   },
            //   "2024-08-10": { marked: true },
            //   "2024-08-16": {
            //     selected: true,
            //     marked: true,
            //     selectedColor: "#2E294E",
            //   },
            // }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  calendarContainer: {
    width: "90%",
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
});
