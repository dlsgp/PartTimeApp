import { StatusBar } from "expo-status-bar";
import { StyleSheet, useColorScheme, View } from "react-native";
import MyPage from "./Mypage";


export default function myPageIndex() {
  const colorScheme = useColorScheme();
  return (
    <View style={style.container}>
      <StatusBar
        style={colorScheme === "dark" ? "light" : "dark"}
        backgroundColor={colorScheme === "dark" ? "#000" : "#fff"}
      />
      <MyPage />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});
