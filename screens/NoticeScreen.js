import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Ionicons from "react-native-vector-icons/Ionicons";
import { err } from "react-native-svg";
import { getNotifications } from "../apis/noticeAPI";

const displayVNTime = (value) => {
  const existingStart = new Date(value);

  existingStart.setHours(existingStart.getHours() + 7);

  return (
    "Time: " +
    existingStart.toISOString().slice(11, 16) +
    ", Date " +
    existingStart.toISOString().slice(0, 10)
  );
};

const NoticeScreen = () => {
  const [notificationList, setNotificationList] = useState([]);

  const callAPI = async () => {
    try {
      const responce = await getNotifications();

      setNotificationList(responce.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    callAPI();

    intervalId = setInterval(callAPI, 180000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const notificationItem = ({ item }) => {
    return (
      <View className="w-[95vw] bg-white shadow-lg shadow-slate-500 flex-row items-center justify-between rounded-2xl p-2 my-2">
        <View className="p-2 shadow-xl shadow-black rounded-full bg-white">
          <Ionicons name={"water-outline"} color={"red"} size={20} />
        </View>
        <View className="w-[90%] ml-1">
          <Text
            className="p-1 text-red-600 font-bold overflow-hidden h-8 truncate"
            style={styles.textSize}
          >
            {item?.description}
          </Text>
          <Text className="p-1 text-md font-bold text-blue-800">
            {displayVNTime(item?.updatedAt)}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white mb-[70]">
      <StatusBar barStyle={"opaque"} backgroundColor="black"></StatusBar>
      <Header name="Notice"></Header>
      {/* <ScrollView className="mt-1 h-[80vh]"> */}
      <View className="h-[80vh] pb-10 mt-2 items-center justify-center">
        <FlatList
          data={notificationList}
          renderItem={notificationItem}
          keyExtractor={(item) => item._id}
        ></FlatList>
      </View>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

export default NoticeScreen;

const styles = StyleSheet.create({
  textSize: {
    fontSize: 18,
  },
});
