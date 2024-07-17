import * as React from "react";
import { Dimensions, View, StyleSheet } from "react-native";
import Swiper from "react-native-swiper";

function StaffLayout() {
  const { width } = Dimensions.get("window");
  const isMobile = width < 600;

  // 모바일 용
  if (isMobile) {
    return (
      <Swiper style={StaffStyle.wrapper} loop={false} showsPagination={false}>
        <View style={StaffStyle.slide}>
          <FormBoxApp />
        </View>
        <View style={StaffStyle.slide}>
          <FormBox2App />
        </View>
        <View style={StaffStyle.slide}>
          <EmployeeListApp />
        </View>
      </Swiper>
    );
  }
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
