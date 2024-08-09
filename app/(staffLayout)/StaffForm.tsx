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
// import FontAwesome from "@expo/vector-icons/FontAwesome";
// import DatePicker from "../(staffLayout)/ModalCalendar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { router } from "expo-router";
import axios from "axios";

const { width, height } = Dimensions.get("window");

const StaffForm = () => {
  const [text, setText] = useState("");
  // const { colors } = useTheme();
  // const [selectedDate, setSelectedDate] = useState();
  // const [checked, setChecked] = React.useState("first");
  // const [date1, setDate1] = useState<string | null>(null);
  // const [date2, setDate2] = useState<string | null>(null);
  // const [date3, setDate3] = useState<string | null>(null);
  // const [showDatePicker1, setShowDatePicker1] = useState(false);
  // const [showDatePicker2, setShowDatePicker2] = useState(false);
  // const [showDatePicker3, setShowDatePicker3] = useState(false);

  const [userData, setUserData] = useState({
    name: "",
    tel: "",
    email: "",
    add1: "",
    add2: "",
  });
  const [error, setError] = useState("");
  const [staffNum, setStaffNum] = useState("");



  // function handleChange1(propDate: string) {
  //   setDate1(propDate);
  // }

  // function handleChange2(propDate: string) {
  //   setDate2(propDate);
  // }

  // function handleChange3(propDate: string) {
  //   setDate3(propDate);
  // }

  // function toggleDatePicker1() {
  //   setShowDatePicker1((prevState) => !prevState);
  // }

  // function toggleDatePicker2() {
  //   setShowDatePicker2((prevState) => !prevState);
  // }

  // function toggleDatePicker3() {
  //   setShowDatePicker3((prevState) => !prevState);
  // }

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/users/${text}`);
      if (response.data) {
        setUserData(response.data);
        setError("");
      } else {
        setUserData({
          name: "",
          tel: "",
          email: "",
          add1: "",
          add2: "",
        });
        setError("잘못된 아이디입니다.");
      }
    } catch (error) {
      setUserData({
        name: "",
        tel: "",
        email: "",
        add1: "",
        add2: "",
      });
      setError("잘못된 아이디입니다.");
    }
  };

  const handleSave = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/update-staffnum", {
        id: text,
        staffNum,
      });
      

      if (response.data.message) {
        alert(response.data.message);
      } else {
        alert("사원번호 수정에 실패했습니다.");
      }
    } catch (error) {
      alert("저장 중 오류가 발생했습니다.");
    }
  };

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
            직원등록
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
              <View style={RegFormStyle.textInputContainer1}>
            <TextInput
                style={RegFormStyle.formcontainer1}
                label="아이디"
                onChangeText={(text) => setText(text)}
                mode="outlined"
                outlineColor="#E5E5E5"
                activeOutlineColor="#219BDA"
                theme={{ colors: { background: "white" } }}
              />
              <View style={RegFormStyle.buttonD1}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={RegFormStyle.button2}
                  onPress={handleSearch}
                >
                  <Text style={RegFormStyle.buttonText2}>검색</Text>
                </TouchableOpacity>
              </View>
              </View>
              {error ? <Text style={RegFormStyle.errorText}>{error}</Text> : null}
              <TextInput
                style={RegFormStyle.formcontainer}
                label="사원번호"
                value={staffNum}
                onChangeText={(text) => setStaffNum(text)}
                mode="outlined"
                outlineColor="#E5E5E5"
                activeOutlineColor="#219BDA"
                theme={{ colors: { background: "white" } }}
              />
              <TextInput
                style={RegFormStyle.formcontainer}
                label="이름"
                value={userData.name || ""}
                onChangeText={(text) => setText(text)}
                mode="outlined"
                outlineColor="#E5E5E5"
                activeOutlineColor="#219BDA"
                theme={{ colors: { background: "white" } }}
                disabled
              />
              
              {/* <TextInput
                style={RegFormStyle.formcontainer}
                label="직급"
                onChangeText={(text) => setText(text)}
                mode="outlined"
                outlineColor="#E5E5E5"
                activeOutlineColor="#219BDA"
                theme={{ colors: { background: "white" } }}
              /> */}
              <TextInput
                style={RegFormStyle.formcontainer}
                label="전화번호"
                value={userData.tel || ""}
                onChangeText={(text) => setText(text)}
                mode="outlined"
                outlineColor="#E5E5E5"
                activeOutlineColor="#219BDA"
                theme={{ colors: { background: "white" } }}
                disabled
              />
              <TextInput
                style={RegFormStyle.formcontainer}
                label="이메일"
                value={userData.email || ""}
                onChangeText={(text) => setText(text)}
                mode="outlined"
                outlineColor="#E5E5E5"
                activeOutlineColor="#219BDA"
                theme={{ colors: { background: "white" } }}
                disabled
              />
              <TextInput
                style={RegFormStyle.formcontainer}
                label="주소"
                value={userData.add1 || ""}
                onChangeText={(text) => setText(text)}
                mode="outlined"
                outlineColor="#E5E5E5"
                activeOutlineColor="#219BDA"
                theme={{ colors: { background: "white" } }}
                disabled
              />
              <TextInput
                style={RegFormStyle.formcontainer2}
                label="상세주소"
                value={userData.add2 || ""}
                onChangeText={(text) => setText(text)}
                mode="outlined"
                outlineColor="#E5E5E5"
                activeOutlineColor="#219BDA"
                theme={{ colors: { background: "white" } }}
                disabled
              />
              {/* <TextInput
                style={RegFormStyle.formcontainer}
                label="시급"
                onChangeText={(text) => setText(text)}
                mode="outlined"
                outlineColor="#E5E5E5"
                activeOutlineColor="#219BDA"
                theme={{ colors: { background: "white" } }}
              /> */}

              {/* <View style={RegFormStyle.TextIcon}>
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
              </View> */}

              <View>
                {/* <View style={RegFormStyle.TextIconE}>
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
                </View> */}

                {/* <Text style={RegFormStyle.dateText}>~</Text> */}

                {/* <View style={RegFormStyle.TextIconE}>
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
                </View> */}
              </View>

              {/* 4대보험 유무 */}
              {/* <View
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
              </View> */}

              <View style={RegFormStyle.buttonD}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={RegFormStyle.button2}
                  onPress={handleSave}
                >
                  <Text style={RegFormStyle.buttonText2}>등록하기</Text>
                </TouchableOpacity>
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
  textInputContainer1: {
    flexDirection: 'row',
  },
  checkyesorno: {
    alignItems: "center",
  },
  checktext: {
    fontSize: 18,
    fontFamily: "GmarketSansTTFBold",
    fontWeight: "700",
    marginVertical: "auto",
  },
  buttonD: {
    // borderWidth: 1,
    borderRadius: 30,
    padding: 0.5,
    alignSelf: "flex-end",
    textAlign: "center",
    // backgroundColor: "#2E294E",
    // marginTop: 30,
    // marginBottom: 20,
    // width: 100,
    // height: 38,
  },
  buttonD1: {
    // borderWidth: 1,
    borderRadius: 30,
    padding: 0.5,
    alignSelf: "center",
    // textAlign: "center",
    // backgroundColor: "#2E294E",
    marginTop: 5,
    marginLeft: 15,
    // marginBottom: 20,
    // width: 100,
    // height: 38,
  },
  formcontainer: {
    width: width * 0.64,
    height: height * 0.04,
    marginVertical: "6%",
  },
  formcontainer1: {
    width: width * 0.35,
    height: height * 0.04,
    marginVertical: "6%",
  },
  formcontainer2: {
    width: width * 0.64,
    height: height * 0.04,
    marginTop: 5,
    marginBottom: 20,
  },
  TextIcon: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "space-between",
  },
  dateText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: "3%",
  },
  TextIconE: {
    flexDirection: "row",
    alignItems: "center",
    //justifyContent: "space-between",
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
  buttonText: {
    color: "#fff",
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
  calendarButton: {
    marginLeft: -30,
    marginBottom: -5,
    justifyContent: "center",
    alignItems: "center",
  },
  button2: {
    width: 110,
    height: 34,
    borderRadius: 30,
    backgroundColor: "#2E294E",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText2: {
    color: "#fff",
    fontWeight: "700",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    marginLeft: 5,
  },
});

export default StaffForm;
