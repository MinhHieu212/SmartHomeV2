import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import DashBoard from "../components/DashBoard";
import { getDashboard } from "../apis/dashboardAPI";

const DashboardScreen = () => {

  const [temperature, setTemperature] = useState([]);

  useEffect(() => {
    const getTemperature = async () => {
      const temperatureData = await getDashboard();
      setTemperature(temperatureData.data.realData);
      // setHumidity(temperatureData.data.humidity);
    }
    getTemperature();
  }, []);

  const hour = new Date().getHours();
  const extractHourFromTime = (time) => {
    const [hour, _] = time.split(":");
    return Number(hour);
  };
  const addLabels = (predictedData) => {
    for (let i = 0; i < predictedData.length; i += 6) {
      predictedData[i]["label"] = predictedData[i].time;
      predictedData[i]["labelTextStyle"] = {
        color: "#2666DE",
        width: 60,
      };
      const hour = new Date().getHours();
    }
    temperature.map((data) => {
      if (extractHourFromTime(data.time) == hour) {
        data["label"] = "now";
        data["labelTextStyle"] = {
          color: "red",
          width: 60,
        };
      }
    })

  };
  addLabels(temperature);
  const filteredRealData= temperature.filter((data) => extractHourFromTime(data.time) <= hour);

  return (
    <SafeAreaView className="flex-1 bg-[#EEF5FF] mb-[70]">
      <StatusBar barStyle={"opaque"} backgroundColor="black"></StatusBar>
      <Header name="Dashboard"></Header>
      <ScrollView>
        <DashBoard data={filteredRealData} name="Temperature" unit="°C"></DashBoard>
        <DashBoard data={filteredRealData} name="Humidity" unit="%"></DashBoard>
        {/* <DashBoard data={temperature} name="Lighting" unit="cd"></DashBoard> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({});
