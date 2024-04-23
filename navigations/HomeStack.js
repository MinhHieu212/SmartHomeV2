import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  NoticeScreen,
  FanDeviceScreen,
  DashboardScreen,
  DoorDeviceScreen,
  HomeScreen,
} from "../screens";

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
      <Stack.Screen name="Dashboard" component={DashboardScreen}></Stack.Screen>
      <Stack.Screen name="Notice" component={NoticeScreen}></Stack.Screen>
      <Stack.Screen name="FanDevice" component={FanDeviceScreen}></Stack.Screen>
      <Stack.Screen
        name="DoorDevice"
        component={DoorDeviceScreen}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default HomeStack;
