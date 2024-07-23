import * as React from "react";
import { StatusBar } from "expo-status-bar";
import DatePicker from "react-native-modern-datepicker";
import { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Modal } from "react-native";

export default function TabOneScreen({onDateChange}) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<string | null>(null);
  const [select, setSelect] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  function handleOnPress() {
    setOpen(!open);
  }

  function handleChange(propDate: string) {
    setDate(propDate);
    onDateChange(propDate);
  }



  return (
    <View style={styles.Calendarcontainer}>
      <Modal animationType="slide" transparent={true} visible={open}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <DatePicker
              mode="calendar"
              selected={date || ""}
              onDateChange={handleChange}
            />

            <TouchableOpacity onPress={handleOnPress}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  Calendarcontainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  centeredView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    width: "90%",
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
