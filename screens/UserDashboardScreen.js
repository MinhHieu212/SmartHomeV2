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
  

  useEffect(() => {
    const getDevices = async () => {
      const deviceData = await getAllDivice();
      setDevice(deviceData.data);
    };
    getDevices();

    const getPredictedData = async () => {
      const predictedData = await getDashboard();
      setPredictedData(predictedData.data.predictedData);
      setRealData(predictedData.data.realData);
      setLowest(predictedData.data.lowest);
      setHighest(predictedData.data.highest);
      setAverage(predictedData.data.average);
    };
    getPredictedData();

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
