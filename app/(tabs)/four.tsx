import { StyleSheet, View } from "react-native";

import MyPage from "../(myPage)/Mypage";

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <MyPage />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
