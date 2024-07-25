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
import DatePicker from "../(staffLayout)/Calendar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import FormBox from "./FormBox";

const StaffForm = () => {
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

              <View style={RegFormStyle.searchSelection}>
                <View style={RegFormStyle.TextIcon}>
                  <TextInput
                    style={RegFormStyle.formcontainerIcon}
                    label="입사일"
                    value={date1 || ""}
                    placeholder=""
                    onChangeText={(text) => setDate1(text)}
                    mode="outlined"
                    outlineColor="#E5E5E5"
                    activeOutlineColor="#219BDA"
                    theme={{ colors: { background: "white" } }}
                  ></TextInput>
                  <View style={RegFormStyle.icon}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={toggleDatePicker1}
                    >
                      <FontAwesome name="calendar-o" size={24} color="e5e5e5" />
                      {showDatePicker1 && (
                        <DatePicker
                          mode="calendar"
                          selected={date1 || ""}
                          onDateChange={handleChange1}
                          visible={showDatePicker1}
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View>
                <View style={[RegFormStyle.searchSelection]}>
                  <View style={RegFormStyle.TextIconE}>
                    <TextInput
                      style={RegFormStyle.formcontainerIcon}
                      label="수습기간"
                      value={date2 || ""}
                      placeholder=""
                      onChangeText={(text) => setDate2(text)}
                      mode="outlined"
                      outlineColor="#E5E5E5"
                      activeOutlineColor="#219BDA"
                      theme={{ colors: { background: "white" } }}
                    ></TextInput>
                    <View style={RegFormStyle.icon}>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={toggleDatePicker2}
                      >
                        <FontAwesome
                          name="calendar-o"
                          size={24}
                          color="e5e5e5"
                        />
                        {showDatePicker2 && (
                          <DatePicker
                            mode="calendar"
                            selected={date2 || ""}
                            onDateChange={handleChange2}
                            visible={showDatePicker2}
                          />
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                <Text style={RegFormStyle.dateText}>~</Text>

                <View style={[RegFormStyle.searchSelection]}>
                  <View style={RegFormStyle.TextIconE}>
                    <TextInput
                      style={RegFormStyle.formcontainerIcon}
                      label="수습기간"
                      value={date3 || ""}
                      placeholder=""
                      onChangeText={(text) => setDate3(text)}
                      mode="outlined"
                      outlineColor="#E5E5E5"
                      activeOutlineColor="#219BDA"
                      theme={{ colors: { background: "white" } }}
                    ></TextInput>
                    <View style={RegFormStyle.icon}>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={toggleDatePicker3}
                      >
                        <FontAwesome
                          name="calendar-o"
                          size={24}
                          color="e5e5e5"
                        />
                        {showDatePicker3 && (
                          <DatePicker
                            mode="calendar"
                            selected={date3 || ""}
                            onDateChange={handleChange3}
                            visible={showDatePicker3}
                          />
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>
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
                {/* <TextInput
                  style={{
                    alignSelf: "flex-start",
                    height: 34,
                    width: 100,
                    color: "#ffffff", // 글씨 색 변경
                    backgroundColor: "#ffffff", // 폼 내부 색 변경
                  }}
                  label=""
                  value=""
                  placeholder="4대보험유무"
                  onChangeText={(text) => setText(text)}
                  mode="outlined"
                  disabled="false"
                /> */}
                <Text style={RegFormStyle.insurance}>4대보험유무</Text>

                {/* <BouncyCheckbox
                  size={24}
                  fillColor="#2e2e2e"
                  iconStyle={{
                    borderRadius: 50,
                  }}
                  onPress={(isChecked: boolean) => {}}
                  style={{
                    width: "12%",
                  }}
                />
                <Text style={RegFormStyle.checktext}>예</Text>

                <BouncyCheckbox
                  size={24}
                  fillColor="#2e2e2e"
                  iconStyle={{
                    borderRadius: 50,
                  }}
                  onPress={(isChecked: boolean) => {}}
                  style={{ width: "12%" }}
                />
                <Text style={RegFormStyle.checktext}>아니요</Text> */}

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
                  title="등록하기"
                  onPress={() => FormBox}
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
    borderWidth: 1,
    borderRadius: 30,
    padding: 3,
    alignSelf: "flex-end",
    alignItems: "center",
    backgroundColor: "#2E294E",
    marginTop: 30,
    marginBottom: 30,
    width: 100,
    height: 30,
  },
  formcontainer: {
    width: width * 0.65,
    height: height * 0.04,
    marginVertical: "6%",
  },
  searchSelection: {
    borderColor: "#e5e5e5",
  },
  TextIcon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dateText: {
    fontSize: 18,
    textAlign: "center",
  },
  TextIconE: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  icon: {
    justifyContent: "space-between",
    marginLeft: "4%",
  },
  formcontainerIcon: {
    width: width * 0.55,
    height: height * 0.04,
    textAlign: "left",
    marginVertical: "6%",
  },
  buttonText: {
    color: "#fff",
  },
  insurance: {
    fontSize: 16,
    marginLeft: 5,
  },
  radio: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    marginLeft: 7,
  },
});
export default StaffForm;

{
  /* <View
                  style={{
                    flexDirection: "row",
                    backgroundColor: "blue",
                  }}
                >
                  <BouncyCheckbox
                    size={24}
                    fillColor="#2e2e2e"
                    iconStyle={{
                      borderRadius: 50,
                    }}
                    onPress={(isChecked: boolean) => {}}
                  />
                  <Text style={RegFormStyle.checktext}>예</Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    backgroundColor: "pink",
                  }}
                >
                  <BouncyCheckbox
                    size={24}
                    fillColor="#2e2e2e"
                    iconStyle={{
                      borderRadius: 50,
                    }}
                    onPress={(isChecked: boolean) => {}}
                  />
                  <Text style={RegFormStyle.checktext}>아니요</Text>
                </View> */
}
