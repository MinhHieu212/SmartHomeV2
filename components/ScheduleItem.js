import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Slider from "@react-native-community/slider";
import Icon from "react-native-vector-icons/Ionicons";
import { setDevicesInfomation } from "../redux/deviceSlice/deviceSlice";
import { getAllDivice, updateDeviceState } from "../apis/deviceAPI";

const convertToHHMM = (dateTimeString) => {
  const date = new Date(dateTimeString);
  return date.toISOString().slice(11, 16);
};

const ScheduleItem = ({ item, dispatch }) => {
  const handleDeleteSchedule = async () => {
    const putData = {
      device_id: 1,
      topic: "fan",
      isScheduleDeleted: true,
      scheduleTime: [
        {
          start_schedule_id: item.start_schedule_id,
          end_schedule_id: item.end_schedule_id,
        },
      ],
    };

    console.log(JSON.stringify(putData, null, 2));

    try {
      await updateDeviceState(putData);
      const response = await getAllDivice();
      dispatch(setDevicesInfomation(response.data));
    } catch (error) {
      console.log("Delete the Schedule Fails", error);
    }
  };

  return (
    <View className="mx-4 my-2 p-2 pt-3 items-center justify-evenly shadow-2x bg-white shadow-zinc-600 rounded-lg">
      <View className="absolute top-0 right-0">
        <TouchableOpacity onPress={handleDeleteSchedule}>
          <Icon name="close" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <View className="flex-row w-full justify-start gap-2">
        <Text className="text-lg font-semibold ">From</Text>
        <Text className="border-2 border-blue-500 px-4 text-lg font-bold text-blue-600 rounded-md">
          {convertToHHMM(item.start)}
        </Text>

        <Text className="text-lg font-semibold ">To</Text>
        <Text className="border-2 border-blue-500 mr-3 px-4 text-lg font-bold text-blue-600 rounded-md">
          {convertToHHMM(item.end)}
        </Text>
      </View>
      <View className="w-[100%]">
        <Slider
          style={{ width: "100%", height: 25 }}
          minimumValue={1}
          maximumValue={3}
          minimumTrackTintColor="#2666DE"
          maximumTrackTintColor="#D4E2FD"
          thumbTintColor="#2666DE"
          step={1}
          value={item.level}
        />
        <View className="flex-row w-[90%] mx-auto mt-3 justify-between">
          <Text className="text-md font-regular text-[#2666DE]">Level 1</Text>
          <Text className="text-md font-regular text-[#2666DE]">Level 2</Text>
          <Text className="text-md font-regular text-[#2666DE]">Level 3</Text>
        </View>
      </View>
    </View>
  );
};

export default ScheduleItem;

const styles = StyleSheet.create({});
