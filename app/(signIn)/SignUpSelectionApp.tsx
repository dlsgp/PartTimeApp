import { Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { FontAwesome } from '@expo/vector-icons';
import { Image } from "react-native-elements";
import React from "react";
import { Link, router } from "expo-router";

const { width, height } = Dimensions.get("window");

const SignUpSelectionApp: React.FC = () => {
  


  return(

    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>PartTime</Text>
      <Text style={styles.title2}>회원가입을 환영합니다.</Text>

      <TouchableOpacity style={styles.card1} onPress={() => router.push('/PersonalSignUpApp')}>
      <Ionicons name="people" size={80} color="black" />
      <Text style={styles.cardText1}>개인회원가입</Text>
      </TouchableOpacity>
      

      <View style={styles.socialLogin}>
      <TouchableOpacity style={styles.socialcard1}>
          <Image
            source={require("../../assets/images/navericon.png")}
            style={styles.socialButton}
          />
          <Text style={styles.socialText}>네이버</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialcard2}>
          <Image
            source={require("../../assets/images/kakaoicon.png")}
            style={styles.socialButton}
          />
          <Text style={styles.socialText}>카카오</Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity style={styles.card2} onPress={() => router.push('/BusinessSignUpApp')}>
      <FontAwesome name="building" size={70} color="black" />
      <Text style={styles.cardText2}>사업자회원가입</Text>
      </TouchableOpacity>

    </SafeAreaView>


  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginLeft: 10,
    marginRight: 10,
  },
  title2: {
    fontSize: 30,
    marginBottom: 60,
    fontWeight: "bold",
    marginLeft: 10,
    marginRight: 10,
  },
  card1: {
    width: width * 0.8,
    padding: 20,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  card2: {
    width: width * 0.8,
    padding: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
    // marginBottom: -1,
    alignItems: 'center',
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  cardText1: {
    fontSize: 30,
    color: '#FFBD00',
    fontWeight: 'bold',
  },
  cardText2: {
    fontSize: 30,
    color: '#FFBD00',
    marginTop: 20,
    fontWeight: 'bold',
  },
  socialLogin: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: "50%",
    marginBottom: 20,
  },
  socialButton: {
    width: 40,
    height: 40,
  },
  socialcard1: {
    width: width * 0.4,
    height: 100,
    padding: 20,
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomLeftRadius: 5,
    borderColor: '#ccc',
    marginBottom: 20,
    alignItems: 'center',
  },
  socialcard2: {
    width: width * 0.4,
    height: 100,
    padding: 20,
    borderWidth: 1,
    borderBottomRightRadius: 5,
    borderColor: '#ccc',
    marginBottom: 20,
    alignItems: 'center',
  },
  socialText: {
    fontWeight: 'bold',
    marginTop: 10,
  }
});

export default SignUpSelectionApp;