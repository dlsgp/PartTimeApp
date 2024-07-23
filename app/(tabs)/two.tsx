import { StyleSheet, View } from "react-native";


import PersonList from "../(payManagement)/PersonList";

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <PersonList />
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
