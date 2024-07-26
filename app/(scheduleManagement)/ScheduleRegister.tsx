import { FontAwesome } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import DatePicker from "../(staffLayout)/ModalCalendar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextInput } from "react-native-paper";

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
  const [showDatePicker1, setShowDatePicker1] = useState(false);

  function handleChange1(propDate: string) {
    setDate1(propDate);
  }

  function toggleDatePicker1() {
    setShowDatePicker1((prevState) => !prevState);
  }

  return (
    <View style={styles.mainContainer}>
      <StatusBar />
      <KeyboardAwareScrollView>
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
              <View>
                <Text
                  style={[styles.title, { marginLeft: 6, marginBottom: 4 }]}
                >
                  근무기간
                </Text>
              </View>
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
    borderWidth: "none",
    shadowColor: "#3a3a3a",
    shadowOffset: "2%",
    shadowOpacity: 10,
    width: "76%",
  },
  containerTwo: {
    backgroundColor: "#EAEAEA",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  TextIconE: {
    flexDirection: "row",
    alignItems: "center",
  },
  formcontainerIcon: {
    width: "46%",
  },
  calendarButton: {
    marginLeft: -30,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ScheduleRegister;
