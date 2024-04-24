import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { getAllDivice } from "../apis/deviceAPI";
import { useDispatch, useSelector } from "react-redux";
import {
  setDevicesInfomation,
  setlectAllDevicesInfomation,
} from "../redux/deviceSlice/deviceSlice.js";
import DeviceItem from "../components/DeviceItem";
import { getSensorRecord } from "../apis/sensorAPI";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [humidity, setHumidity] = useState(0);
  const [temperature, setTemperature] = useState(0);
  const [light, setLight] = useState("");

  const AllDevicesInfomation = useSelector(setlectAllDevicesInfomation);

  const handleGetAllSensorRecord = async () => {
    try {
      const humidityRes = await getSensorRecord({
        type: "humidity",
        isAll: false,
      });
      setHumidity(humidityRes?.data?.value);

      const temperatureRes = await getSensorRecord({
        type: "temperature",
        isAll: false,
      });

      setTemperature(temperatureRes?.data?.value);
    } catch (e) {
      console.log(`error get all sensor record ${e}`);
    }
  };

  const handleGetAllDevices = async () => {
    try {
      const response = await getAllDivice();
      dispatch(setDevicesInfomation(response.data));
    } catch (e) {
      console.log(`Error get all device ${e}`);
    }
  };

  useEffect(() => {
    handleGetAllDevices();

    const intervalDevices = setInterval(handleGetAllDevices, 5000);
    const intervalSensor = setInterval(handleGetAllSensorRecord, 60000);

    return () => {
      clearInterval(intervalDevices);
      clearInterval(intervalSensor);
    };
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white mb-[70]">
      <StatusBar barStyle={"opaque"} backgroundColor="black"></StatusBar>
      <Header name="Home"></Header>
      <ScrollView>
        <View className="flex-1 px-3 mt-3 pb-10 ">
          {/* Dashboard */}

          <View className="flex-row items-center justify-between">
            <Text className="text-xl font-bold">Dashboard</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
              <Text className="text-md mr-2 text-blue-500 font-semibold">
                Details
              </Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-between items-center gap-x-2 mt-3">
            {/* Humidity */}
            <TouchableOpacity
              className="w-[31%] items-center justify-center shadow-2xl shadow-blue-600 h-[160] bg-[#f18759] rounded-2xl p-2"
              onPress={() => navigation.navigate("Dashboard")}
            >
              <View className="items-center justify-center h-[50%] ">
                <Ionicons name={"water-outline"} color={"white"} size={45} />
              </View>
              <Text className="font-bold text-md  text-white">Humidity</Text>
              <Text className="font-bold text-xl text-white">{humidity} %</Text>
            </TouchableOpacity>

            {/* Temperature */}
            <TouchableOpacity
              className="w-[31%] items-center justify-center shadow-2xl shadow-blue-600 h-[160] bg-[#874bff] rounded-2xl p-2"
              onPress={() => navigation.navigate("Dashboard")}
            >
              <View className="items-center justify-center h-[50%] ">
                <MaterialCommunityIcons
                  name={"coolant-temperature"}
                  color={"white"}
                  size={38}
                />
              </View>
              <Text className="font-bold text-md text-white">Temperature</Text>
              <Text className="font-bold text-xl text-white">
                {temperature} °C
              </Text>
            </TouchableOpacity>

            {/* Light */}
            <TouchableOpacity
              className="w-[31%] items-center justify-center shadow-2xl shadow-blue-600 h-[160] bg-[#F4C427] rounded-2xl p-2"
              onPress={() => navigation.navigate("Dashboard")}
            >
              <View className="items-center justify-center h-[50%] ">
                <Entypo name={"light-up"} color={"white"} size={45} />
              </View>
              <Text className="font-bold text-md text-white">Light </Text>
              <Text className="font-bold text-xl text-white">{light} lx</Text>
            </TouchableOpacity>
          </View>

          {/* Devices */}
          <Text className="text-xl font-bold mt-3">Devices</Text>
          <View className="flex-row flex-wrap justify-between items-center gap-2 gap-y-5 mt-1">
            {/* Door  */}
            <View className="w-[47%]">
              <DeviceItem
                device_name="Front Door"
                device_obj={AllDevicesInfomation.find(
                  (item) => item.name === "Front Door"
                )}
                navigateDevices="DoorDevice"
                status={
                  AllDevicesInfomation.find(
                    (item) => item.name === "Front Door"
                  )?.state
                }
              ></DeviceItem>
            </View>

            {/* Fan  */}
            <View className="w-[47%]">
              <DeviceItem
                device_name="Living Room Fan"
                device_obj={AllDevicesInfomation.find(
                  (item) => item.name === "Living Room Fan"
                )}
                navigateDevices="FanDevice"
                status={
                  AllDevicesInfomation.find(
                    (item) => item.name === "Living Room Fan"
                  )?.state
                }
              ></DeviceItem>
            </View>

            {/* Ligh 1 */}
            <View className="w-[47%]">
              <DeviceItem
                device_name="Living Room Light"
                device_obj={AllDevicesInfomation.find(
                  (item) => item.name === "Living Room Light"
                )}
                navigateDevices=""
                status={
                  AllDevicesInfomation.find(
                    (item) => item.name === "Living Room Light"
                  )?.state
                }
              ></DeviceItem>
            </View>

            {/* Ligh 2 */}
            <View className="w-[47%]">
              <DeviceItem
                device_name="Kitchen Light"
                device_obj={AllDevicesInfomation.find(
                  (item) => item.name === "Kitchen Light"
                )}
                navigateDevices=""
                status={
                  AllDevicesInfomation.find(
                    (item) => item.name === "Kitchen Light"
                  )?.state
                }
              ></DeviceItem>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
