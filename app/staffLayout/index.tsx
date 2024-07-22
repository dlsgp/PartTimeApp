import { StatusBar } from "expo-status-bar";
import { StyleSheet, useColorScheme, View } from "react-native";
import Swiper from "react-native-swiper";
import formBox from "./formBox";
import { Stack } from "expo-router";

function StaffLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack>
      <Stack.Screen name="formBox" options={{ headerShown: false }} />
    </Stack>

    // <Swiper style={StaffStyle.wrapper} loop={false} showsPagination={false}>
    //   <View style={StaffStyle.slide}>
    //     <StatusBar style={(colors = [colorScheme ?? "light"].text)} />
    //     <formBox />
    //   </View>
    //   <View style={StaffStyle.slide}>
    //     <formBoxtwo />
    //   </View>
    //   <View style={StaffStyle.slide}>{/* <EmployeeListApp /> */}</View>
    // </Swiper>
  );
}

// const StaffStyle = StyleSheet.create({
//   wrapper: {
//     height: "auto",
//   },
//   slide: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "stretch",
//   },
// });

export default StaffLayout;
