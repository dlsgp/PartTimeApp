import { FontAwesome } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TextInput } from "react-native";
import { Checkbox } from "react-native-paper";
import { router } from "expo-router";

const ScheduleRegister = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "홍길동", value: "홍길동" },
    { label: "김리리", value: "김리리" },
    { label: "박미리", value: "박미리" },
    { label: "이진리", value: "이진리" },
    { label: "나시리", value: "나시리" },
    { label: "주피리", value: "주피리" },
    { label: "김철수", value: "김철수" },
    { label: "박시연", value: "박시연" },
    { label: "김영희", value: "김영희" },
  ]);

  // dateTimepicker
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [startTimeTwo, setStartTimeTwo] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [endTimeTwo, setEndTimeTwo] = useState(new Date());
  const [showStart, setShowStart] = useState(true);
  const [showEnd, setShowEnd] = useState(true);
  const [showStartTime, setShowStartTime] = useState(true);
  const [showEndTime, setShowEndTime] = useState(true);
  const [showStartTimeTwo, setShowStartTimeTwo] = useState(true);
  const [showEndTimeTwo, setShowEndTimeTwo] = useState(true);

  const onChangeStart = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowStart(true);
    setStartDate(currentDate);
  };

  const onChangeEnd = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowEnd(true);
    setEndDate(currentDate);
  };

  const onChangeStartTime = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowStartTime(true);
    setStartTime(currentDate);
  };

  const onChangeEndTime = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowEndTime(true);
    setEndTime(currentDate);
  };

  const onChangeStartTimeTwo = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowStartTimeTwo(true);
    setStartTimeTwo(currentDate);
  };

  const onChangeEndTimeTwo = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowEndTimeTwo(true);
    setEndTimeTwo(currentDate);
  };

  //

  const [text, onChangeText] = React.useState("메모");
  const [checked1, setChecked1] = React.useState(false);
  const [checked2, setChecked2] = React.useState(false);

  const [boxColor, setBoxColor] = React.useState("#FFBD00");

  const colors = [
    "#2080d8",
    "#FFBD00",
    "#ff86a2",
    "#344c0d",
    "#e1dcf6",
    "#fffbf3",
  ];

  const changeColor = () => {
    const currentColorIndex = colors.indexOf(boxColor);
    const nextColorIndex = (currentColorIndex + 1) % colors.length;
    setBoxColor(colors[nextColorIndex]);
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar />
      <KeyboardAwareScrollView nestedScrollEnabled={true}>
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <View>
              <Text style={styles.title}>일정색상</Text>
            </View>
            <View style={{ marginLeft: "20%" }}>
              <Text style={styles.title}>직원이름</Text>
            </View>
          </View>

          <View style={styles.boxContainer}>
            <TouchableOpacity activeOpacity={0.8} onPress={changeColor}>
              <View style={[styles.box, { backgroundColor: boxColor }]}>
                <Text style={styles.boxColor}>색상</Text>
              </View>
            </TouchableOpacity>

            <View style={{ marginLeft: "20%" }}>
              <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                placeholder="직원이름"
                style={styles.dropdown}
              />
            </View>
          </View>

          <View
            style={[
              styles.containerTwo,
              { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 },
            ]}
          >
            <View style={{ flex: 1, alignItems: "flex-start" }}>
              <Text
                style={[
                  styles.title,
                  { marginLeft: 6, marginBottom: 6, marginTop: "6%" },
                ]}
              >
                근무기간
              </Text>

              <View style={styles.textContainer}>
                <View>
                  {/* <Text
                    style={[styles.title, { marginLeft: "10%", marginVertical: 8 }]}
                  >
                    근무시작
                  </Text> */}
                  {showStart && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={startDate}
                      mode="date"
                      is24Hour={true}
                      onChange={onChangeStart}
                      locale="ko"
                    />
                  )}
                </View>
                <View
                  style={{ justifyContent: "flex-end", alignItems: "flex-end" }}
                >
                  <Text style={styles.dateText}>-</Text>
                </View>
                <View style={{ flex: 1, alignItems: "flex-start" }}>
                  {/* <Text
                    style={[
                      styles.title,
                      { marginLeft: "10%", marginVertical: 8 },
                    ]}
                  >
                    근무끝
                  </Text> */}
                  {showEnd && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={endDate}
                      mode="date"
                      is24Hour={true}
                      onChange={onChangeEnd}
                      locale="ko"
                    />
                  )}
                </View>
              </View>

              <View>
                {/* <Text>시작: {startDate.toLocaleTimeString()}</Text>
              <Text>퇴근시간: {endDate.toLocaleTimeString()}</Text> */}
              </View>
            </View>

            <View style={{ flex: 1, alignItems: "flex-start" }}>
              <Text
                style={[
                  styles.title,
                  { marginLeft: 6, marginBottom: 6, marginTop: "6%" },
                ]}
              >
                출퇴근시간
              </Text>

              <View style={styles.textContainer}>
                <View>
                  {showStartTime && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={startTime}
                      mode="time"
                      is24Hour={true}
                      onChange={onChangeStartTime}
                      locale="ko"
                    />
                  )}
                </View>
                <View
                  style={{ justifyContent: "flex-end", alignItems: "flex-end" }}
                >
                  <Text style={styles.dateText}>-</Text>
                </View>
                <View style={{ flex: 1, alignItems: "flex-start" }}>
                  {showEndTime && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={endTime}
                      mode="time"
                      is24Hour={true}
                      onChange={onChangeEndTime}
                      locale="ko"
                    />
                  )}
                </View>
              </View>

              <View></View>
            </View>

            <View style={{ flex: 1, alignItems: "flex-start" }}>
              <Text
                style={[
                  styles.title,
                  { marginLeft: 6, marginBottom: 6, marginTop: "6%" },
                ]}
              >
                휴게시간
              </Text>

              <View style={styles.textContainer}>
                <View>
                  {showStartTimeTwo && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={startTimeTwo}
                      mode="time"
                      is24Hour={true}
                      onChange={onChangeStartTimeTwo}
                      locale="ko"
                    />
                  )}
                </View>
                <View
                  style={{ justifyContent: "flex-end", alignItems: "flex-end" }}
                >
                  <Text style={styles.dateText}>-</Text>
                </View>
                <View style={{ flex: 1, alignItems: "flex-start" }}>
                  {showEndTimeTwo && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={endTimeTwo}
                      mode="time"
                      is24Hour={true}
                      onChange={onChangeEndTimeTwo}
                      locale="ko"
                    />
                  )}
                </View>
              </View>
            </View>

            <View style={[styles.textContainer, { marginTop: "6%" }]}>
              <Text
                style={[
                  styles.title,
                  { marginLeft: 6, marginBottom: 6, marginTop: "4%" },
                ]}
              >
                야간
              </Text>
              <Checkbox
                status={checked1 ? "checked" : "unchecked"}
                onPress={() => {
                  setChecked1(!checked1);
                }}
              />

              <Text
                style={[
                  styles.title,
                  { marginLeft: 6, marginBottom: 6, marginTop: "4%" },
                ]}
              >
                연장
              </Text>
              <Checkbox
                status={checked2 ? "checked" : "unchecked"}
                onPress={() => {
                  setChecked2(!checked2);
                }}
              />
            </View>
          </View>

          <View
            style={[
              styles.containerTwo,
              {
                marginTop: "12%",
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
              },
            ]}
          >
            <View>
              <Text
                style={[
                  styles.title,
                  { marginLeft: 6, marginBottom: 6, marginTop: "6%" },
                ]}
              >
                메모
              </Text>
              <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
              />
            </View>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.button,
              {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              },
            ]}
          >
            <Text style={styles.buttonText}>등록하기</Text>
            
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    marginHorizontal: "6%",
    marginVertical: "4%",
  },
  textContainer: {
    flexDirection: "row",
  },
  dateText: {
    fontSize: 30,
    fontWeight: "700",
    marginLeft: "4%",
  },
  boxContainer: {
    flexDirection: "row",
    paddingVertical: "4%",
  },
  box: {
    width: 70,
    height: 30,
    borderRadius: 10,
    justifyContent: "center",
  },
  boxColor: {
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
  },
  title: {
    fontSize: 16,
    color: "#929292",
    marginLeft: "6%",
  },
  dropdown: {
    shadowRadius: 4,
    shadowColor: "#3a3a3a",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    borderColor: "none",
    width: "78%",
    zIndex: 1000,
  },
  containerTwo: {
    // backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 30,
    paddingBottom: "10%",
    zIndex: -100,
  },
  TextIconE: {
    flexDirection: "row",
    alignItems: "center",
    width: "48%",
  },
  formcontainerIcon: {
    width: "100%",
    paddingRight: 40,
  },
  calendarButton: {
    position: "absolute",
    left: 130,
    justifyContent: "center",
    alignItems: "center",
  },
  checkContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  day: {
    marginHorizontal: "4%",
  },
  checkDay: {
    marginHorizontal: 4,
  },

  input: {
    height: 60,
    width: 200,
    margin: 12,
    borderWidth: 1,
    borderColor: "#484848",
    padding: 10,
    marginTop: 10,
  },
  buttonContainer: {
    alignSelf: "flex-end",
    marginRight: "4%",
  },
  button: {
    width: 110,
    height: 34,
    borderRadius: 30,
    backgroundColor: "#2E294E",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },
});

export default ScheduleRegister;
