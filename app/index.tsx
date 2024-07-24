import { StackActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { Button, Text } from "react-native";
import { View } from "react-native";
import SignInApp from "./(signIn)/SignInApp";

const MainPage = () => {
  return <SignInApp></SignInApp>;
};

export default MainPage;
