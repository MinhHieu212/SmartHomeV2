import { StyleSheet, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import React from "react";

const HistoryCard = ({ content, date }) => {
  return (
    <View className="w-[90vw] bg-white shadow-lg shadow-black justify-between rounded-2xl p-2 px-4 m-2">
      <Text className="p-1 text-red-500 font-bold text-lg">{content}</Text>
      <View className="flex-row items-center justify-between">
        <Text className="p-1 text-md font-bold text-blue-800">
          {date.split("T")[0]}
        </Text>
        <Text className="p-1 text-md font-bold text-blue-800">
          {date.split("T")[1].slice(0, 5)}
        </Text>
      </View>
    </View>
  );
};

export default HistoryCard;

const styles = StyleSheet.create({});
