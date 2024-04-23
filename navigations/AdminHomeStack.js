import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {UserListScreen , UserDashboardScreen } from "../screens" 

const Stack = createNativeStackNavigator();

const AdminHomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="ListUser"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="UserList" component={UserListScreen}></Stack.Screen>
      <Stack.Screen name="UserDashBoard" component={UserDashboardScreen}></Stack.Screen>
    </Stack.Navigator>
  );
};

export default AdminHomeStack;
