import { StyleSheet, View } from "react-native";

import StaffLayout from "../(staffLayout)";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <StaffLayout />
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
