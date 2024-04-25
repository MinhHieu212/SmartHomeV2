import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from "react-native";
import React from "react";
import Header from "../components/Header";
import DashBoard from "../components/DashBoard";
import {
  BarChart,
  LineChart,
  PieChart,
  PopulationPyramid,
} from "react-native-gifted-charts";

const DashboardScreen = () => {
  const temperature = [
    {
      value: 32,
      time: "0:00",
      label: "0:00",
      labelTextStyle: { color: "#2666DE", width: 60 },  
    },
    { value: 32, time: "1:00" },
    { value: 32, time: "2:00" },
    { value: 21, time: "3:00" },
    { value: 12, time: "4:00" },
    { value: 56, time: "5:00" },
    {
      value: 43,
      time: "6:00",
      label: "6:00",
      labelTextStyle: { color: "#2666DE", width: 60 },
    },

    { value: 22, time: "7:00" },
    { value: 16, time: "8:00" },
    { value: 16, time: "9:00" },
    { value: 23, time: "10:00" },
    { value: 34, time: "11:00" },
    {
      value: 35,
      time: "12:00",
      label: "12:00",
      labelTextStyle: { color: "#2666DE", width: 60 },
    },

    { value: 15, time: "13:00" },
    { value: 34, time: "14:00" },
    { value: 15, time: "15:00" },
    { value: 35, time: "16:00" },
    { value: 27, time: "17:00" },
    {
      value: 22,
      time: "18:00",
      label: "18:00",
      labelTextStyle: { color: "#2666DE", width: 60 },
    },

    { value: 29, time: "19:00" },
    { value: 19, time: "20:00" },
  ];
  return (
    <SafeAreaView className="flex-1 bg-[#EEF5FF] mb-[70]">
      <StatusBar barStyle={"opaque"} backgroundColor="black"></StatusBar>
      <Header name="Dashboard"></Header>
      <ScrollView>
        <DashBoard data={temperature} name="Temperature" unit="°C"></DashBoard>
        <DashBoard data={temperature} name="Humidity" unit="%"></DashBoard>
        <DashBoard data={temperature} name="Lighting" unit="cd"></DashBoard>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({});
