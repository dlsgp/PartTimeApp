import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FormBox from "../(staffLayout)/FormBox";
import StaffForm from "../(staffLayout)/StaffForm";
import SalaryForm from "../(payManagement)/SalaryForm";
import SalaryList from "../(payManagement)/SalaryList";
import Test from "../(myPage)/Test";


const Tab = createBottomTabNavigator();

export default function AdminTabs() {
  return (
    <Tab.Navigator initialRouteName="FormBox">
      <Tab.Screen name="FormBox" component={FormBox} options={{ tabBarLabel: 'FormBox', headerShown: false }} />
      <Tab.Screen name="StaffForm" component={StaffForm} options={{ tabBarLabel: 'StaffForm', headerShown: false }} />
      <Tab.Screen name="SalaryForm" component={SalaryForm} options={{ tabBarLabel: 'SalaryForm', headerShown: false }} />
      <Tab.Screen name="SalaryList" component={SalaryList} options={{ tabBarLabel: 'SalaryList', headerShown: false }} />
      <Tab.Screen name="Test" component={Test} options={{ tabBarLabel: 'Test', headerShown: false }} />
    </Tab.Navigator>
  );
}