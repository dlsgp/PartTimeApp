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
} from "react-native";
import { TextInput, useTheme } from "react-native-paper";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import DatePicker from "../(staffLayout)/Calendar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { router } from "expo-router";
import Calendar from "../(staffLayout)/Calendar";

const StaffForm = () => {
  const [text, setText] = useState("");
  const { colors } = useTheme();
  const [selectedDate, setSelectedDate] = useState();
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
    <KeyboardAwareScrollView style={RegFormStyle.maincontainer}>
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
                    label=""
                    value={date1 || ""}
                    placeholder="입사일"
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
                      label=""
                      value={date2 || ""}
                      placeholder="수습기간"
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
                <View
                  style={[
                    RegFormStyle.searchSelection,
                    {
                      alignSelf: "flex-start",
                    },
                  ]}
                >
                  <View style={RegFormStyle.TextIconE}>
                    <TextInput
                      style={RegFormStyle.formcontainerIcon}
                      label=""
                      value={date3 || ""}
                      placeholder="수습기간"
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
                  justifyContent: "space-between",
                }}
              >
                <TextInput
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
                />

                <BouncyCheckbox
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
                <Text style={RegFormStyle.checktext}>아니요</Text>
              </View>

              <View style={RegFormStyle.buttonD}>
                <Button
                  color={"#ffffff"}
                  title="등록하기"
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
    paddingHorizontal: 5,
    alignSelf: "flex-end",
    backgroundColor: "#2E294E",
    marginTop: 30,
  },
  formcontainer: {
    width: 252,
    height: 30,
    marginVertical: "6%",
  },
  searchSelection: {
    borderColor: "#e5e5e5",
    marginVertical: "6%",
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
  },
  icon: {
    justifyContent: "space-between",
    marginLeft: "4%",
  },
  formcontainerIcon: {
    width: 220,
    height: 34,
    textAlign: "left",
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
