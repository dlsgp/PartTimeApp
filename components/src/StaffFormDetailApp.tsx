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
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import DatePicker from "@/components/src/Calendar";

const StaffFormApp = () => {
  const [text, setText] = useState("");
  const { colors } = useTheme();
  const [date, setDate] = useState<string | null>(null); // date variable
  const [showDatePicker, setShowDatePicker] = useState(false);

  function handleChange(propDate: string) {
    setDate(propDate);
    setText(propDate);
  }

  function toggleDatePicker() {
    setShowDatePicker((prevState) => !prevState);
  }
  return (
    <KeyboardAwareScrollView style={RegFormStyle.maincontainer}>
      <View>
        <View style={RegFormStyle.container}>
          <Text
            style={{
              fontSize: 32,
              fontFamily: "MangoDdobak-R",
              fontWeight: "bold",
              marginTop: "10%",
              color: "#2E294E",
            }}
          >
            상세보기
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              width: 100,
              height: 100,
              alignItems: "center",
              marginRight: 20,
              marginTop: 10,
            }}
          >
            <Image
              source={require("../../assets/images/profile.jpg")}
              style={{ width: 100, height: 100 }}
            />
          </View>

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={RegFormStyle.keyboardcontainer}
          >
            <TextInput
              style={RegFormStyle.formcontainer}
              label="이름"
              onChangeText={(text) => setText(text)}
              mode="outlined"
              outlineColor="lightgray"
            />
            <TextInput
              style={RegFormStyle.formcontainer}
              label="사원번호"
              onChangeText={(text) => setText(text)}
              mode="outlined"
              outlineColor="lightgray"
            />
            <TextInput
              style={RegFormStyle.formcontainer}
              label="직급"
              onChangeText={(text) => setText(text)}
              mode="outlined"
              outlineColor="lightgray"
            />
            <TextInput
              style={RegFormStyle.formcontainer}
              label="전화번호"
              onChangeText={(text) => setText(text)}
              mode="outlined"
              outlineColor="lightgray"
            />
            <TextInput
              style={RegFormStyle.formcontainer}
              label="이메일"
              onChangeText={(text) => setText(text)}
              mode="outlined"
              outlineColor="lightgray"
            />
            <TextInput
              style={RegFormStyle.formcontainer}
              label="주소"
              onChangeText={(text) => setText(text)}
              mode="outlined"
              outlineColor="lightgray"
            />
            <TextInput
              style={RegFormStyle.formcontainer}
              label="시급"
              onChangeText={(text) => setText(text)}
              mode="outlined"
              outlineColor="lightgray"
            />
            <View style={RegFormStyle.searchSelection}>
              <TextInput
                style={RegFormStyle.formcontainerIcon}
                label=""
                value={date || ""}
                placeholder="입사일"
                onChangeText={(text) => setText(text)}
                mode="outlined"
              ></TextInput>
              <TouchableOpacity
                style={{ padding: 5 }}
                onPress={toggleDatePicker}
              >
                <FontAwesome name="calendar-o" size={24} color="e5e5e5" />
                {showDatePicker && (
                  <DatePicker
                    mode="calendar"
                    selected={date || ""}
                    onDateChange={handleChange}
                    visible={showDatePicker}
                  />
                )}
              </TouchableOpacity>
            </View>

            <View style={RegFormStyle.searchSelection}>
              <TextInput
                style={RegFormStyle.formcontainerIconE}
                label=""
                value={date || ""}
                placeholder="수습기간"
                onChangeText={(text) => setText(text)}
                mode="outlined"
              ></TextInput>
              <TouchableOpacity style={{ padding: 5 }}>
                <FontAwesome name="calendar-o" size={24} color="e5e5e5" />
                {showDatePicker && (
                  <DatePicker
                    mode="calendar"
                    selected={date || ""}
                    onDateChange={handleChange}
                    visible={showDatePicker}
                  />
                )}
              </TouchableOpacity>
              <Text style={{ paddingLeft: 15, paddingTop: 10, flex: 0.5 }}>
                ~
              </Text>
              <TextInput
                style={RegFormStyle.formcontainerIconE}
                label=""
                value={date || ""}
                placeholder="수습기간"
                onChangeText={(text) => setText(text)}
                mode="outlined"
              ></TextInput>
              <TouchableOpacity style={{ padding: 5 }}>
                <FontAwesome name="calendar-o" size={24} color="e5e5e5" />
                {showDatePicker && (
                  <DatePicker
                    mode="calendar"
                    selected={date || ""}
                    onDateChange={handleChange}
                    visible={showDatePicker}
                  />
                )}
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: "row",
                display: "flex",
                padding: 2,
                marginRight: 5,
              }}
            >
              <TextInput
                style={{
                  alignSelf: "flex-start",
                  textAlign: "auto",
                  height: 30,
                  width: 100,
                  color: "#ffffff", // 글씨 색 변경
                  backgroundColor: "#ffffff", // 폼 내부 색 변경
                }}
                label=""
                value=""
                placeholder="4대보험유무"
                onChangeText={(text) => setText(text)}
                mode="flat"
                disabled="false"
              />

              <View
                style={{
                  alignSelf: "auto",
                  flexDirection: "row",
                  paddingLeft: 15,
                }}
              >
                <BouncyCheckbox
                  size={25}
                  fillColor="#2e2e2e"
                  iconStyle={{
                    borderRadius: 50,
                  }}
                  onPress={(isChecked: boolean) => {}}
                />
                <Text style={RegFormStyle.checkyestext}>예</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "auto",
                }}
              >
                <BouncyCheckbox
                  size={25}
                  fillColor="#2e2e2e"
                  iconStyle={{
                    borderRadius: 50,
                  }}
                  onPress={(isChecked: boolean) => {}}
                />
                <Text style={RegFormStyle.checknotext}>아니요</Text>
              </View>
            </View>

            <View style={RegFormStyle.buttonD}>
              <Button
                color={"#ffffff"}
                title="수정하기"
                onPress={() => console.log("저장 버튼 클릭")}
              />
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
  },
  container: {
    flexDirection: "row",
    flex: 1,
    paddingRight: "2%",
    alignSelf: "flex-start",
    marginTop: "2%",
    paddingVertical: "auto",
  },
  keyboardcontainer: {
    flex: 1,
  },

  checkyesorno: {
    alignItems: "center",
  },
  checkyestext: {
    fontSize: 18,
    fontFamily: "GmarketSansTTFBold",
    fontWeight: "700",
    margin: "auto",
  },
  checknotext: {
    fontSize: 18,
    fontFamily: "GmarketSansTTFBold",
    fontWeight: "700",
    margin: "auto",
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
    width: 250,
    height: 30,
    marginTop: 5,
    marginBottom: 20,
  },
  searchSelection: {
    flexDirection: "row",
    borderColor: "#000",
  },
  formcontainerIcon: {
    width: 220,
    height: 30,
    marginTop: 5,
    marginBottom: 20,
  },
  formcontainerIconE: {
    width: 80,
    height: 30,
    marginTop: 5,
    marginBottom: 20,
  },
});
export default StaffFormApp;
