import * as React from "react";
import { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { RadioButton, TextInput, useTheme } from "react-native-paper";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import DatePicker from "../(staffLayout)/ModalCalendar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const { width, height } = Dimensions.get("window");

const StaffFormDetailApp = () => {
  const [text, setText] = useState("");
  const { colors } = useTheme();
  const [selectedDate, setSelectedDate] = useState();
  const [checked, setChecked] = React.useState("first");
  const [date1, setDate1] = useState<string | null>(null);
  const [date2, setDate2] = useState<string | null>(null);
  const [date3, setDate3] = useState<string | null>(null);
  const [showDatePicker1, setShowDatePicker1] = useState(false);
  const [showDatePicker2, setShowDatePicker2] = useState(false);
  const [showDatePicker3, setShowDatePicker3] = useState(false);

  function handleChange1(propDate: string) {
    setDate1(propDate);
  }

  function handleChange2(propDate: string) {
    setDate2(propDate);
  }

  function handleChange3(propDate: string) {
    setDate3(propDate);
  }

  function toggleDatePicker1() {
    setShowDatePicker1((prevState) => !prevState);
  }

  function toggleDatePicker2() {
    setShowDatePicker2((prevState) => !prevState);
  }

  function toggleDatePicker3() {
    setShowDatePicker3((prevState) => !prevState);
  }

  return (
    <KeyboardAwareScrollView
      style={RegFormStyle.maincontainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={RegFormStyle.container}>
        <View style={RegFormStyle.titleContainer}>
          <Text
            style={{
              fontSize: 22,
              fontFamily: "MangoDdobak-R",
              fontWeight: "bold",
              marginVertical: "6%",
              color: "#2E294E",
            }}
          >
            상세보기
          </Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Image
            source={require("../../assets/images/profile.jpg")}
            style={{ width: 80, height: 80 }}
          />

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={RegFormStyle.keyboardcontainer}
          >
            <View style={RegFormStyle.textInputContainer}>
              <TextInput
                style={RegFormStyle.formcontainer}
                label="이름"
                onChangeText={(text) => setText(text)}
                mode="outlined"
                outlineColor="#E5E5E5"
                activeOutlineColor="#219BDA"
                theme={{ colors: { background: "white" } }}
              />
              <TextInput
                style={RegFormStyle.formcontainer}
                label="사원번호"
                onChangeText={(text) => setText(text)}
                mode="outlined"
                outlineColor="#E5E5E5"
                activeOutlineColor="#219BDA"
                theme={{ colors: { background: "white" } }}
              />
              <TextInput
                style={RegFormStyle.formcontainer}
                label="직급"
                onChangeText={(text) => setText(text)}
                mode="outlined"
                outlineColor="#E5E5E5"
                activeOutlineColor="#219BDA"
                theme={{ colors: { background: "white" } }}
              />
              <TextInput
                style={RegFormStyle.formcontainer}
                label="전화번호"
                onChangeText={(text) => setText(text)}
                mode="outlined"
                outlineColor="#E5E5E5"
                activeOutlineColor="#219BDA"
                theme={{ colors: { background: "white" } }}
              />
              <TextInput
                style={RegFormStyle.formcontainer}
                label="이메일"
                onChangeText={(text) => setText(text)}
                mode="outlined"
                outlineColor="#E5E5E5"
                activeOutlineColor="#219BDA"
                theme={{ colors: { background: "white" } }}
              />
              <TextInput
                style={RegFormStyle.formcontainer}
                label="주소"
                onChangeText={(text) => setText(text)}
                mode="outlined"
                outlineColor="#E5E5E5"
                activeOutlineColor="#219BDA"
                theme={{ colors: { background: "white" } }}
              />
              <TextInput
                style={RegFormStyle.formcontainer}
                label="시급"
                onChangeText={(text) => setText(text)}
                mode="outlined"
                outlineColor="#E5E5E5"
                activeOutlineColor="#219BDA"
                theme={{ colors: { background: "white" } }}
              />

              <View style={RegFormStyle.TextIcon}>
                <TextInput
                  style={RegFormStyle.formcontainerIcon}
                  label="입사일"
                  value={date1 || ""}
                  onChangeText={(text) => setDate1(text)}
                  mode="outlined"
                  outlineColor="#E5E5E5"
                  activeOutlineColor="#219BDA"
                  theme={{ colors: { background: "white" } }}
                />
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={toggleDatePicker1}
                  style={RegFormStyle.calendarButton}
                >
                  <FontAwesome name="calendar-o" size={24} color="e5e5e5" />
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

              <View>
                <View style={RegFormStyle.TextIconE}>
                  <TextInput
                    style={RegFormStyle.formcontainerIconC}
                    label="수습기간"
                    value={date2 || ""}
                    onChangeText={(text) => setDate2(text)}
                    mode="outlined"
                    outlineColor="#E5E5E5"
                    activeOutlineColor="#219BDA"
                    theme={{ colors: { background: "white" } }}
                  />
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={toggleDatePicker2}
                    style={RegFormStyle.calendarButton}
                  >
                    <FontAwesome name="calendar-o" size={24} color="e5e5e5" />
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
                <Text style={RegFormStyle.dateText}>~</Text>

                <View style={RegFormStyle.TextIconE}>
                  <TextInput
                    style={RegFormStyle.formcontainerIconC}
                    label="수습기간 종료"
                    value={date3 || ""}
                    onChangeText={(text) => setDate3(text)}
                    mode="outlined"
                    outlineColor="#E5E5E5"
                    activeOutlineColor="#219BDA"
                    theme={{ colors: { background: "white" } }}
                  />
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={toggleDatePicker3}
                    style={RegFormStyle.calendarButton}
                  >
                    <FontAwesome name="calendar-o" size={24} color="e5e5e5" />
                  </TouchableOpacity>
                  {showDatePicker3 && (
                    <DatePicker
                      mode="calendar"
                      selected={date3 || ""}
                      onDateChange={handleChange3}
                      visible={showDatePicker3}
                    />
                  )}
                </View>
              </View>

              {/* 4대보험 유무 */}
              <View
                style={{
                  flexDirection: "row",
                  display: "flex",
                  marginVertical: "6%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={RegFormStyle.insurance}>4대보험유무</Text>
                <View style={RegFormStyle.radio}>
                  <RadioButton
                    value="yes"
                    status={checked === "yes" ? "checked" : "unchecked"}
                    onPress={() => setChecked("yes")}
                  />
                </View>
                <Text style={RegFormStyle.checktext}>예</Text>

                <View style={RegFormStyle.radio}>
                  <RadioButton
                    value="no"
                    status={checked === "no" ? "checked" : "unchecked"}
                    onPress={() => setChecked("no")}
                  />
                </View>
                <Text style={RegFormStyle.checktext}>아니요</Text>
              </View>

              <View style={RegFormStyle.buttonD}>
                <Button
                  color={"#ffffff"}
                  title="수정하기"
                  onPress={() => console.log("저장 버튼 클릭")}
                />
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const RegFormStyle = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    marginHorizontal: "4%",
    marginBottom: "4%",
  },
  titleContainer: {
    flexDirection: "row",
    flex: 1,
  },
  keyboardcontainer: {
    flex: 1,
  },
  textInputContainer: {
    marginHorizontal: "auto",
    marginLeft: 10,
  },
  checktext: {
    fontSize: 18,
    fontFamily: "GmarketSansTTFBold",
    fontWeight: "700",
    marginVertical: "auto",
  },
  insurance: {
    fontSize: 16,
    marginLeft: 4,
  },
  radio: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    marginLeft: 7,
  },
  buttonD: {
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 5,
    alignSelf: "flex-end",
    backgroundColor: "#2E294E",
    marginTop: 30,
  },
  formcontainer: {
    width: width * 0.64,
    height: height * 0.04,
    marginVertical: "6%",
  },
  TextIcon: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: "3%",
  },
  TextIconE: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    justifyContent: "space-between",
    marginLeft: "4%",
  },
  formcontainerIcon: {
    width: width * 0.64,
    height: height * 0.04,
    textAlign: "left",
    marginVertical: "6%",
  },
  formcontainerIconC: {
    width: width * 0.64,
    height: height * 0.04,
    textAlign: "left",
    marginVertical: "4%",
  },
  calendarButton: {
    marginLeft: -30,
    marginBottom: -5,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default StaffFormDetailApp;