import { StatusBar } from "expo-status-bar";
import { StyleSheet, useColorScheme, View } from "react-native";
import MainCalendar from "./MainCalendar";

export default function payManagementIndex() {
  const colorScheme = useColorScheme();
  return (
    <View style={style.container}>
      {/* <StatusBar
        style={colorScheme === "dark" ? "light" : "dark"}
        backgroundColor={colorScheme === "dark" ? "#000" : "#fff"}
      />
      <MainCalendar /> */}
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});
