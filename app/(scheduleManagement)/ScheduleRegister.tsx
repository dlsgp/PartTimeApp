import { FontAwesome } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
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

  const [date1, setDate1] = useState<string | null>(null);
  const [date2, setDate2] = useState<string | null>(null);
  const [showDatePicker1, setShowDatePicker1] = useState(false);
  const [showDatePicker2, setShowDatePicker2] = useState(false);

  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  

  function handleChange1(propDate: string) {
    setDate1(propDate);
  }
  function handleChange2(propDate: string) {
    setDate2(propDate);
  }

  function toggleDatePicker1() {
    setShowDatePicker1((prevState) => !prevState);
  }
  function toggleDatePicker2() {
    setShowDatePicker2((prevState) => !prevState);
  }

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
            <TouchableOpacity activeOpacity={0.8}>
              <View style={styles.box}>
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

          <View style={styles.containerTwo}>
            <View style={{ marginTop: "10%" }}>
              <Text style={[styles.title, { marginLeft: 6, marginBottom: 4 }]}>
                근무기간
              </Text>

              {/* <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View style={styles.TextIconE}>
                  <TextInput
                    style={styles.formcontainerIcon}
                    value={date1 || ""}
                    placeholder="근무기간"
                    onChangeText={(text) => setDate1(text)}
                    mode="outlined"
                    outlineColor="#E5E5E5"
                    activeOutlineColor="#219BDA"
                    theme={{ colors: { background: "#ffffff00" } }}
                  />
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={toggleDatePicker1}
                    style={styles.calendarButton}
                  >
                    <FontAwesome name="calendar-o" size={24} color="black" />
                  </TouchableOpacity>
                  {showDatePicker1 && (
                    <DatePicker
                      mode="calendar"
                      selected={date1 || ""}
                      onDateChange={handleChange1}
                      visible={showDatePicker1}
                    />
                  )}
                </View>

                <Text
                  style={{
                    fontSize: 16,
                    color: "#929292",
                  }}
                >
                  ~
                </Text>

                <View style={styles.TextIconE}>
                  <TextInput
                    style={styles.formcontainerIcon}
                    value={date2 || ""}
                    placeholder="근무기간"
                    onChangeText={(text) => setDate2(text)}
                    mode="outlined"
                    outlineColor="#E5E5E5"
                    activeOutlineColor="#219BDA"
                    theme={{ colors: { background: "#ffffff00" } }}
                  />
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={toggleDatePicker2}
                    style={styles.calendarButton}
                  >
                    <FontAwesome name="calendar-o" size={24} color="black" />
                  </TouchableOpacity>
                  {showDatePicker2 && (
                    <DatePicker
                      mode="calendar"
                      selected={date2 || ""}
                      onDateChange={handleChange2}
                      visible={showDatePicker2}
                    />
                  )}
                </View>
              </View> */}

              <SafeAreaView>
                <View style={{ flexDirection: "row" }}>
                  <Button onPress={showDatepicker} title="날짜선택" />
                  {show && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={date1}
                      mode={mode}
                      is24Hour={true}
                      onChange={onChange}
                      style={{ alignContent: "flex-start" }}
                    />
                  )}
                </View>

                <Text>근무 시작: {date.toLocaleString()}</Text>
                <Text>근무 끝: {date.toLocaleString()}</Text>

                <Button onPress={showTimepicker} title="Show time picker!" />
              </SafeAreaView>

              <View style={styles.textContainer}>
                <Text
                  style={[styles.title, { marginLeft: 6, marginVertical: 8 }]}
                >
                  출근시간
                </Text>

                <View style={{ marginLeft: "30%" }}>
                  <Text
                    style={[styles.title, { marginLeft: 6, marginVertical: 8 }]}
                  >
                    퇴근시간
                  </Text>
                </View>
              </View>

              <View>
                <SafeAreaView>
                  {/* <Button onPress={showTimepicker} title="Show time picker!" />
                  <Text>selected: {date.toLocaleString()}</Text>
                  {show && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={date}
                      mode={mode}
                      is24Hour={true}
                      onChange={onChange}
                    />
                  )} */}
                </SafeAreaView>
              </View>
            </View>
          </View>
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
    backgroundColor: "pink",
    marginHorizontal: "6%",
    marginVertical: "4%",
  },
  textContainer: {
    flexDirection: "row",
  },
  boxContainer: {
    flexDirection: "row",
    paddingVertical: "4%",
  },
  box: {
    width: 70,
    height: 30,
    backgroundColor: "yellow",
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
    width: "80%",
    zIndex: 1000,
  },
  containerTwo: {
    backgroundColor: "#EAEAEA",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
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
});

export default ScheduleRegister;

{
  /* <SafeAreaView>
                <Button onPress={showDatepicker} title="Show date picker!" />
                <Button onPress={showTimepicker} title="Show time picker!" />
                <Text>selected: {date.toLocaleString()}</Text>
                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    onChange={onChange}
                  />
                )}
              </SafeAreaView> */
}
