import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  FlatList,
} from "react-native";
import Header from "../components/Header";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Feather from "react-native-vector-icons/Feather";

const userList = [
  {
    name: "User 1",
  },
  {
    name: "User 2",
  },
  {
    name: "User 3",
  },
  {
    name: "User 4",
  },
  {
    name: "User 5",
  },
  {
    name: "User 6",
  },
  {
    name: "User 7",
  },
  {
    name: "User 8",
  },
  {
    name: "User 9",
  },
  {
    name: "User 10",
  },
  {
    name: "User 11",
  },
  {
    name: "User 12",
  },
  {
    name: "User 13",
  },
  {
    name: "User 14",
  },
  {
    name: "User 15",
  },]

const UserListScreen = () => {
  const [username, setUsername] = useState("");
  const navigation = useNavigation();
  return (
    <SafeAreaView className="flex-1 bg-[#EEF5FF] mb-[70]">
      <StatusBar barStyle={"opaque"} backgroundColor="black"></StatusBar>
      <Header name="User List"></Header>
      <ScrollView>
        <View className="flex-1 px-6 pt-5 pb-10 mt-3 bg-[#EEF5FF]">
          <View className="flex flex-row items-center justify-between border-2 bg-white border-gray-200 px-4 py-2 rounded-lg">
            {/* <Text className = "text-blue-500 text-xl">UserListScreen</Text>
            <TouchableOpacity onPress={() => navigation.navigate("UserDashBoard", { userName :  "User 1"})}>
            <Text className = "text-xl rounded-xl mt-5 px-4 py-2 bg-blue-400 text-white font-bold">User 1</Text>
            </TouchableOpacity> */}
            <TextInput
              placeholder="Enter user account name"
              onChangeText={setUsername}
              value={username}
              autoCapitalize="none"
              className="block text-semibold text-[30] rounded-lg"
            />
            <TouchableOpacity className="flex flex-row items-center">
              <Feather name="search" size={24} color="#8391A1"></Feather>
            </TouchableOpacity>
          </View>
          <View className="mt-5 flex justify-between rounded-2xl shadow-2x bg-white p-3">
            <Text className="text-xl font-bold w-full border-[#8391A1] border-b-2 pb-2">
              User List
            </Text>
            
            {
              userList.map((item) => (
                <TouchableOpacity key={item.name} onPress={() => navigation.navigate("UserDashBoard", { userName :  item.name})}>
                  <View className="flex flex-row border-b-2 items-center justify-between shadow-2x h-16 border-[#8391A1] bg-white">
                  <Text >
                    {item.name}
                  </Text>
                  <Feather name="chevron-right" size={24} color="#8391A1"></Feather>
                </View>
                </TouchableOpacity>
              ))
            }
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserListScreen;

const styles = StyleSheet.create({});
