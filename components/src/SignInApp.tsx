import { StyleSheet, Text, TextInput, View } from "react-native";

const SignInApp = () => {
  return(

    <View style={styles.container}>
      <Text style={styles.title}> Sign In</Text>
        <View style={Styles.inputView}>
          <TextInput
          />
        </View>
    </View>


  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: "bold",
    fontSize: 70,
  },

});

export default SignInApp;
