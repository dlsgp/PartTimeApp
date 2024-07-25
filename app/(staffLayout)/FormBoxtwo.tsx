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
import { Checkbox, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

function FormBoxtwo() {
  const [text1, setText1] = React.useState<string | undefined>(
    "24.07.10 수요일 출근"
  );
  const [text2, setText2] = React.useState<string | undefined>(
    "24.07.11 목요일 출근"
  );
  const [text3, setText3] = React.useState<string | undefined>(
    "24.07.12 금요일 출근"
  );

  const [isEditing1, setIsEditing1] = React.useState(false);
  const [isEditing2, setIsEditing2] = React.useState(false);
  const [isEditing3, setIsEditing3] = React.useState(false);

  const [checked1, setChecked1] = React.useState(false);
  const [checked2, setChecked2] = React.useState(false);
  const [checked3, setChecked3] = React.useState(false);
  const navigation = useNavigation();

  const handleEditPress1 = () => {
    setIsEditing1(true);
  };

  const handleSavePress1 = () => {
    setIsEditing1(false);
  };

  const handleEditPress2 = () => {
    setIsEditing2(true);
  };

  const handleSavePress2 = () => {
    setIsEditing2(false);
  };

  const handleEditPress3 = () => {
    setIsEditing3(true);
  };

  const handleSavePress3 = () => {
    setIsEditing3(false);
  };

  return (
    <View style={FormBoxStyle.mobileContainer}>
      <View style={FormBoxStyle.titleContainer}>
        <Text style={FormBoxStyle.title}>직원관리</Text>
      </View>

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
          onPress={() => router.push("/StaffFormDetailApp")}
        >
          <Text style={FormBoxStyle.buttonText}>작성하기</Text>
          <View>
            <FontAwesome name="pencil" size={14} color="#fff" />
          </View>
        </TouchableOpacity>
      </View>
      <View style={FormBoxStyle.subcontainer}>
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
                status={checked1 ? "checked" : "unchecked"}
                onPress={() => {
                  setChecked1(!checked1);
                }}
              />
            </View>
            {isEditing1 ? (
              <TextInput
                value={text1 ?? ""}
                onChangeText={setText1}
                mode="flat"
                theme={{ colors: { primary: "transparent" } }}
                style={{
                  borderWidth: 0,
                  backgroundColor: "white",
                  paddingHorizontal: 0,
                  paddingVertical: 0,
                }}
              />
            ) : (
              <Text>{text1 ?? ""}</Text>
            )}
            <View style={FormBoxStyle.mobileIconStyle}>
              {isEditing1 ? (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={handleSavePress1}
                >
                  <FontAwesome name="save" size={18} color="#E5E5E5" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={handleEditPress1}
                >
                  <FontAwesome name="pencil" size={18} color="#E5E5E5" />
                </TouchableOpacity>
              )}
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
                status={checked2 ? "checked" : "unchecked"}
                onPress={() => {
                  setChecked2(!checked2);
                }}
              />
            </View>
            {isEditing2 ? (
              <TextInput
                value={text2 ?? ""}
                onChangeText={setText2}
                mode="flat"
                style={{
                  borderWidth: 0,
                  backgroundColor: "white",
                  paddingHorizontal: 0,
                  paddingVertical: 0,
                }}
              />
            ) : (
              <Text>{text2 ?? ""}</Text>
            )}
            <View style={FormBoxStyle.mobileIconStyle}>
              {isEditing2 ? (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={handleSavePress2}
                >
                  <FontAwesome name="save" size={18} color="#E5E5E5" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={handleEditPress2}
                >
                  <FontAwesome name="pencil" size={18} color="#E5E5E5" />
                </TouchableOpacity>
              )}
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
                status={checked3 ? "checked" : "unchecked"}
                onPress={() => {
                  setChecked3(!checked3);
                }}
              />
            </View>
            {isEditing3 ? (
              <TextInput
                value={text3 ?? ""}
                onChangeText={setText3}
                mode="flat"
                style={{
                  borderWidth: 0,
                  backgroundColor: "white",
                  paddingHorizontal: 0,
                  paddingVertical: 0,
                }}
              />
            ) : (
              <Text>{text3 ?? ""}</Text>
            )}
            <View style={FormBoxStyle.mobileIconStyle}>
              {isEditing3 ? (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={handleSavePress3}
                >
                  <FontAwesome name="save" size={18} color="#E5E5E5" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={handleEditPress3}
                >
                  <FontAwesome name="pencil" size={18} color="#E5E5E5" />
                </TouchableOpacity>
              )}
            </View>
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
  titleContainer: {
    marginBottom: "8%",
    alignSelf: "flex-start",
    backgroundColor: "#2E294E",
    padding: "2%",
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

export default FormBoxtwo;
