import * as React from "react";
import { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  ScrollView,
  Button,
} from "react-native";
import { TextInput } from "react-native-paper";
import BouncyCheckbox from "react-native-bouncy-checkbox";

const StaffFormApp = () => {
  const [text, setText] = useState("");
  // const [formData, setFormData] = useState({
  //   selectedDate: null,
  // });
  // const handleDateConfirm = (selectedDate) => {
  //   setFormData({
  //     ...formData,
  //     selectedDate: selectedDate,
  //   });
  // };

  return (
    <ScrollView style={RegFormStyle.maincontainer}>
      <View>
        <View style={RegFormStyle.container}>
          <Text
            style={{
              fontSize: 32,
              fontFamily: "MangoDdobak-R",
              fontWeight: "bold",
            }}
          >
            직원등록
          </Text>
        </View>

        <View
          style={{
            backgroundColor: "blue",
            width: 100,
            height: 100,
            alignItems: "center",
            marginRight: "auto",
          }}
        >
          <Image
            source={require("../../assets/images/profile.jpg")}
            style={{ width: 100, height: 100 }}
          />

          {/*   <View style={RegFormStyle.textcontainer}>
            <View>
              <Text style={RegFormStyle.text}>이름</Text>
            </View>
            <View>
              <Text style={RegFormStyle.text}>사원번호</Text>
            </View>
            <View>
              <Text style={RegFormStyle.text}>직급</Text>
            </View>
            <View>
              <Text style={RegFormStyle.text}>전화번호</Text>
            </View>
            <View>
              <Text style={RegFormStyle.text}>이메일</Text>
            </View>
            <View>
              <Text style={[RegFormStyle.text, { marginBottom: 170 }]}>
                주소
              </Text>
            </View>
            <View>
              <Text style={RegFormStyle.text}>시급</Text>
            </View>
            <View>
              <Text style={RegFormStyle.text}>입사일</Text>
            </View>
            <View>
              <Text style={RegFormStyle.text}>수습기간</Text>
            </View>
            <View>
              <Text style={RegFormStyle.text}>4대보험유무</Text>
            </View>
          </View>

          <View>
            <TextInput
              style={RegFormStyle.formcontainer}
              label=""
              onChangeText={(text) => setText(text)}
              mode="outlined"
            />
            <TextInput
              style={RegFormStyle.formcontainer}
              label=""
              onChangeText={(text) => setText(text)}
              mode="outlined"
            />
            <TextInput
              style={RegFormStyle.formcontainer}
              label=""
              onChangeText={(text) => setText(text)}
              mode="outlined"
            />
            <TextInput
              style={RegFormStyle.formcontainer}
              label=""
              onChangeText={(text) => setText(text)}
              mode="outlined"
            />
            <TextInput
              style={RegFormStyle.formcontainer}
              label=""
              onChangeText={(text) => setText(text)}
              mode="outlined"
            />
            <View>
              <TextInput
                style={{
                  marginBottom: 18,
                  height: 42,
                  //marginLeft: 474,
                  borderColor: "#E5E5E5",
                  backgroundColor: "green",
                }}
                label=""
                onChangeText={(text) => setText(text)}
                mode="outlined"
              />
              <TextInput
                style={RegFormStyle.formcontainer}
                label=""
                onChangeText={(text) => setText(text)}
                mode="outlined"
              />
            </View>
            <TextInput
              style={RegFormStyle.formcontainer}
              label=""
              onChangeText={(text) => setText(text)}
              mode="outlined"
            />
            <TextInput
              style={RegFormStyle.formcontainer}
              label=""
              onChangeText={(text) => setText(text)}
              mode="outlined"
            />
            <TextInput
              style={RegFormStyle.formcontainer}
              label=""
              onChangeText={(text) => setText(text)}
              mode="outlined"
            />
            {/* <View style={RegFormStyle.datedesign}>
              <DateTimePicker
                mode="single"
                locale={"ko"}
                date={date}
                onChange={(params) => setDate(params.date)}
                onConfirm={(date) => handleDateConfirm(date)}
              />
            </View> */}
          {/* <View style={RegFormStyle.checkyesorno}>
              <BouncyCheckbox
                style={RegFormStyle.checkyestext}
                size={25}
                fillColor="#ffffff"
                text="예"
                iconStyle={{
                  borderRadius: 0,
                }}
                onPress={(isChecked: boolean) => {}}
              />
              <BouncyCheckbox
                style={RegFormStyle.checknotext}
                size={25}
                fillColor="#2e2e2e"
                text="아니요"
                iconStyle={{
                  borderRadius: 0,
                }}
                onPress={(isChecked: boolean) => {}}
              />
            </View>
            <View style={RegFormStyle.buttonD}>
              <Button
                color={"#2E294E"}
                title="등록하기"
                onPress={() => console.log("저장 버튼 클릭")}
              />
            </View>
          </View>*/}
        </View>
      </View>
    </ScrollView>
  );
};

const RegFormStyle = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: "yellow",
  },
  container: {
    flexDirection: "row",
    flex: 1,
    padding: "3%",
    backgroundColor: "red",
  },
  text: {
    fontSize: 28,
    fontFamily: "GmarketSansTTFBold",
    fontWeight: "700",
    marginBottom: 112,
  },
  textcontainer: {
    padding: "5%",
    backgroundColor: "pink",
  },
  formcontainer: {
    marginBottom: 102,
    maxWidth: 578,
    maxHeight: 42,
    //marginLeft: 474,
    flexDirection: "row",
    backgroundColor: "green",
  },
  checkyesorno: {
    flexDirection: "row",
    // marginLeft: 474,
    // paddingTop: 15,
    backgroundColor: "gray",
  },
  checkyestext: {
    fontSize: 12,
    fontFamily: "GmarketSansTTFBold",
    marginLeft: 200,
    fontWeight: "700",
    backgroundColor: "black",
  },
  checknotext: {
    fontSize: 12,
    fontFamily: "GmarketSansTTFBold",
    fontWeight: "700",
    backgroundColor: "black",
  },
  buttonD: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 30,
  },
});
export default StaffFormApp;
