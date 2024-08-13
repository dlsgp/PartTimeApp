import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FormBox from "../(staffLayout)/FormBox";
import StaffForm from "../(staffLayout)/StaffForm";
import SalaryForm from "../(payManagement)/SalaryForm";
import SalaryList from "../(payManagement)/SalaryList";
import Test from "../(myPage)/Test";
import { FontAwesome, MaterialIcons, AntDesign } from "@expo/vector-icons";

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
      {/* <Tab.Screen 
        name="SalaryForm" 
        component={SalaryForm} 
        options={{ 
          tabBarLabel: 'SalaryForm', 
          headerShown: false, 
          tabBarIcon: ({ color }) => <MaterialIcons name="attach-money" size={25} color={color} /> 
        }} 
      /> */}
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
        name="Test" 
        component={Test} 
        options={{ 
          tabBarLabel: 'Test', 
          headerShown: false, 
          tabBarIcon: ({ color }) => <FontAwesome name="code" size={25} color={color} /> 
        }} 
      />
    </Tab.Navigator>
  );
}
