import { useContext, useEffect } from "react";
import UserTab from "./UserTab";
import AdminTab from "./AdminTab";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import { AuthContext } from "../hooks/AuthContext";
import { usePushNotifications } from "../hooks/usePushNotifications";
import { useDispatch, useSelector } from "react-redux";
import {
  selectNewNotice,
  setNewNotice,
} from "../redux/notificationSlice/notificationSlice";

export default function AppNavigation() {
  const { token } = useContext(AuthContext);
  const { expoPushToken, notification } = usePushNotifications();
  console.log("In Header - ExpoPushToken", expoPushToken);
  const dispatch = useDispatch();
  const newNotice = useSelector(selectNewNotice);

  useEffect(() => {
    dispatch(setNewNotice(!newNotice));
  }, [notification]);

  return (
    <NavigationContainer>
      {token == null ? (
        <AuthStack />
      ) : token.includes("admin") ? (
        <AdminTab />
      ) : (
        <UserTab />
      )}
    </NavigationContainer>
  );
}
