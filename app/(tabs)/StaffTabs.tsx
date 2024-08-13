import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Mypage from "../(myPage)/Mypage";
import Test from "../(myPage)/Test";
import { FontAwesome, AntDesign, MaterialIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function StaffTabs() {
  return (
    <Tab.Navigator initialRouteName="MyPage">
      <Tab.Screen
        name="MyPage"
        component={Mypage}
        options={{
          tabBarLabel: "Mypage",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome
              name="user-o"
              color={color}
              size={25}
              style={{ marginBottom: -3 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Test"
        component={Test}
        options={{
          tabBarLabel: "Test",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome
              name="code"
              color={color}
              size={25}
              style={{ marginBottom: -3 }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
