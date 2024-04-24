import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Switch,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { Picker } from "@react-native-picker/picker";
import { getDoor } from "../apis/doorAPI";
import { updateDeviceState } from "../apis/deviceAPI";
import { useDispatch, useSelector } from "react-redux";
import {
  setlectSingleDeviceInfomation,
  updateDevicesInfomation,
} from "../redux/deviceSlice/deviceSlice";

const numbers = Array.from({ length: 60 }, (_, index) => {
  const unit = index > 1 ? " minutes" : " minute";
  return (index + 1).toString() + unit;
});

const DoorDeviceScreen = () => {
  const dispatch = useDispatch();
  const DoorInformation = useSelector((state) =>
    setlectSingleDeviceInfomation(state, "Front Door")
  );

  const [notice, setNotice] = useState(DoorInformation?.isAuto || false);
  const [doorOpen, setDoorOpen] = useState(DoorInformation?.state || false);
  const [selectedMinute, setSelectedMinute] = useState(
    DoorInformation.close_time.toString() +
      (DoorInformation.close_time > 1 ? " minutes" : " minute")
  );

  const getDoorInfo = async () => {
    try {
      const doorInfo = await getDoor();
      if (doorInfo) {
        setDoorOpen(doorInfo.data[0].state);
        setNotice(doorInfo.data[0].isAuto);
        setSelectedMinute(
          doorInfo.data[0].close_time.toString() +
            (doorInfo.data[0].close_time > 1 ? " minutes" : " minute")
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDoorInfo();
  }, []);

  const handleUpdateNotice = async () => {
    const putData = {
      device_id: 2,
      isAuto: !notice,
    };

    setNotice(!notice);

    try {
      await updateDeviceState(putData);
    } catch (error) {
      getDoorInfo();
      console.log(error);
    }
  };

  const handleUpdateSelectedMinute = async (itemValue) => {
    const putData = {
      device_id: 2,
      close_time: parseInt(itemValue.split(" ")[0]),
    };

    setSelectedMinute(itemValue);

    try {
      const res = await updateDeviceState(putData);
      if (res) {
        setSelectedMinute(
          res.data.close_time.toString() +
            (res.data.close_time > 1 ? " minutes" : " minute")
        );
      }
    } catch (error) {
      getDoorInfo();
      console.log(error);
    }
  };

  const handleOpenDoor = async () => {
    const putData = {
      device_id: 2,
      state: !doorOpen,
    };

    setDoorOpen(!doorOpen);

    try {
      const res = await updateDeviceState(putData);
      if (res) {
        dispatch(
          updateDevicesInfomation({
            name: "Front Door",
            state: res?.data?.state || doorOpen,
          })
        );
      }
    } catch (error) {
      getDoorInfo();
      console.log(error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#EEF5FF] mb-[70]">
      <StatusBar barStyle={"opaque"} backgroundColor="black"></StatusBar>
      <Header name="Front Door"></Header>
      <ScrollView>
        {/* manual control */}

        <View className={`m-3`}>
          <Text className="text-lg font-regular mx-2 text-[#6F7EA8]">
            Manual Control
          </Text>
          <View className="flex-row items-center mt-5 justify-between rounded-2xl shadow-2x h-[70] bg-white p-3">
            <View className="flex-row">
              <Image
                source={require("../assets/icon-park-solid_door-handle.png")}
                className="w-5 h-7"
              ></Image>
              <Text className="text-lg ml-3 font-bold text-[#2666DE]">
                Open the door
              </Text>
            </View>
            <Switch
              trackColor={{ false: "#D4E2FD", true: "#2666DE" }}
              thumbColor={"#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={handleOpenDoor}
              value={doorOpen}
              style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
            />
          </View>
        </View>
        <Text className="text-lg font-regular mx-2 my-1 text-[#6F7EA8] px-3">
          Auto Mode Config
        </Text>
        <View className="flex-row items-center justify-between rounded-2xl shadow-2x h-[50] bg-[#8AAEEF] mx-3 my-5 p-3">
          <Text className="text-lg font-bold text-[#2666DE]">Auto Mode</Text>
          <Switch
            trackColor={{ false: "#D4E2FD", true: "#2666DE" }}
            thumbColor={"#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={handleUpdateNotice}
            value={notice}
            style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
          />
        </View>
        {/* auto mode */}

        {/* auto mode control */}
        <View
          className={`m-3 ${!notice ? "opacity-50" : ""}`}
          pointerEvents={!notice ? "none" : "auto"}
        >
          <View className="flex-row items-center justify-between rounded-2xl shadow-2x h-[70] bg-white p-3">
            <Text className="text-lg font-regular">Close door after</Text>
            <View className="w-[50%] justify-center h-[40] border-2 rounded-xl border-[#2666DE] p-0 m-0">
              <Picker
                selectedValue={selectedMinute}
                onValueChange={(itemValue, itemIndex) =>
                  handleUpdateSelectedMinute(itemValue)
                }
                mode="dropdown"
                dropdownIconColor="#2666DE"
                dropdownIconRippleColor="#2666DE"
                itemStyle={{ color: "#2666DE" }}
              >
                {numbers.map((number) => (
                  <Picker.Item key={number} label={number} value={number} />
                ))}
              </Picker>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DoorDeviceScreen;

const styles = StyleSheet.create({});
