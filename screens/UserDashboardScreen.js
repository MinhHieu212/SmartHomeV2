import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import UserDashBoard from "../components/UserDashBoard";
import { getAllDivice } from "../apis/deviceAPI";
import { getDashboard } from "../apis/dashboardAPI";

const UserDashboardScreen = ({ route }) => {
  const [device, setDevice] = useState([]);
  const [predictedData, setPredictedData] = useState([]);
  const [realData, setRealData] = useState([]);
  const [lowest, setLowest] = useState(0);
  const [highest, setHighest] = useState(0);
  const [average, setAverage] = useState(0);

  const [predictHumidity, setPredictHumidity] = useState([]);
  const [realHumidity, setRealHumidity] = useState([]);

  useEffect(() => {
    const getDevices = async () => {
      const deviceData = await getAllDivice();
      setDevice(deviceData.data);
    };
    getDevices();

    const getPredictedData = async () => {
      const predictedData = await getDashboard("temperature");
      setPredictedData(predictedData.data.predictedData);
      setRealData(predictedData.data.realData);
    };
    getPredictedData();
    const getHumidityData = async () => {
      const humidityData = await getDashboard("humidity");
      setPredictHumidity(humidityData.data.predictedData);
      setRealHumidity(humidityData.data.realData);
      console.log(humidityData);
    };
    getHumidityData();
  }, []);

  const { userName } = route.params;

  return (
    <SafeAreaView className="flex-1 bg-[#EEF5FF] mb-[70]">
      <StatusBar barStyle={"opaque"} backgroundColor="black"></StatusBar>
      <Header name={userName}></Header>
      <ScrollView>
        <UserDashBoard
          predictedData={predictedData}
          realData={realData}
          lowest={lowest}
          highest={highest}
          average={average}
          name="Temperature"
          unit="°C"
          upperBound={60}
        ></UserDashBoard>

        <UserDashBoard
          predictedData={predictHumidity}
          realData={realHumidity}
          name="Humidity"
          unit="%"
          upperBound={100}
        ></UserDashBoard>
        <View>
          <Text className="text-2xl mb-5 font-bold m-3">Devices</Text>
          <View className="bg-white m-auto mb-10 rounded-3xl flex-1 p-3 w-[95vw] justify-center">
            <View className="flex flex-row justify-between rounded-2xl border-[#8391A1] border-b-2 shadow-2x bg-white p-3">
              <Text className="text-xl font-bold  pb-2">Device Name</Text>
              <Text className="text-xl font-bold pb-2">Status</Text>
            </View>
            {device.map((device) => (
              <View className="flex flex-row justify-between rounded-2xl border-[#8391A1] border-b-2 shadow-2x bg-white p-3">
                <Text className="pb-2">{device.name}</Text>
                <Text className="pb-2">{device.state ? "On" : "Off"}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserDashboardScreen;

const styles = StyleSheet.create({});
