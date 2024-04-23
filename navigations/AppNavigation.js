import { useContext } from "react";
import AppTab from "./AppTab";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import { AuthContext } from "../hooks/AuthContext";

export default function AppNavigation() {
  const { token } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {token == null ? <AuthStack /> : <AppTab />}
    </NavigationContainer>
  );
}
