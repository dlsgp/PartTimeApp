import { StyleSheet, useColorScheme, View } from "react-native";
import Swiper from "react-native-swiper";
import FormBox from "./FormBox";
import FormBoxtwo from "./FormBoxtwo";
import EmployeeList from "./EmployeeList";
import { StatusBar } from "expo-status-bar";

function Staffindex() {
  const colorScheme = useColorScheme();
  return (
    <View style={StaffStyle.container}>
      <StatusBar
        style={colorScheme === "dark" ? "light" : "dark"}
        backgroundColor={colorScheme === "dark" ? "#000" : "#fff"}
      />
      <Swiper style={StaffStyle.wrapper} loop={false} showsPagination={false}>
        <View style={StaffStyle.slide}>
          <FormBox />
        </View>
        <View style={StaffStyle.slide}>
          <FormBoxtwo />
        </View>
        <View style={StaffStyle.slide}>
          <EmployeeList />
        </View>
      </Swiper>
    </View>
  );
}

const StaffStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
  },
  slide: {
    flex: 1,
    justifyContent: "center",
  },
});

export default Staffindex;
