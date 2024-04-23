import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // We need to store userToken for step auto login  when user start the app
  const login = (userToken) => {
    setIsLoading(true);

    setToken(userToken);
    AsyncStorage.setItem("userToken", userToken);
    setIsLoading(false);
  };

  // delete userToken in local storage
  const logout = () => {
    setIsLoading(true);

    setToken(null);
    AsyncStorage.removeItem("userToken");
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      const getUserToken = await AsyncStorage.getItem("userToken");
      setToken(getUserToken);
      setIsLoading(false);
    } catch (e) {
      setToken(null);
      console.log("Error dont have token", e);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ token, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
