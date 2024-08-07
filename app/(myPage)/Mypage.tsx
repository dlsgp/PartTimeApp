import { useEffect, useState } from "react";
import {
  Button,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextInput } from "react-native-paper";
import { router, useRouter } from "expo-router";
import { getUserInfo } from "@/components/src/services/apiService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

const Mypage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [text, setText] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userId = await AsyncStorage.getItem("userId");
      console.log("UserId from AsyncStorage:", userId);
      if (userId) {
        try {
          const data = await getUserInfo(userId);
          console.log("Fetched user data:", data);
          setUserInfo(data);
        } catch (error) {
          console.error("Failed to fetch user info:", error);
        }
      }
    };
    fetchUserInfo();
  }, []);

  if (!userInfo) {
    return (
      <SafeAreaView style={RegFormStyle.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <KeyboardAwareScrollView style={RegFormStyle.maincontainer}>
      <View style={RegFormStyle.container}>
        <View style={RegFormStyle.titleContainer}></View>

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
                // label="이름"
                value={userInfo.name}
                mode="outlined"
                outlineColor="#E5E5E5"
                activeOutlineColor="#219BDA"
                disabled="false"
                theme={{ colors: { background: "white" } }}
                // onChangeText={(text) => setUserData({ ...userData, name: text })}
              />
              <TextInput
                style={RegFormStyle.formcontainer}
                // label="전화번호"
                value={userInfo.tel}
                mode="outlined"
                outlineColor="#E5E5E5"
                activeOutlineColor="#219BDA"
                disabled="false"
                theme={{ colors: { background: "white" } }}
                // onChangeText={(text) => setUserData({ ...userData, tel: text })}
              />
              <TextInput
                style={RegFormStyle.formcontainer}
                // label="이메일"
                value={userInfo.email}
                mode="outlined"
                outlineColor="#E5E5E5"
                activeOutlineColor="#219BDA"
                disabled="false"
                theme={{ colors: { background: "white" } }}
                // onChangeText={(text) => setUserData({ ...userData, email: text })}
              />

              <TextInput
                style={RegFormStyle.formcontainerAad}
                // label="주소"
                value={userInfo.add1}
                mode="outlined"
                outlineColor="#E5E5E5"
                activeOutlineColor="#219BDA"
                disabled="false"
                theme={{ colors: { background: "white" } }}
                // onChangeText={(text) => setUserData({ ...userData, add1: text })}
              />
              <TextInput
                style={RegFormStyle.formcontainerAD}
                label=""
                value={userInfo.add2}
                mode="outlined"
                outlineColor="#E5E5E5"
                activeOutlineColor="#219BDA"
                disabled="false"
                theme={{ colors: { background: "white" } }}
                // onChangeText={(text) => setUserData({ ...userData, add2: text })}
              />
              <View style={RegFormStyle.buttonD}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={RegFormStyle.button2}
                  onPress={() => router.push("/FormBox")}
                >
                  <Text style={RegFormStyle.buttonText}>수정하기</Text>
                </TouchableOpacity>
              </View>

              <TextInput
                style={RegFormStyle.formcontainerB}
                label="사원번호"
                placeholder="사원번호        0001"
                onChangeText={(text) => setText(text)}
                mode="outlined"
                disabled="false"
                theme={{ colors: { background: "white" } }}
              />

              <TextInput
                style={RegFormStyle.formcontainerB}
                label="직급"
                placeholder="직급               알바"
                onChangeText={(text) => setText(text)}
                mode="outlined"
                disabled="false"
                theme={{ colors: { background: "white" } }}
              />

              <TextInput
                style={RegFormStyle.formcontainerB}
                label="시급"
                placeholder="시급               7900"
                onChangeText={(text) => setText(text)}
                mode="outlined"
                disabled="false"
                theme={{ colors: { background: "white" } }}
              />

              <TextInput
                style={RegFormStyle.formcontainerB}
                label="입사일"
                placeholder="입사일            2024-07-10"
                onChangeText={(text) => setText(text)}
                mode="outlined"
                disabled="false"
                theme={{ colors: { background: "white" } }}
              />

              <TextInput
                style={RegFormStyle.formcontainerB}
                label="수습기간"
                placeholder="수습기간         2024-07-10~2024-10-10"
                onChangeText={(text) => setText(text)}
                mode="outlined"
                disabled="false"
                theme={{ colors: { background: "white" } }}
              />

              <TextInput
                style={RegFormStyle.formcontainerB}
                label="4대보험유무"
                placeholder="4대보험유무    아니오"
                onChangeText={(text) => setText(text)}
                mode="outlined"
                disabled="false"
                theme={{ colors: { background: "white" } }}
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
    width: "100%",
    backgroundColor: "#fff",
  },
  container: {
    marginHorizontal: "2%",
  },
  titleContainer: {
    flexDirection: "row",
    marginBottom: "30%",
  },
  keyboardcontainer: {
    flex: 1,
  },
  textInputContainer: {
    marginHorizontal: "2%",
  },
  buttonD: {
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 5,
    alignSelf: "flex-end",
    backgroundColor: "#2E294E",
    marginTop: 30,
    marginBottom: 10,
    marginRight: "4%",
  },
  formcontainer: {
    width: width * 0.7,
    height: height * 0.035,
    marginVertical: "4%",
    marginRight: "4%",
  },
  formcontainerAad: {
    width: width * 0.7,
    height: height * 0.035,
    marginVertical: "2%",
    marginRight: "4%",
  },
  formcontainerAD: {
    width: width * 0.7,
    height: height * 0.035,
    marginRight: "4%",
  },
  formcontainerB: {
    width: width * 0.7,
    height: height * 0.035,
    marginVertical: "4%",
    marginRight: "4%",
  },
  button2: {
    width: 110,
    height: 34,
    borderRadius: 30,
    backgroundColor: "#2E294E",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },
});

export default Mypage;
