import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import HistoryCard from "../components/HistoryCard";
import { getHistory } from "../apis/historyAPI";
import { useSelector } from "react-redux";
import { setlectRunningDevicesCount } from "../redux/deviceSlice/deviceSlice";

const HistoryScreen = () => {
  const [history, setHistory] = useState([]);
  const render = useSelector(setlectRunningDevicesCount);

  useEffect(() => {
    const getHistoryy = async () => {
      const historyData = await getHistory();
      setHistory(historyData.data);
      //   console.log(history);
    };
    getHistoryy();
  }, [render]);

  return (
    <SafeAreaView className="flex-1 bg-white mb-[70]">
      <StatusBar barStyle={"opaque"} backgroundColor="black"></StatusBar>
      <Header name="History"></Header>

      <View className="flex-1 px-3 mt-3 pb-10 ">
        {/* Dashboard */}
        <View className="flex-row items-center justify-between">
          <FlatList
            data={history}
            renderItem={({ item }) => (
              <HistoryCard content={item.deviceLogInfo} date={item.createdAt} />
            )}
          ></FlatList>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({});
