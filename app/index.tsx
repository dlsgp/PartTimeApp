import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SignInApp from "./(signIn)/SignInApp";
import AdminTabs from "./(tabs)/AdminTabs";
import StaffTabs from "./(tabs)/StaffTabs";
import Test from "./(myPage)/Test";

const Stack = createNativeStackNavigator();

const MainPage = () => {
  const [loading, setLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState("SignIn");

  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = await AsyncStorage.getItem("userToken");
      if (token) {
        const userType = await AsyncStorage.getItem("userType");
        if (userType === "1") {
          setInitialRoute("StaffTabs");
        } else if (userType === "2") {
          setInitialRoute("AdminTabs");
        }
      }
      setLoading(false);
    };
    checkLoggedIn();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen
          name="SignIn"
          component={SignInApp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="StaffTabs"
          component={StaffTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AdminTabs"
          component={AdminTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Test"
          component={Test}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainPage;
