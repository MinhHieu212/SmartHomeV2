import { useContext } from "react";
import UserTab from "./UserTab";
import AdminTab from "./AdminTab";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import { AuthContext } from "../hooks/AuthContext";

export default function AppNavigation() {
  const { token } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {token == null ? <AuthStack /> : token.includes("admin") ? <AdminTab /> : <UserTab />}
    </NavigationContainer>
  );
}
