import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import Header from "../components/Header";
import Ionicons from "react-native-vector-icons/Ionicons";

const NoticeScreen = () => {
  const notificationList = [
    {
      key: 1,
      date: "2024-03-29",
      content: "The room's humidity exceeds",
    },
    {
      key: 2,
      date: "2022-03-29",
      content: "The room's humidity exceeds",
    },
    {
      key: 3,
      date: "2021-03-29",
      content: "The room's humidity exceeds",
    },
    {
      key: 31,
      date: "2024-03-29",
      content: "The room's humidity exceeds",
    },
    {
      key: 4,
      date: "2022-03-29",
      content: "The room's humidity exceeds",
    },
    {
      key: 5,
      date: "2021-03-29",
      content: "The room's humidity exceeds",
    },
    {
      key: 6,
      date: "2024-03-29",
      content: "The room's humidity exceeds",
    },
    {
      key: 7,
      date: "2022-03-29",
      content: "The room's humidity exceeds",
    },
    {
      key: 8,
      date: "2021-03-29",
      content: "The room's humidity exceeds",
    },
  ];

  const notificationItem = ({ item }) => {
    return (
      <View className="w-[90vw] bg-white shadow-lg shadow-black flex-row items-center justify-between rounded-2xl p-2 px-4 m-2">
        <View className="p-2 shadow-xl shadow-black rounded-full bg-white">
          <Ionicons name={"water-outline"} color={"red"} size={35} />
        </View>
        <View className="w-[82%]">
          <Text className="p-1 text-red-500 font-bold text-lg overflow-hidden h-8 truncate">
            {item.content}
          </Text>
          <Text className="p-1 text-md font-bold text-blue-800">
            {item.date}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white mb-[70]">
      <StatusBar barStyle={"opaque"} backgroundColor="black"></StatusBar>
      <Header name="Notice"></Header>
      {/* <ScrollView className="mt-1 h-[80vh]"> */}
      <View className="h-[80vh] pb-10 px-3 mt-2 items-center justify-center">
        <FlatList
          data={notificationList}
          renderItem={notificationItem}
          keyExtractor={(item) => item.key}
        ></FlatList>
      </View>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

export default NoticeScreen;

const styles = StyleSheet.create({});
