import React from "react";
import {
  Alert,
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Checkbox } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import StaffFormApp from "./StaffFormApp";

function FormBoxApp() {
  const [checked, setChecked] = React.useState(false);
  const navigation = useNavigation();

  return (
    <View style={FormBoxStyle.mobileContainer}>
      <View style={FormBoxStyle.titleContainer}>
        <Text style={FormBoxStyle.title}>직원관리</Text>
      </View>
      <View style={FormBoxStyle.buttonContainer}>
<<<<<<< Updated upstream:components/src/FormBoxApp.tsx
        <Button
          title="작성하기"
          onPress={() => {
            navigation.navigate({ name: "StaffFormApp" });
          }}
        />
=======
        <TouchableOpacity onPress={() => {}}>
          <Text>작성하기</Text>
        </TouchableOpacity>
>>>>>>> Stashed changes:app/(staffLayout)/FormBox.tsx
      </View>

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
        <Text style={FormBoxStyle.mobileText3}>~ 2024.10.09</Text>
      </View>
      <View style={FormBoxStyle.iconText}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: "10%",
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
            <FontAwesome name="pencil" size={18} color="#E5E5E5" />
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: "10%",
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
            <FontAwesome name="pencil" size={18} color="#E5E5E5" />
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
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
            <FontAwesome name="pencil" size={18} color="#E5E5E5" />
          </View>
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
    width: "100%",
    height: "100%",
  },
  titleContainer: {
    alignSelf: "flex-start",
    backgroundColor: "#2E294E",
    paddingRight: "2%",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginLeft: "12%",
    color: "white",
  },
  buttonContainer: {
    alignSelf: "flex-end",
    backgroundColor: "white",
    shadowColor: "#eee",
    shadowOpacity: 0.8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    borderRadius: 30,
    paddingHorizontal: "2%",
    marginRight: "4%",
  },
  mobileCheckbox1: {
    marginLeft: "16%",
    paddingRight: "12%",
    textAlign: "center",
    fontSize: 14,
  },
  mobilePhoto: {
    marginTop: "18%",
    width: 124,
    height: 124,
    borderRadius: 80,
  },
  iconText: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10%",
  },
  mobileText: {
    fontSize: 18, //-6
    textAlign: "center",
    marginTop: "6%",
    paddingHorizontal: "2%",
    backgroundColor: "#2E294E",
    color: "white",
  },
  mobileText2: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: "2%",
    textAlign: "center",
  },
  mobileText3: {
    fontSize: 12,
    marginTop: "2%",
    textAlign: "center",
    marginBottom: "16%",
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
