import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Checkbox, TextInput, Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API_BASE_URL from "@/config";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

function FormBox() {
  const [employees, setEmployees] = useState([]);
  const [checkedStates, setCheckedStates] = useState({});
  const [editingStates, setEditingStates] = useState({});

  const fetchData = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      const response = await axios.get(`${API_BASE_URL}:3000/api/employees`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      });
      setEmployees(response.data);
    } catch (error) {
      console.error("데이터 가져오기 오류:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatDate = (dateString) => {
    return dateString.substring(0, 10).replace(/-/g, ".");
  };

  const handleCheckboxPress = (id, index) => {
    setCheckedStates((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleEditPress = (id) => {
    setEditingStates((prev) => ({
      ...prev,
      [id]: true,
    }));
  };

  const handleSavePress = (id) => {
    setEditingStates((prev) => ({
      ...prev,
      [id]: false,
    }));
  };

  const renderEmployee = ({ item, index }) => {
    const isEditing = editingStates[item.work_id];
    const isChecked = checkedStates[item.work_id];

    return (
      <View style={FormBoxStyle.subcontainer}>
        <View style={{ alignItems: "center" }}>
          <Image
            style={FormBoxStyle.mobilePhoto}
            source={require("../../assets/images/profile.jpg")}
          />
          <Text style={FormBoxStyle.mobileText}>{item.name}</Text>
          <Text style={FormBoxStyle.mobileText2}>
            {formatDate(item.employ_date)} 입사
          </Text>
          <Text style={FormBoxStyle.mobileText3}>
            ~ {formatDate(item.exp_periodend)}
          </Text>
        </View>

        <View style={FormBoxStyle.iconText}>
          {[...Array(3)].map((_, i) => (
            <View
              key={`${item.work_id}-${i}`} 
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: i < 2 ? "10%" : "0%",
              }}
            >
              <Checkbox
                status={isChecked ? "checked" : "unchecked"}
                onPress={() => handleCheckboxPress(item.work_id, i)}
              />
              {isEditing ? (
                <TextInput
                  value={`${formatDate(item.employ_date)} 출근`}
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
                <Text>{`${formatDate(item.employ_date)} 출근`}</Text>
              )}
              <TouchableOpacity
                activeOpacity={0.8}
                style={FormBoxStyle.mobileIconStyle}
                onPress={() =>
                  isEditing
                    ? handleSavePress(item.work_id)
                    : handleEditPress(item.work_id)
                }
              >
                <FontAwesome
                  name={isEditing ? "save" : "pencil"}
                  size={18}
                  color="#E5E5E5"
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const renderEmployeeCard = ({ item }) => (
    <Card style={FormBoxStyle.card}>
      <Card.Content>
        <Text style={FormBoxStyle.cardText}>사원번호 : {item.staff_number}</Text>
        <Text style={FormBoxStyle.cardText}>이름 : {item.name}</Text>
        <Text style={FormBoxStyle.cardText}>시급 : {item.hourwage} 원</Text>
        <Text style={FormBoxStyle.cardText}>
          입사일 : {formatDate(item.employ_date)}
        </Text>
      </Card.Content>
    </Card>
  );

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
          onPress={() => router.push("/StaffForm")}
        >
          <Text style={FormBoxStyle.buttonText}>작성하기</Text>
          <FontAwesome name="pencil" size={14} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        horizontal
        data={employees}
        renderItem={renderEmployee}
        keyExtractor={(item, index) => `${item.name}-${index}`} 
        showsHorizontalScrollIndicator={false}
        style={FormBoxStyle.employeeList}
      />

      <FlatList
        horizontal
        data={employees}
        renderItem={renderEmployeeCard}
        keyExtractor={(item, index) => `card-${item.work_id}-${index}`}
        showsHorizontalScrollIndicator={false}
        style={FormBoxStyle.cardList}
      />
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
    paddingTop: "10%",
  },
  subcontainer: {
    flex: 1,
    marginHorizontal: 30, // 칸 
  },
  titleContainer: {
    marginBottom: "5%",
    alignSelf: "flex-start",
    backgroundColor: "#2E294E",
    padding: "2%",
    width: "25%",
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
  mobilePhoto: {
    marginTop: "12%",
    width: 124,
    height: 124,
    borderRadius: 80,
  },
  iconText: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "11%",
    alignItems: "center",
  },
  mobileText: {
    fontSize: 18,
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
    marginBottom: "15%",
  },
  mobileIconStyle: {
    paddingLeft: 70,
    fontSize: 18,
  },
  employeeList: {
    marginTop: 20,
    marginBottom: 20,
  },
  cardList: {
    flexGrow: 0,
  },
  card: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
    width: 200,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default FormBox;
