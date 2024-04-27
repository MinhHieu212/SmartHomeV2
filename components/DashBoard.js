import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { LineChart } from "react-native-gifted-charts";

const DashBoard = ({ data, name, unit, upperBound }) => {
  return (
    <View className="m-2 items-center">
      <Text className="text-2xl font-bold my-5">{name}</Text>
      <View className="bg-white rounded-3xl flex-1 p-1 items-center w-[95vw] justify-center h-[25vh]">
        <LineChart
          areaChart
          data={data}
          width={350}
          height={150}
          hideDataPoints
          spacing={25}
          color="#2666DE"
          hideRules
          showVerticalLines
          thickness={2}
          startFillColor="#2666DE"
          endFillColor="rgba(38,102,222,0.5)"
          startOpacity={0.9}
          endOpacity={0.2}
          initialSpacing={0}
          noOfSections={6}
          maxValue={upperBound}
          yAxisColor="#2666DE"
          curved
          yAxisThickness={0}
          yAxisLabelSuffix={unit}
          rulesType="solid"
          rulesColor="#2666DE"
          yAxisTextStyle={{ color: "#2666DE" }}
          yAxisSide="right"
          xAxisColor="#2666DE"
          xAxisLength={350}
          
        />
      </View>
    </View>
  );
};

export default DashBoard;

const styles = StyleSheet.create({});
