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
  setlectSingleDeviceInfomation,
} from "../redux/deviceSlice/deviceSlice.js";
import DeviceItem from "../components/DeviceItem";
import { getSensorRecord } from "../apis/sensorAPI";

const senorRecord = {
  data: {
    _id: "660bbdca794602dd9c6dee0b",
    type: "temperature",
    value: 34.2,
    limit: 35,
    createdAt: "2024-04-02T08:11:54.882Z",
    updatedAt: "2024-04-02T08:11:54.882Z",
    __v: 0,
  },
};

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [doorStatus, setDoorStatus] = useState(false);
  const [fanStatus, setFanStatus] = useState(false);
  const [livingRoomLight, setLivingRoomLight] = useState(false);
  const [kitchenLight, setKitchenLight] = useState(false);
  const [humidity, setHumidity] = useState(0);
  const [temperature, setTemperature] = useState(0);
  const [light, setLight] = useState(0);
  const AllDevicesInfomation = useSelector(setlectAllDevicesInfomation);

  const FrontDoorInformation = useSelector((state) =>
    setlectSingleDeviceInfomation(state, "Front Door")
  );
  const LivingRoomFanInformation = useSelector((state) =>
    setlectSingleDeviceInfomation(state, "Living Room Fan")
  );
  const LivingRoomLightInformation = useSelector((state) =>
    setlectSingleDeviceInfomation(state, "Living Room Light")
  );
  const KitchenLightInformation = useSelector((state) =>
    setlectSingleDeviceInfomation(state, "Kitchen Light")
  );

  const handleGetAllDevices = async () => {
    try {
      const response = await getAllDivice();
      dispatch(setDevicesInfomation(response.data));
    } catch (e) {
      console.log(`error get all device ${e}`);
    }
  };

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

  useEffect(() => {
    handleGetAllDevices();

    const intervalDevices = setInterval(handleGetAllDevices, 5000);
    const intervalSensor = setInterval(handleGetAllSensorRecord, 60000);

    // Clean up the interval on component unmount
    return () => {
      clearInterval(intervalDevices);
      clearInterval(intervalSensor);
    };
  }, []);

  useEffect(() => {
    setFanStatus(LivingRoomFanInformation?.state);
    setDoorStatus(FrontDoorInformation?.state);
    setLivingRoomLight(LivingRoomLightInformation?.state);
    setKitchenLight(KitchenLightInformation?.state);
  }, [AllDevicesInfomation]);

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
                device_obj={FrontDoorInformation}
                navigateDevices="DoorDevice"
                status={doorStatus}
                setStatus={setDoorStatus}
              ></DeviceItem>
            </View>
            {/* Fan  */}
            <View className="w-[47%]">
              <DeviceItem
                device_obj={LivingRoomFanInformation}
                navigateDevices="FanDevice"
                status={fanStatus}
                setStatus={setFanStatus}
              ></DeviceItem>
            </View>

            {/* Ligh 1 */}
            <View className="w-[47%]">
              <DeviceItem
                device_obj={LivingRoomLightInformation}
                navigateDevices=""
                status={livingRoomLight}
                setStatus={setLivingRoomLight}
              ></DeviceItem>
            </View>

            {/* Ligh 2 */}
            <View className="w-[47%]">
              <DeviceItem
                device_obj={KitchenLightInformation}
                navigateDevices=""
                status={kitchenLight}
                setStatus={setKitchenLight}
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
