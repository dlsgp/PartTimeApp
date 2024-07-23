import { StatusBar } from "expo-status-bar";
import { StyleSheet, useColorScheme, View } from "react-native";
import PersonList from "./PersonList";

export default function payManagementIndex() {
  const colorScheme = useColorScheme();
  return (
    <View style={style.container}>
      <StatusBar
        style={colorScheme === "dark" ? "light" : "dark"}
        backgroundColor={colorScheme === "dark" ? "#000" : "#fff"}
      />
      <PersonList />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});
