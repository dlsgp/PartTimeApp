import { StackActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { Button, Text } from "react-native";
import { View } from "react-native";

const MainPage = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Main</Text>
      <Button
        title="tabs"
        onPress={() => navigation.dispatch(StackActions.push("(tabs)"))}
      />
    </View>
  );
};

export default MainPage;
