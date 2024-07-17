import React from "react";
import { Image, Platform, StyleSheet, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Checkbox } from "react-native-paper";

function FormBoxApp() {
  const [checked, setChecked] = React.useState(false);
  return (
    <View style={FormBoxStyle.mobileContainer}>
      <View
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Image
          style={FormBoxStyle.mobilePhoto}
          source={require("../../assets/images/profile.jpg")}
        />
        <Text style={FormBoxStyle.mobileText}>홍길동</Text>
        <Text style={FormBoxStyle.mobileText2}>2024.07.10 입사</Text>
        <Text style={FormBoxStyle.mobileText3}>~ 2024.10.10</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 60,
        }}
      >
        <View style={[FormBoxStyle.mobileCheckbox1]}>
          <Checkbox
            status={checked ? "checked" : "unchecked"}
            onPress={() => {
              setChecked(!checked);
            }}
          />
        </View>
        <Text>24.07.11 목요일 출근</Text>
        <View style={FormBoxStyle.mobileIconStyle}>
          <FontAwesome
            icon="fa-sharp fa-solid fa-pen"
            color="#E5E5E5"
            size={18}
          />
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 60,
        }}
      >
        <View style={[FormBoxStyle.mobileCheckbox1]}>
          <Checkbox
            status={checked ? "checked" : "unchecked"}
            onPress={() => {
              setChecked(!checked);
            }}
          />
        </View>
        <Text>24.07.11 목요일 출근</Text>
        <View style={FormBoxStyle.mobileIconStyle}>
          <FontAwesome
            icon="fa-sharp fa-solid fa-pen"
            color="#E5E5E5"
            size={18}
          />
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 60,
        }}
      >
        <View style={[FormBoxStyle.mobileCheckbox1]}>
          <Checkbox
            status={checked ? "checked" : "unchecked"}
            onPress={() => {
              setChecked(!checked);
            }}
          />
        </View>
        <Text>24.07.12 금요일 출근</Text>
        <View style={FormBoxStyle.mobileIconStyle}>
          <FontAwesome
            icon="fa-sharp fa-solid fa-pen"
            color="#E5E5E5"
            size={18}
          />
        </View>
      </View>
    </View>
  );
}

const FormBoxStyle = StyleSheet.create({
  mobileContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
    maxWidth: 766,
    maxHeight: 894,
    ...(Platform.OS === "web" && {
      width: "100%",
    }),
  },
  mobileCheckbox1: {
    marginLeft: 52,
    paddingRight: 46,
    textAlign: "center",
    fontSize: 14,
  },
  mobilePhoto: {
    marginTop: 112,
    width: 124,
    height: 124,
    borderRadius: 80,
  },
  mobileText: {
    fontSize: 18, //-6
    textAlign: "center",
    marginTop: 30,
  },
  mobileText2: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 16,
    textAlign: "center",
  },
  mobileText3: {
    fontSize: 12,
    marginTop: 4,
    textAlign: "center",
    marginBottom: 90,
  },
  mobileIconStyle: {
    paddingLeft: 70,
    fontSize: 18,
    // ...(Platform.OS === "web" && {
    //   paddingLeft: "100%",
    // }),
  },
});

export default FormBoxApp;
