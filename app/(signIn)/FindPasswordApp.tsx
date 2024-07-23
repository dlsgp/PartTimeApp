import { SafeAreaView, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

const FindPasswordApp = () => {

  return(
    <SafeAreaView>
      <TextInput
        style={styles.input}
        placeholder="ID"
        placeholderTextColor="#aaa"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {

  },
  input: {

  },


});

export default FindPasswordApp;
