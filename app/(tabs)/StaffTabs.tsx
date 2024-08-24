import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Mypage from "../(myPage)/Mypage";
import { FontAwesome, AntDesign, MaterialIcons, Ionicons } from "@expo/vector-icons";
import Wage from "../(myPage)/Wage";
import QRCodeScannerScreen from "../(myPage)/QRCodeScanner";
import MyCalendar from "../(myPage)/MyCalendar";

const Tab = createBottomTabNavigator();

export default function StaffTabs() {
  return (
    <Tab.Navigator initialRouteName="MyPage">
      <Tab.Screen
        name="마이페이지"
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
        name="Calendar"
        component={MyCalendar}
        options={{
          tabBarLabel: "일정",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <AntDesign
              name="calendar"
              color={color}
              size={25}
              style={{ marginBottom: -3 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Wage"
        component={Wage}
        options={{
          tabBarLabel: "급여",
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
        name="QRCode"
        component={QRCodeScannerScreen}
        options={{
          tabBarLabel: "QRCode",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="qr-code-outline"
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
{/* <Ionicons name="qr-code-outline" size={24} color="black" /> */}