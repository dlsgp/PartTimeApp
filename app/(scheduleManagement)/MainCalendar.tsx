import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";

export default function MainCalendar() {
  const [selected, setSelected] = useState("");

  return (
    <View style={styles.container}>
      <StatusBar />
      <ScrollView style={styles.calendarContainer}>
        <Calendar
          style={styles.calendar}
          width={Dimensions.get("window").width * 0.9}
          height={Dimensions.get("window").height * 0.7}
        />
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
  calendar: {
    flex: 1,
    alignSelf: "center",
    marginTop: "40%",
    width: "110%",
    height: "110%",
  },
});
