import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SettingScreen } from "../screens";

const Stack = createNativeStackNavigator();

const SettingStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Setting"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Setting" component={SettingScreen}></Stack.Screen>
    </Stack.Navigator>
  );
};

export default SettingStack;
