import { useEffect, useState } from "react";
import {
  Button,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextInput } from "react-native-paper";
import { router, useRouter } from "expo-router";
import {
  getUserInfo,
  updateUserInfo,
} from "@/components/src/services/apiService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import Postcode from "@actbase/react-daum-postcode";

const { width, height } = Dimensions.get("window");

const Mypage = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    tel: "",
    email: "",
    add1: "",
    add2: "",
    postcode: "",
  });
  const [text, setText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [postcodeModalVisible, setPostcodeModalVisible] = useState(false);
  const [originalUserInfo, setOriginalUserInfo] = useState(null);
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
          setOriginalUserInfo(data);
        } catch (error) {
          console.error("Failed to fetch user info:", error);
        }
      }
    };
    fetchUserInfo();
  }, []);

  const handleSave = async () => {
    const userId = await AsyncStorage.getItem("userId");
    try {
      await updateUserInfo(userId, userInfo);
      setIsEditing(false);
      setOriginalUserInfo(userInfo);
      alert("정보가 성공적으로 수정되었습니다.");
    } catch (error) {
      console.error("Failed to update user info:", error);
      alert("정보 수정에 실패했습니다.");
    }
  };

  const handleCancel = () => {
    setUserInfo(originalUserInfo);
    setIsEditing(false);
  };

  const handleAddressComplete = (data) => {
    setUserInfo({ ...userInfo, postcode: data.zonecode, add1: data.address });
    setPostcodeModalVisible(false);
  };

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
                label="이름"
                value={userInfo.name}
                mode="outlined"
                outlineColor="#E5E5E5"
                activeOutlineColor="#219BDA"
                disabled
                theme={{ colors: { background: "white" } }}
                // onChangeText={(text) => setUserData({ ...userData, name: text })}
              />
              <TextInput
                style={RegFormStyle.formcontainer}
                label="전화번호"
                value={userInfo.tel}
                mode="outlined"
                outlineColor="#E5E5E5"
                activeOutlineColor="#219BDA"
                editable={isEditing}
                theme={{ colors: { background: "white" } }}
                onChangeText={(text) => setUserInfo({ ...userInfo, tel: text })}
              />
              <TextInput
                style={RegFormStyle.formcontainer}
                label="이메일"
                value={userInfo.email}
                mode="outlined"
                outlineColor="#E5E5E5"
                activeOutlineColor="#219BDA"
                editable={isEditing}
                theme={{ colors: { background: "white" } }}
                onChangeText={(text) =>
                  setUserInfo({ ...userInfo, email: text })
                }
              />

              {isEditing && (
                <View style={RegFormStyle.postcode}>
                  <TextInput
                    style={RegFormStyle.postcodeinput}
                    label="우편번호"
                    value={userInfo.postcode}
                    mode="outlined"
                    outlineColor="#E5E5E5"
                    activeOutlineColor="#219BDA"
                    editable={false}
                    theme={{ colors: { background: "white" } }}
                  />
                  <View style={RegFormStyle.postcodesearch}>
                    <TouchableOpacity
                      style={RegFormStyle.button2}
                      onPress={() => setPostcodeModalVisible(true)}
                    >
                      <Text style={RegFormStyle.buttonText}>우편번호 찾기</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              <TextInput
                style={RegFormStyle.formcontainerAad}
                label="주소"
                value={userInfo.add1}
                mode="outlined"
                outlineColor="#E5E5E5"
                activeOutlineColor="#219BDA"
                editable={isEditing}
                theme={{ colors: { background: "white" } }}
                onChangeText={(text) =>
                  setUserInfo({ ...userInfo, add1: text })
                }
              />
              <TextInput
                style={RegFormStyle.formcontainerAD}
                label="상세주소"
                value={userInfo.add2}
                mode="outlined"
                outlineColor="#E5E5E5"
                activeOutlineColor="#219BDA"
                editable={isEditing}
                theme={{ colors: { background: "white" } }}
                onChangeText={(text) =>
                  setUserInfo({ ...userInfo, add2: text })
                }
              />
              <View>
                {isEditing ? (
                  <View style={RegFormStyle.buttonContainer}>
                    <View style={RegFormStyle.buttonD}>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        style={RegFormStyle.button2}
                        onPress={handleCancel}
                      >
                        <Text style={RegFormStyle.buttonText}>취소하기</Text>
                      </TouchableOpacity>
                    </View>

                    <View style={RegFormStyle.buttonD}>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        style={RegFormStyle.button2}
                        onPress={handleSave}
                      >
                        <Text style={RegFormStyle.buttonText}>저장하기</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  <View style={RegFormStyle.buttonD}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={RegFormStyle.button2}
                      onPress={() => setIsEditing(true)}
                    >
                      <Text style={RegFormStyle.buttonText}>수정하기</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>

              <TextInput
                style={RegFormStyle.formcontainerB}
                label="사원번호"
                placeholder="사원번호        0001"
                onChangeText={(text) => setText(text)}
                mode="outlined"
                disabled
                theme={{ colors: { background: "white" } }}
              />

              <TextInput
                style={RegFormStyle.formcontainerB}
                label="직급"
                placeholder="직급               알바"
                onChangeText={(text) => setText(text)}
                mode="outlined"
                disabled
                theme={{ colors: { background: "white" } }}
              />

              <TextInput
                style={RegFormStyle.formcontainerB}
                label="시급"
                placeholder="시급               7900"
                onChangeText={(text) => setText(text)}
                mode="outlined"
                disabled
                theme={{ colors: { background: "white" } }}
              />

              <TextInput
                style={RegFormStyle.formcontainerB}
                label="입사일"
                placeholder="입사일            2024-07-10"
                onChangeText={(text) => setText(text)}
                mode="outlined"
                disabled
                theme={{ colors: { background: "white" } }}
              />

              <TextInput
                style={RegFormStyle.formcontainerB}
                label="수습기간"
                placeholder="수습기간         2024-07-10~2024-10-10"
                onChangeText={(text) => setText(text)}
                mode="outlined"
                disabled
                theme={{ colors: { background: "white" } }}
              />

              <TextInput
                style={RegFormStyle.formcontainerB}
                label="4대보험유무"
                placeholder="4대보험유무    아니오"
                onChangeText={(text) => setText(text)}
                mode="outlined"
                disabled
                theme={{ colors: { background: "white" } }}
              />
            </View>
          </KeyboardAvoidingView>
        </View>
        <Modal
          visible={postcodeModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setPostcodeModalVisible(false)}
        >
          <View style={RegFormStyle.modalContainer}>
            <View style={RegFormStyle.modalContent}>
              <Postcode
                style={{ width: "100%", height: "100%" }}
                jsOptions={{ animation: true }}
                onSelected={handleAddressComplete}
              />
              <TouchableOpacity
                onPress={() => setPostcodeModalVisible(false)}
                style={RegFormStyle.closeButton}
              >
                <Text style={RegFormStyle.closeButtonText}>닫기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
    marginBottom: "10%",
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
    marginRight: "12%",
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
  postcode: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: "4%",
  },
  postcodeinput: {
    width: 110,
    height: 34,
    marginRight: "4%",
  },
  postcodesearch: {
    justifyContent: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: width * 0.9,
    height: height * 0.65,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#2E294E",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 5,
    alignSelf: "flex-end",
    marginRight: "15%",
  },
});

export default Mypage;
