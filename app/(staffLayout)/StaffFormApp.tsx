import * as React from "react";
import { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Button,
} from "react-native";
import { TextInput } from "react-native-paper";
import BouncyCheckbox from "react-native-bouncy-checkbox";

const StaffFormApp = () => {
  const [text, setText] = useState("");

  return (
    <ScrollView style={RegFormStyle.maincontainer}>
      <View>
        <View style={RegFormStyle.container}>
          <Text
            style={{
              fontSize: 22,
              fontFamily: "MangoDdobak-R",
              fontWeight: "bold",
            }}
          >
            직원등록
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              width: 100,
              height: 100,
              alignItems: "center",
              marginRight: 20,
            }}
          >
            <Image
              source={require("../../assets/images/profile.jpg")}
              style={{ width: 80, height: 80 }}
            />
          </View>

          <View style={{}}>
            <TextInput
              style={RegFormStyle.formcontainer}
              label="이름"
              onChangeText={(text) => setText(text)}
              mode="outlined"
            />
            <TextInput
              style={RegFormStyle.formcontainer}
              label="사원번호"
              onChangeText={(text) => setText(text)}
              mode="outlined"
            />
            <TextInput
              style={RegFormStyle.formcontainer}
              label="직급"
              onChangeText={(text) => setText(text)}
              mode="outlined"
            />
            <TextInput
              style={RegFormStyle.formcontainer}
              label="전화번호"
              onChangeText={(text) => setText(text)}
              mode="outlined"
            />
            <TextInput
              style={RegFormStyle.formcontainer}
              label="이메일"
              onChangeText={(text) => setText(text)}
              mode="outlined"
            />
            <TextInput
              style={RegFormStyle.formcontainer}
              label="주소"
              onChangeText={(text) => setText(text)}
              mode="outlined"
            />
            <TextInput
              style={RegFormStyle.formcontainer}
              label="시급"
              onChangeText={(text) => setText(text)}
              mode="outlined"
            />
            <TextInput
              style={RegFormStyle.formcontainer}
              label="입사일"
              onChangeText={(text) => setText(text)}
              mode="outlined"
            />
            <TextInput
              style={RegFormStyle.formcontainer}
              label="수습기간"
              onChangeText={(text) => setText(text)}
              mode="outlined"
            />
            <View style={RegFormStyle.checkyesorno}>
              <Text
                style={{
                  fontSize: 18,
                  borderWidth: 1,
                  borderRadius: 5,
                  textAlign: "center",
                  marginRight: 3,
                }}
              >
                4대보험유무
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  marginRight: 10,
                  backgroundColor: "green",
                }}
              >
                <BouncyCheckbox
                  size={25}
                  fillColor="#2e2e2e"
                  iconStyle={{
                    borderRadius: 50,
                  }}
                  onPress={(isChecked: boolean) => {}}
                />
                <Text style={RegFormStyle.checktext}>예</Text>
              </View>
              <View style={{ flexDirection: "row", backgroundColor: "pink" }}>
                <BouncyCheckbox
                  size={25}
                  fillColor="#2e2e2e"
                  iconStyle={{
                    borderRadius: 50,
                  }}
                  onPress={(isChecked: boolean) => {}}
                />
                <Text style={RegFormStyle.checktext}>아니요</Text>
              </View>
            </View>

            <View style={RegFormStyle.buttonD}>
              <Button
                color={"#2E294E"}
                title="등록하기"
                onPress={() => console.log("저장 버튼 클릭")}
              />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const RegFormStyle = StyleSheet.create({
  maincontainer: {
    flex: 1,
  },
  container: {
    flexDirection: "row",
    flex: 1,
    padding: "3%",
  },
  formcontainer: {
    width: 250,
    height: 30,
    marginBottom: 15,
  },
  checkyesorno: {
    // flexDirection: "row",
  },
  checktext: {
    fontSize: 18,
    fontFamily: "GmarketSansTTFBold",
    fontWeight: "700",
    marginLeft: "2%",
    justifyContent: "space-between",
  },
  buttonD: {
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 5,
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 30,
  },
});
export default StaffFormApp;
