import { router } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Avatar,
  Button,
  Modal,
  PaperProvider,
  Portal,
  Searchbar,
} from "react-native-paper";

function PersonList() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };

  return (
    <ScrollView style={style.viewContainer}>
      <View style={style.mainContainer}>
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={style.searchbar}
        />
        <View style={style.container}>
          <View style={style.image}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => router.push("/SalaryForm")}
            >
              <Avatar.Image
                size={120}
                source={require("../../assets/images/profile.jpg")}
              />
            </TouchableOpacity>
            <View style={style.textContainer}>
              <Text style={style.text}>김리리</Text>
            </View>
          </View>

          <View style={style.image}>
            <Avatar.Image
              size={120}
              source={require("../../assets/images/profile.jpg")}
            />
            <View style={style.textContainer}>
              <Text style={style.text}>박미리</Text>
            </View>
          </View>
        </View>

        <View style={style.container}>
          <View style={style.image}>
            <Avatar.Image
              size={120}
              source={require("../../assets/images/profile.jpg")}
            />
            <View style={style.textContainer}>
              <Text style={style.text}>이진리</Text>
            </View>
          </View>

          <View style={style.image}>
            <Avatar.Image
              size={120}
              source={require("../../assets/images/profile.jpg")}
            />
            <View style={style.textContainer}>
              <Text style={style.text}>나시리</Text>
            </View>
          </View>
        </View>

        <View style={style.container}>
          <View style={style.image}>
            <Avatar.Image
              size={120}
              source={require("../../assets/images/profile.jpg")}
            />
            <View style={style.textContainer}>
              <Text style={style.text}>주피리</Text>
            </View>
          </View>

          <View style={style.image}>
            <Avatar.Image
              size={120}
              source={require("../../assets/images/profile.jpg")}
            />
            <View style={style.textContainer}>
              <Text style={style.text}>홍길동</Text>
            </View>
          </View>
        </View>

        <View style={style.container}>
          <View style={style.image}>
            <Avatar.Image
              size={120}
              source={require("../../assets/images/profile.jpg")}
            />
            <View style={style.textContainer}>
              <Text style={style.text}>김철수</Text>
            </View>
          </View>

          <View style={style.image}>
            <Avatar.Image
              size={120}
              source={require("../../assets/images/profile.jpg")}
            />
            <View style={style.textContainer}>
              <Text style={style.text}>박시연</Text>
            </View>
          </View>
        </View>

        <View style={style.container}>
          <View style={style.image}>
            <Avatar.Image
              size={120}
              source={require("../../assets/images/profile.jpg")}
            />
            <View style={style.textContainer}>
              <Text style={style.text}>김영희</Text>
            </View>
          </View>

          <View style={style.image}>
            <Avatar.Image
              size={120}
              source={require("../../assets/images/profile.jpg")}
            />
            <View style={style.textContainer}>
              <Text style={style.text}>김홍구</Text>
            </View>
          </View>
        </View>
      </View>
      {/* <PaperProvider>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <Text>Example Modal.  Click outside this area to dismiss.</Text>
        </Modal>
      </Portal>
      <Button style={{marginTop: 30}} onPress={showModal}>
        Show
      </Button>
    </PaperProvider> */}
    </ScrollView>
  );
}

const style = StyleSheet.create({
  viewContainer: {
    width: "100%",
    height: "100%",
  },
  mainContainer: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "16%",
  },
  searchbar: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#219bda",
    width: "90%",
    marginTop: 20,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    padding: "8%",
  },
  textContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    marginTop: 10,
  },
  text: {
    fontWeight: "700",
    fontSize: 20,
  },
});

export default PersonList;
