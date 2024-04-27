import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { setDevicesInfomation } from "../redux/deviceSlice/deviceSlice";
import { getAllDivice, updateDeviceState } from "../apis/deviceAPI";

const displayVNTime = (value) => {
  const existingStart = new Date(value);

  existingStart.setHours(existingStart.getHours() + 8);

  return existingStart.toISOString().slice(11, 16);
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
          {displayVNTime(item.start)}
        </Text>

        <Text className="text-lg font-semibold ">To</Text>
        <Text className="border-2 border-blue-500 mr-3 px-4 text-lg font-bold text-blue-600 rounded-md">
          {displayVNTime(item.end)}
        </Text>
      </View>
      <View className="w-[100%]" pointerEvents="none">
        <View className="flex-row w-[90%] mx-auto mt-3 justify-between">
          <Text
            className={`text-md  ${
              item.level === 1
                ? "text-white font-bold bg-blue-400 rounded-sm"
                : "text-[#465675] font-regular"
            }`}
          >
            Level 1
          </Text>
          <Text
            className={`text-md  ${
              item.level === 2
                ? "text-white font-bold bg-blue-400 rounded-sm"
                : "text-[#465675] font-regular"
            }`}
          >
            Level 2
          </Text>
          <Text
            className={`text-md  ${
              item.level === 3
                ? "text-white font-bold bg-blue-400 rounded-sm"
                : "text-[#465675] font-regular"
            }`}
          >
            Level 3
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ScheduleItem;

const styles = StyleSheet.create({});
