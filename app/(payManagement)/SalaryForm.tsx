import React, { useState, useEffect } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { RadioButton, TextInput } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import axios from "axios";
import API_BASE_URL from "../../config";

export default function SalaryForm({ selectedCard, onClose }) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [hourwage, setHourwage] = useState("");
  const [bonuswage, setBonuswage] = useState("");
  const [etcwage, setEtcwage] = useState("");
  const [checked, setChecked] = useState("yes");
  const [workTime, setWorkTime] = useState("");

  const [open, setOpen] = useState(false);
  const [week, setWeek] = useState(null);
  const [items, setItems] = useState([
    { label: "첫째주", value: "worktime1" },
    { label: "둘째주", value: "worktime2" },
    { label: "셋째주", value: "worktime3" },
    { label: "넷째주", value: "worktime4" },
    { label: "다섯째주", value: "worktime5" },
  ]);

  useEffect(() => {
    if (selectedCard) {
      setId(selectedCard.WORK_ID);
      setName(selectedCard.NAME);
      setHourwage(selectedCard.HOURWAGE);
      setBonuswage(selectedCard.HOLIDAY_PAY);
      setEtcwage(selectedCard.ETC);
      setChecked(selectedCard.INSURANCE === 1 ? "no" : "yes");
      setWorkTime(selectedCard.WORKTIME);
    }
  }, [selectedCard]);

  const handleSave = async () => {
    try {
      const data = {
        id,
        name,
        hourwage,
        bonuswage,
        etcwage,
        insurance: checked === "yes" ? 1 : 0,
        // worktime1: week === "worktime1" ? workTime : null,
        // worktime2: week === "worktime2" ? workTime : null,
        // worktime3: week === "worktime3" ? workTime : null,
        // worktime4: week === "worktime4" ? workTime : null,
        // worktime5: week === "worktime5" ? workTime : null,
        workTime,
      };

      const response = await axios.post(
        `${API_BASE_URL}:3000/api/update-salary`,
        data,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        alert("저장되었습니다.");
        onClose(); // 저장 후 모달을 닫음
      }
    } catch (error) {
      console.error("저장 오류:", error);
      alert("저장에 실패했습니다.");
    }
  };

  return (
    <View style={styles.container}>
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
                style={styles.input}
                disabled
              />
              <TextInput
                label="이름"
                value={name}
                style={styles.input}
                disabled
              />
              <TextInput
                label="시급"
                value={hourwage}
                onChangeText={setHourwage}
                style={styles.input}
              />
              <Text style={styles.checkText}>4대보험유무</Text>
              <View style={styles.radioGroup}>
                <RadioButton.Group
                  onValueChange={(newValue) => setChecked(newValue)}
                  value={checked}
                >
                  <View style={styles.radio}>
                    <Text style={styles.checktext1}>예</Text>
                    <RadioButton value="yes" />
                    <Text style={styles.checktext1}>아니요</Text>
                    <RadioButton value="no" />
                  </View>
                </RadioButton.Group>
              </View>
            </View>
          </View>

          <TextInput
            label="주휴수당"
            value={bonuswage}
            onChangeText={setBonuswage}
            style={styles.input}
          />
          <TextInput
            label="기타수당"
            value={etcwage}
            onChangeText={setEtcwage}
            style={styles.input}
          />
          <View style={styles.checkContainer}>
            <Text style={styles.time}>근무시간</Text>
            <View style={styles.timeContainer}>
              <DropDownPicker
                open={open}
                value={week}
                items={items}
                setOpen={setOpen}
                setValue={setWeek}
                setItems={setItems}
                placeholder="주 선택"
                style={[styles.dropdown, { zIndex: 1000, elevation: 1000 }]}
                dropDownContainerStyle={[
                  styles.dropdownContainer,
                  { zIndex: 1000, elevation: 1000 },
                ]}
              />
            </View>
            <TextInput
              label="근무시간 입력"
              value={workTime}
              onChangeText={setWorkTime}
              style={styles.input}
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text style={styles.buttonText}>저장하기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>취소하기</Text>
            </TouchableOpacity>
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
    width: "15%",
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
    width: "85%",
    height: "100%",
    backgroundColor: "white",
  },
  containSub: {
    margin: "4%",
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
    marginBottom: 10,
  },
  checkContainer: {
    marginTop: "6%",
  },
  checkText: {
    fontSize: 16,
    color: "#454545",
    marginRight: "6%",
    marginTop: 15,
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
    marginLeft: "5%",
    marginTop: 5,
  },
  timeContainer: {
    flexDirection: "row",
    marginLeft: "8%",
    justifyContent: "space-between",
    marginTop: "-12%",
    zIndex: 10000,
  },
  dropdown: {
    backgroundColor: "#fff",
    borderColor: "#2E294E",
    borderWidth: 1,
    width: "50%",
    alignSelf: "flex-end",
    marginRight: "10%",
    zIndex: 100,
  },
  dropdownContainer: {
    borderColor: "#2E294E",
    alignSelf: "flex-end",
    maxWidth: "50%",
    marginRight: "10%",
    zIndex: 100,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "20%",
    zIndex: -1000,
  },
  button: {
    borderRadius: 30,
    backgroundColor: "#2E294E",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginLeft: 15,
    zIndex: -1000,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },
});
