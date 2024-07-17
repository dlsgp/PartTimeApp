import EmployeeListApp from "@/components/src/EmployeeListApp";
import FormBox2App from "@/components/src/FormBox2App";
import FormBoxApp from "@/components/src/FormBoxApp";
import { View, StyleSheet } from "react-native";
import Swiper from "react-native-swiper";

function StaffLayout() {
  return (
    <Swiper style={StaffStyle.wrapper} loop={false} showsPagination={false}>
      <View style={StaffStyle.slide}>
        <FormBoxApp />
      </View>
      <View style={StaffStyle.slide}>
        <FormBox2App />
      </View>
      <View style={StaffStyle.slide}>{/* <EmployeeListApp /> */}</View>
    </Swiper>
  );
}

const StaffStyle = StyleSheet.create({
  wrapper: {
    height: "auto",
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
  },
});

export default StaffLayout;
