import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { LineChart } from "react-native-gifted-charts";

const UserDashBoard = ({ predictedData, realData, lowest, highest, average, name, unit }) => {

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
    predictedData.map((data) => {
      if (extractHourFromTime(data.time) == hour) {
        data["label"] = "now";
        data["labelTextStyle"] = {
          color: "red",
          width: 60,
        };
      }
    })

  };
  addLabels(predictedData);
  
  const filteredRealData= realData.filter((data) => extractHourFromTime(data.time) <= hour);

  return (
    <View className="h-[60%]">
      <Text className="text-2xl font-bold m-3">{name}</Text>
      <View className="bg-white m-auto rounded-3xl flex-1 p-3 w-[95vw] justify-center ">
        <LineChart
          areaChart
          data={predictedData}
          data2={filteredRealData}
          width={330}
          height={150}
          hideDataPoints
          spacing={25}
          color1="#2666DE"
          color2="#2666DE"
          hideRules
          showVerticalLines
          thickness={2}
          startFillColor="#2666DE"
          endFillColor="#2666DE"
          startOpacity={0.5}
          endOpacity={0.2}
          startFillColor2="red"
          endFillColor2="red"
          startOpacity2={1}
          endOpacity2={0.1}
          initialSpacing={0}
          noOfSections={6}
          maxValue={60}
          yAxisColor="#2666DE"
          curved
          yAxisThickness={0}
          yAxisLabelSuffix={unit}
          rulesType="solid"
          rulesColor="#2666DE"
          yAxisTextStyle={{ color: "#2666DE" }}
          yAxisSide="right"
          xAxisColor="#2666DE"
          xAxisLength={330}
        />
        <View>
          <View className="flex-row items-center justify-between mt-3 py-2 w-1/2">
            <Text>Predicted Values:</Text>
            <Text className="border-b-2 w-10  border-[#2666DE]"> </Text>
          </View>
          <View className="flex-row items-center justify-between  py-2 w-1/2">
            <Text>Real Values:</Text>
            <Text className="border-b-2 w-10 border-red-500"> </Text>
          </View>
        </View>
        <View className="p-5">
          <View className="flex-row items-center justify-between mb-3 py-2 border-b-2 border-gray-300">
            <Text>Lowest Temperature:</Text>
            <Text>
              {lowest ? lowest : 0}
              {unit}
            </Text>
          </View>
          <View className="flex-row items-center justify-between mb-3 py-2 border-b-2 border-gray-300">
            <Text>Highest Temperature:</Text>
            <Text>
              {highest ? highest : 0}
              {unit}
            </Text>
          </View>

          <View className="flex-row items-center justify-between">
            <Text>Average Temperature:</Text>
            <Text>
              {average ? average.toPrecision(3) : 0}
              {unit}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default UserDashBoard;

const styles = StyleSheet.create({});
