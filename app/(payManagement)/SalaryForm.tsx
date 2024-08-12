import EditScreenInfo from "@/components/EditScreenInfo";
import { FontAwesome } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { Checkbox, RadioButton, TextInput } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import { Stack } from "expo-router";

export default function SalaryForm() {
  const [name, setName] = React.useState("");
  const [id, setId] = React.useState("");
  const [position, setPosition] = React.useState("");
  const [hourwage, setHourwage] = React.useState("");
  const [bonuswage, setBonuswage] = React.useState("");
  const [etcwage, setEtcwage] = React.useState("");
  const [checked, setChecked] = React.useState("first");

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "첫째주", value: "첫째주" },
    { label: "둘째주", value: "둘째주" },
    { label: "셋째주", value: "셋째주" },
    { label: "넷째주", value: "넷째주" },
    { label: "다섯째주", value: "다섯째주" },
  ]);

  return (
    <View style={[styles.container]}>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      <View style={styles.subContainer}>
        <View style={styles.barContainer}>
          <View style={[styles.icon, { marginTop: "20%" }]}>
            <FontAwesome name="chevron-circle-up" size={32} color="#FFBD00" />
          </View>
          <View style={styles.icon}>
            <FontAwesome name="chevron-circle-down" size={32} color="#FFBD00" />
          </View>
        </View>

        <View style={styles.containContainer}>
          <View style={styles.containSub}>
            <View>
              <Text style={styles.title}>급여관리</Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                label="아이디"
                value={id}
                onChangeText={(text) => setId(text)}
                style={styles.input}
              />
              <TextInput
                label="이름"
                value={name}
                onChangeText={(text) => setName(text)}
                style={styles.input}
              />
              {/* <TextInput
                label="직급"
                value={position}
                onChangeText={(text) => setPosition(text)}
                style={styles.input}
              /> */}
              <TextInput
                label="시급"
                value={hourwage}
                onChangeText={(text) => setHourwage(text)}
                style={styles.input}
              />
              <Text style={styles.checkText}>4대보험유무</Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                
                <View style={styles.radioGroup}>
                  <View style={styles.radio}>
                    <Text style={styles.checktext1}>예</Text>
                    <RadioButton
                      value="yes"
                      status={checked === "yes" ? "checked" : "unchecked"}
                      onPress={() => setChecked("yes")}
                    />
                    <Text style={styles.checktext1}>아니요</Text>
                    <RadioButton
                      value="no"
                      status={checked === "no" ? "checked" : "unchecked"}
                      onPress={() => setChecked("no")}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>

          <TextInput
            label="주휴수당"
            value={bonuswage}
            onChangeText={(text) => setBonuswage(text)}
            style={styles.input}
          />
          <TextInput
            label="기타수당"
            value={etcwage}
            onChangeText={(text) => setEtcwage(text)}
            style={styles.input}
          />
          <View style={styles.checkContainer}>
            <View style={styles.timeContainer}>
              <View style={{ justifyContent: "center" }}>
                <Text style={styles.time}>근무시간</Text>
              </View>
              <View>
                <DropDownPicker
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
                  placeholder="주 선택"
                  style={styles.dropdown}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  subContainer: {
    width: "86%",
    height: "86%",
    borderTopRightRadius: 30,
    borderBottomEndRadius: 30,
    flexDirection: "row",
  },
  barContainer: {
    backgroundColor: "#2E294E",
    width: "30%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  icon: {
    padding: "10%",
    alignItems: "center",
  },
  containContainer: {
    borderColor: "#eee",
    borderStyle: "solid",
    borderTopRightRadius: 30,
    borderBottomEndRadius: 30,
    borderWidth: 1,
    width: "70%",
    height: "100%",
    backgroundColor: "white",
  },
  containSub: {
    margin: "4%",
  },
  textContainer: {
    display: "flex",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
  },
  inputContainer: {
    marginVertical: "8%",
  },
  input: {
    backgroundColor: "white",
  },
  checkContainer: {
    marginTop: "6%",
  },
  checkText: {
    fontSize: 16,
    color: "#454545",
    marginRight: "6%",
    
  },
  radioGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  radio: {
    flexDirection: "row",
    alignItems: "center",
  },
  checktext1: {
    fontSize: 16,
    color: "#454545",
    marginRight: 10,
  },
  time: {
    fontSize: 16,
    color: "#454545",
    marginTop: "2%",
  },
  timeContainer: {
    flexDirection: "row",
    marginLeft: "8%",
    justifyContent: "space-between",
  },
  dropdown: {
    backgroundColor: "#fff",
    borderColor: "#2E294E",
    borderWidth: 1,
    marginHorizontal: "6%",
    width: "70%",
  },
});

