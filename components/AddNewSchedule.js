import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Feather } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import React, { useState } from "react";
import { getAllDivice, updateDeviceState } from "../apis/deviceAPI";
import { useDispatch } from "react-redux";
import { setDevicesInfomation } from "../redux/deviceSlice/deviceSlice";

const displayVNTime = (value) => {
  const existingStart = new Date(value);

  existingStart.setHours(existingStart.getHours() + 7);

  return existingStart.toISOString().slice(11, 16);
};

const AddNewSchedule = ({ closeModal = () => {} }) => {
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

    console.log(JSON.stringify(putData, null, 2));

    try {
      await updateDeviceState(putData);
      const response = await getAllDivice();
      dispatch(setDevicesInfomation(response.data));
    } catch (error) {
      console.log("Add new Schedule Fails", error);
    }

    closeModal();
  };

  const handleFrom = (value) => {
    const today = new Date();
    const existingStart = new Date(value);

    existingStart.setFullYear(today.getFullYear());

    existingStart.setMonth(today.getMonth());

    existingStart.setDate(today.getDate());

    setValue((prev) => ({ ...prev, start: existingStart.toISOString() }));
  };

  const handleTo = (value) => {
    const today = new Date();
    const existingStart = new Date(value);

    existingStart.setFullYear(today.getFullYear());

    existingStart.setMonth(today.getMonth());

    existingStart.setDate(today.getDate());

    setValue((prev) => ({ ...prev, end: existingStart.toISOString() }));
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
            {displayVNTime(value.start)}
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
            {displayVNTime(value.end)}
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

export default AddNewSchedule;

const styles = StyleSheet.create({});
