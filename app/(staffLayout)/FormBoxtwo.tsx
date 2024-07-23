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
import { router } from "expo-router";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

function FormBox() {
  const [checked, setChecked] = React.useState(false);
  const navigation = useNavigation();

  return (
    <View style={FormBoxStyle.mobileContainer}>
      <View style={FormBoxStyle.buttonContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            FormBoxStyle.button,
            {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
          onPress={() => router.push("/StaffFormApp")}
        >
          <Text style={FormBoxStyle.buttonText}>작성하기</Text>
          <View>
            <FontAwesome name="pencil" size={14} color="#fff" />
          </View>
        </TouchableOpacity>
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
    paddingTop: "16%",
  },
  subcontainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginLeft: "12%",
    color: "white",
  },
  buttonContainer: {
    alignSelf: "flex-end",
    marginRight: "4%",
  },
  button: {
    width: 110,
    height: 34,
    borderRadius: 30,
    backgroundColor: "#2E294E",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    marginRight: "6%",
  },

  mobileCheckbox1: {
    marginLeft: "16%",
    paddingRight: "12%",
    textAlign: "center",
    fontSize: 14,
  },
  mobilePhoto: {
    marginTop: "12%",
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
  },
});

export default FormBox;
