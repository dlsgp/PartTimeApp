import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Mypage from "../(myPage)/Mypage";
import Test from "../(myPage)/Test";


const Tab = createBottomTabNavigator();

export default function StaffTabs() {
  return (
    <Tab.Navigator initialRouteName="MyPage">
      <Tab.Screen name="MyPage" component={Mypage} options={{ tabBarLabel: 'Mypage',  headerShown: false }} />
      <Tab.Screen name="Test" component={Test} options={{ tabBarLabel: 'Test', headerShown: false }} />
    </Tab.Navigator>
  );
}