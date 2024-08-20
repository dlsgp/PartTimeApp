import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FormBox from "../(staffLayout)/FormBox";
import StaffForm from "../(staffLayout)/StaffForm";
import SalaryForm from "../(payManagement)/SalaryForm";
import SalaryList from "../(payManagement)/SalaryList";
import Test from "../(myPage)/Test";
import { FontAwesome, MaterialIcons, AntDesign, Ionicons } from "@expo/vector-icons";
import ScheduleCalendar from "../(scheduleManagement)/ScheduleCalendar";
import QRCodeScreen from "../(staffLayout)/QRCodeScreen";

const Tab = createBottomTabNavigator();

export default function AdminTabs() {
  return (
    <Tab.Navigator initialRouteName="FormBox">
      <Tab.Screen 
        name="FormBox" 
        component={FormBox} 
        options={{ 
          tabBarLabel: '직원관리', 
          headerShown: false, 
          tabBarIcon: ({ color }) => <AntDesign name="user" size={25} color={color} /> 
        }}  
      />
      <Tab.Screen 
        name="StaffForm" 
        component={StaffForm} 
        options={{ 
          tabBarLabel: '직원등록', 
          headerShown: false, 
          tabBarIcon: ({ color }) => <AntDesign name="addusergroup" size={25} color={color} /> 
        }} 
      />
      <Tab.Screen 
        name="ScheduleCalendar" 
        component={ScheduleCalendar} 
        options={{ 
          tabBarLabel: '캘린더', 
          headerShown: false, 
          tabBarIcon: ({ color }) => <AntDesign name="calendar" size={25} color={color} /> 
        }} 
      />
      <Tab.Screen 
        name="SalaryList" 
        component={SalaryList} 
        options={{ 
          tabBarLabel: '급여목록', 
          headerShown: false, 
          tabBarIcon: ({ color }) => <FontAwesome name="list-alt" size={25} color={color} /> 
        }} 
      />
      <Tab.Screen
        name="QRCode"
        component={QRCodeScreen}
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
