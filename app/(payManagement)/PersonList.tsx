import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Avatar, Searchbar } from "react-native-paper";

function PersonList() {
  const [searchQuery, setSearchQuery] = React.useState("");

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
            <Avatar.Image
              size={120}
              source={require("../../assets/images/profile.jpg")}
            />
            <View style={style.textContainer}>
              <Text style={style.text}>홍길동</Text>
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
              <Text style={style.text}>홍길동</Text>
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
              <Text style={style.text}>홍길동</Text>
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
              <Text style={style.text}>홍길동</Text>
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
              <Text style={style.text}>홍길동</Text>
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
      </View>
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
