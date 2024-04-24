import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Feather } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import React, { useState } from "react";
import { getAllDivice, updateDeviceState } from "../apis/deviceAPI";
import { useDispatch } from "react-redux";
import { setDevicesInfomation } from "../redux/deviceSlice/deviceSlice";

const ScheduleItem = ({ closeModal = () => {} }) => {
  const dispatch = useDispatch();

  const [showFrom, setShowFrom] = useState(false);
  const [showTo, setShowTo] = useState(false);
  const [value, setValue] = useState({
    start: "2024-04-18T00:00:00.000Z",
    end: "2024-04-18T00:00:00.000Z",
    level: 1,
  });

  const handleAddNewSchedule = async () => {
    const putData = {
      device_id: 1,
      topic: "fan",
      scheduleTime: [value],
    };

    try {
      await updateDeviceState(putData);
      const response = await getAllDivice();
      dispatch(setDevicesInfomation(response.data));

      console.log("Add new Schedule Success");
    } catch (error) {
      console.log("Add new Schedule Fails", error);
    }

    closeModal();
  };

  const handleFrom = (value) => {
    const existingStart = new Date();
    existingStart.setUTCHours(parseInt(value.toISOString().slice(11, 13)) + 8);
    existingStart.setUTCMinutes(parseInt(value.toISOString().slice(14, 16)));
    const newStart = existingStart.toISOString();
    setValue((prev) => ({ ...prev, start: newStart }));
  };

  const handleTo = (value) => {
    const existingStart = new Date();
    existingStart.setUTCHours(parseInt(value.toISOString().slice(11, 13)) + 8);
    existingStart.setUTCMinutes(parseInt(value.toISOString().slice(14, 16)));
    const newStart = existingStart.toISOString();
    setValue((prev) => ({ ...prev, end: newStart }));
  };

  const handleLevel = (value) => {
    setValue((prev) => ({ ...prev, level: value }));
  };

  return (
    <View className="flex flex-row flex-wrap items-center justify-between rounded-2xl shadow-2x bg-white p-3 my-1">
      <View className="w-[40%] space-x-2 flex-row justify-end">
        <Text className="text-lg font-regular "> From </Text>
        <TouchableOpacity
          className="px-1 flex-row justify-between rounded-md border-2 border-[#2666DE]"
          onPress={() => setShowFrom(true)}
        >
          <Text className="text-lg font-regular  text-[#2666DE]">
            {value.start.slice(11, 16)}
          </Text>
          <Feather
            name="chevron-down"
            className="text-[#2666DE]"
            size={26}
            color={"#2666DE"}
          ></Feather>
        </TouchableOpacity>
        {showFrom && (
          <DateTimePicker
            testID="dateTimePicker"
            mode="time"
            value={new Date(0)}
            is24Hour={true}
            onChange={(evt, selectedDate) => {
              setShowFrom(false);
              handleFrom(selectedDate);
            }}
          />
        )}
      </View>
      <View className="w-[40%] space-x-2 flex-row">
        <Text className="text-lg font-regular "> To </Text>
        <TouchableOpacity
          className="px-1 flex-row justify-between rounded-md border-2 border-[#2666DE]"
          onPress={() => setShowTo(true)}
        >
          <Text className="text-lg font-regular  text-[#2666DE]">
            {value.end.slice(11, 16)}
          </Text>
          <Feather
            name="chevron-down"
            className="text-[#2666DE]"
            size={26}
            color={"#2666DE"}
          ></Feather>
        </TouchableOpacity>
        {showTo && (
          <DateTimePicker
            testID="dateTimePicker"
            mode="time"
            value={new Date(0)}
            is24Hour={true}
            onChange={(evt, selectedDate) => {
              setShowTo(false);
              handleTo(selectedDate);
            }}
          />
        )}
      </View>
      <View className="my-3">
        <Slider
          className="w-[100%]"
          style={{ width: "100%" }}
          minimumValue={1}
          maximumValue={3}
          minimumTrackTintColor="#2666DE"
          maximumTrackTintColor="#D4E2FD"
          thumbTintColor="#2666DE"
          step={1}
          value={value.level}
          onValueChange={(value) => handleLevel(value)}
        />
        <View className="flex-row w-[100%] justify-between">
          <Text className="text-lg font-regular text-[#2666DE]">Level 1</Text>
          <Text className="text-lg font-regular text-[#2666DE]">Level 2</Text>
          <Text className="text-lg font-regular text-[#2666DE]">Level 3</Text>
        </View>
      </View>

      <View className="flex-row justify-evenly items-center w-full mt-10">
        <TouchableOpacity
          onPress={() => {
            closeModal();
          }}
        >
          <Text className="px-6 py-2 rounded-md text-lg bg-orange-600 font-semibold text-white">
            Cancel
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleAddNewSchedule}>
          <Text className="px-6 py-2 text-lg rounded-md bg-blue-600 font-semibold text-white">
            Apply
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ScheduleItem;

const styles = StyleSheet.create({});
