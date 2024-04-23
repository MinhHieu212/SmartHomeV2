import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React, { useContext, useState } from "react";
import { AuthContext } from "../hooks/AuthContext";
import { LeftArrowIcon } from "../assets/Icons";
import { useNavigation } from "@react-navigation/native";
import { LoginAPI } from "../apis/loginAPI";

const LoginScreen = () => {
  const navigation = useNavigation();
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogIn = async () => {
    const userInfo = { email, password };

    const response = await LoginAPI(userInfo);

    if (response.data) {
      login(response.data.email);
      setError("");
      setEmail("");
      setPassword("");
    } else {
      setError("Please try logging in again!");
    }
  };

  return (
    <View className="flex-1 mt-10 items-center">
      <StatusBar barStyle={"opaque"} backgroundColor="black"></StatusBar>
      <TouchableOpacity
        className="absolute left-5"
        onPress={() => navigation.goBack()}
      >
        <LeftArrowIcon></LeftArrowIcon>
      </TouchableOpacity>
      <StatusBar barStyle={"opaque"} backgroundColor="black"></StatusBar>

      <Text className="text-3xl font-bold text-black mt-14 mb-5 w-[80vw]">
        Welcome back! Glad to see you, Again!
      </Text>
      <View className="mt-10">
        <View className="h-10 justify-center w-[85vw]">
          <Text className="text-red-500 p-1 justify-center">{error || ""}</Text>
        </View>
        <TextInput
          placeholder="Enter your account name"
          onChangeText={setEmail}
          value={email}
          autoCapitalize="none"
          className="w-[85vw] text-semibold text-[30] border-2 border-black rounded-lg p-3 mb-5"
        />
        <TextInput
          placeholder="Enter your password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
          className="w-[85vw] text-semibold text-[30] border-2 border-black p-3 rounded-lg"
        />
        <View className="mt-2">
          <Text className="text-right"> Forgot Password?</Text>
        </View>
        <TouchableOpacity
          onPress={() => handleLogIn()}
          className="items-center justify-center"
        >
          <Text className="font-bold text-white bg-[#2666DE] text-center text-lg  p-4 w-[85vw]  px-6 rounded-xl mt-8">
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
