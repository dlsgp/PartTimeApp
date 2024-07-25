import * as React from "react";
import { useState } from "react";
import {
  Button,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextInput } from "react-native-paper";
import { router } from "expo-router";

const Mypage = () => {
  const [text, setText] = useState("");
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
                onChangeText={(text) => setText(text)}
                mode="outlined"
                outlineColor="#E5E5E5"
                activeOutlineColor="#219BDA"
                theme={{ colors: { background: "white" } }}
              />
              <TextInput
                style={RegFormStyle.formcontainer}
                label="전화번호"
                onChangeText={(text) => setText(text)}
                mode="outlined"
                outlineColor="#E5E5E5"
                activeOutlineColor="#219BDA"
                theme={{ colors: { background: "white" } }}
              />
              <TextInput
                style={RegFormStyle.formcontainer}
                label="이메일"
                onChangeText={(text) => setText(text)}
                mode="outlined"
                outlineColor="#E5E5E5"
                activeOutlineColor="#219BDA"
                theme={{ colors: { background: "white" } }}
              />

              <TextInput
                style={RegFormStyle.formcontainerAad}
                label="주소"
                onChangeText={(text) => setText(text)}
                mode="outlined"
                outlineColor="#E5E5E5"
                activeOutlineColor="#219BDA"
                theme={{ colors: { background: "white" } }}
              />
              <TextInput
                style={RegFormStyle.formcontainerAD}
                label=""
                onChangeText={(text) => setText(text)}
                mode="outlined"
                outlineColor="#E5E5E5"
                activeOutlineColor="#219BDA"
                theme={{ colors: { background: "white" } }}
              />
              <View style={RegFormStyle.buttonD}>
                <Button
                  color={"#ffffff"}
                  title="수정하기"
                  onPress={() => router.push("/FormBox")}
                />
              </View>

              <TextInput
                style={RegFormStyle.formcontainerB}
                label=""
                placeholder="사원번호        0001"
                onChangeText={(text) => setText(text)}
                mode="outlined"
                disabled="false"
                theme={{ colors: { background: "white" } }}
              />

              <TextInput
                style={RegFormStyle.formcontainerB}
                label=""
                placeholder="직급               알바"
                onChangeText={(text) => setText(text)}
                mode="outlined"
                disabled="false"
                theme={{ colors: { background: "white" } }}
              />

              <TextInput
                style={RegFormStyle.formcontainerB}
                label=""
                placeholder="시급               7900"
                onChangeText={(text) => setText(text)}
                mode="outlined"
                disabled="false"
                theme={{ colors: { background: "white" } }}
              />

              <TextInput
                style={RegFormStyle.formcontainerB}
                label=""
                placeholder="입사일            2024-07-10"
                onChangeText={(text) => setText(text)}
                mode="outlined"
                disabled="false"
                theme={{ colors: { background: "white" } }}
              />

              <TextInput
                style={RegFormStyle.formcontainerB}
                label=""
                placeholder="수습기간         2024-07-10~2024-10-10"
                onChangeText={(text) => setText(text)}
                mode="outlined"
                disabled="false"
                theme={{ colors: { background: "white" } }}
              />

              <TextInput
                style={RegFormStyle.formcontainerB}
                label=""
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
    width: 272,
    height: 26,
    marginVertical: "4%",
    marginRight: "4%",
  },
  formcontainerAad: {
    width: 272,
    height: 26,
    marginVertical: "2%",
    marginRight: "4%",
  },
  formcontainerAD: {
    width: 272,
    height: 26,
    marginRight: "4%",
  },
  formcontainerB: {
    width: 272,
    height: 26,
    marginVertical: "4%",
    marginRight: "4%",
  },
});

export default Mypage;
