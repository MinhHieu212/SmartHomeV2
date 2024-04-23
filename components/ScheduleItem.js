import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Feather } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import React, { useState } from "react";

const ScheduleItem = ({ item, handleFrom, handleTo, handleLevel, handleDelete }) => {
  const [showFrom, setShowFrom] = useState(false);
  const [showTo, setShowTo] = useState(false);
  const [showLevel, setShowLevel] = useState(false);

  return (
    <View
      className="flex flex-row flex-wrap items-center justify-end rounded-2xl shadow-2x bg-white p-3 my-1"
      key={item._id}
    >
      <View className="w-1/3 flex-row">
        <Text className="text-lg font-regular "> From </Text>
        <TouchableOpacity className="px-1 flex-row justify-between rounded-md border-2 border-[#2666DE]" onPress={() => setShowFrom(true)}>
          <Text className="text-lg font-regular  text-[#2666DE]">{item.start.slice(11, 16)}</Text>
          <Feather name="chevron-down" className="text-[#2666DE]" size={26} color={"#2666DE"}></Feather>
        </TouchableOpacity>
        {showFrom && (
          <DateTimePicker
            testID="dateTimePicker"
            mode="time"
            value={new Date(0)}
            is24Hour={true}
            onChange={(evt, selectedDate) => {
              setShowFrom(false);
              handleFrom(item._id, (selectedDate).toLocaleString().slice(0, 5));
            }}
          />
        )}
      </View>
      <View className="w-1/3 flex-row">
        <Text className="text-lg font-regular "> To </Text>
        <TouchableOpacity className="px-1 flex-row justify-between rounded-md border-2 border-[#2666DE]" onPress={() => setShowTo(true)}>
          <Text className="text-lg font-regular  text-[#2666DE]">{item.end.slice(11, 16)}</Text>
          <Feather name="chevron-down" className="text-[#2666DE]" size={26} color={"#2666DE"}></Feather>
        </TouchableOpacity>
        {showTo && (
          <DateTimePicker
            testID="dateTimePicker"
            mode="time"
            value={new Date(0)}
            is24Hour={true}
            onChange={(evt, selectedDate) => {
              setShowTo(false);
              handleTo(item._id, (selectedDate).toLocaleString().slice(0, 5));
            }}
          />
        )}
      </View>
      <TouchableOpacity className="w-1/3 items-end" onPress={() => handleDelete(item._id)}>
        <Feather
          name="x"
          className="text-[#2666DE]"
          color={"#2666DE"}
          size={26}
        ></Feather>
      </TouchableOpacity>
      <Slider
        className="w-[100%]"
        style={{ width: "100%" }}
        minimumValue={1}
        maximumValue={3}
        minimumTrackTintColor="#2666DE"
        maximumTrackTintColor="#D4E2FD"
        thumbTintColor="#2666DE"
        step={1}
        value={item.level}
        onValueChange={(value) => handleLevel(item._id, value)}
      />
      <View className="flex-row w-[100%] justify-between">
        <Text className="text-lg font-regular text-[#2666DE]">Level 1</Text>
        <Text className="text-lg font-regular text-[#2666DE]">Level 3</Text>
      </View>
    </View>
  );
};

export default ScheduleItem;

const styles = StyleSheet.create({});
