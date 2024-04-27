import { StyleSheet, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import React from "react";

const displayVNTime = (value) => {
  const existingStart = new Date(value);

  existingStart.setHours(existingStart.getHours() + 8);

  return existingStart.toISOString().slice(11, 16);
};

const HistoryCard = ({ content, date }) => {
  const isOff = content.includes("off");
  const isClose = content.includes("closed");

  return (
    <View className="w-[90vw] bg-white shadow-lg shadow-black justify-between h-[100] rounded-2xl p-2 px-4 m-2">
      <Text
        className={`p-1 text-blue-500 font-bold text-lg ${
          isOff || isClose ? "text-green-500" : "text-blue-500"
        }`}
      >
        {content}
      </Text>
      <View className="flex-row items-center mt-auto justify-between">
        <Text className="p-1 text-md font-bold text-blue-800 ">
          {date.split("T")[0]}
        </Text>
        <Text className="p-1 text-md font-bold text-blue-800">
          {displayVNTime(date)}
        </Text>
      </View>
    </View>
  );
};

export default HistoryCard;
