import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Switch,
  Image,
  Pressable,
  FlatList,
  Modal,
} from "react-native";
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Feather from "react-native-vector-icons/Feather";
import ScheduleItem from "../components/ScheduleItem";
import Slider from "@react-native-community/slider";
import { ScrollView } from "react-native-virtualized-view";
import { getFan } from "../apis/fanAPI";
import { updateDeviceState } from "../apis/deviceAPI";

const res = {
  data: [
    {
      _id: "660d266df45f00cdf91353fc",
      device_id: 1,
      name: "Living Room Fan",
      state: true,
      level: 3,
      type: "fan",
      isAuto: false,
      updatedAt: "2024-04-16T09:33:48.346Z",
      schedule: [
        {
          start_schedule_id: "f172a10b-ced7-4109-98d8-1775c4f15d9b",
          end_schedule_id: "d1481ec6-ec54-4366-98e6-0b7907d4e1c3",
          start: "2024-04-03T15:04:00.000Z",
          end: "2024-04-03T15:04:30.000Z",
          level: 1,
          _id: "661e2e472e125911eae1fd61",
        },
        {
          start_schedule_id: "983eba96-c98c-46dc-9ba5-794c688dba25",
          end_schedule_id: "9bd705d1-4ded-4457-ac72-cb05a86b338a",
          start: "2024-04-03T15:04:00.000Z",
          end: "2024-04-03T15:04:30.000Z",
          level: 1,
          _id: "661e2e572e125911eae1fd6d",
        },
      ],
      topic: "fan",
    },
  ],
};

const FanDeviceScreen = () => {
  const [notice, setNotice] = useState(false);
  const [openFan, setOpenFan] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [schedule, setSchedule] = useState([]);
  const [level, setLevel] = useState(2);

  const handleFrom = (key, value) => {
    const dateObj = new Date();
    const month = dateObj.getUTCMonth() + 1; // months from 1-12
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
    const pMonth = month.toString().padStart(2, "0");
    const pDay = day.toString().padStart(2, "0");
    const time = `${year}-${pMonth}-${pDay}T${value}:00.000Z`;
    setSchedule(
      schedule.map((item) =>
        item._id === key ? { ...item, start: time } : item
      )
    );
  };
  const handleTo = (key, value) => {
    const dateObj = new Date();
    const month = dateObj.getUTCMonth() + 1; // months from 1-12
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
    const pMonth = month.toString().padStart(2, "0");
    const pDay = day.toString().padStart(2, "0");
    const time = `${year}-${pMonth}-${pDay}T${value}:00.000Z`;
    setSchedule(
      schedule.map((item) => (item._id === key ? { ...item, end: time } : item))
    );
  };

  const handleLevel = (key, value) => {
    setSchedule(
      schedule.map((item) =>
        item._id === key ? { ...item, level: value } : item
      )
    );
  };

  const handleDelete = (key) => {
    setSchedule(schedule.filter((item) => item._id !== key));
  };

  const handleUpdateAutoMode = async () => {
    const prevState = notice;
    setNotice(!notice);
    const putData = {
      device_id: 1,
      isAuto: !notice,
    };

    try {
      const res = await updateDeviceState(putData);
      if (res) {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }

    if (prevState !== notice) {
      getFanInfo();
    }
  };

  const handleUpdateFan = async () => {
    setOpenFan(!openFan);
    const putData = {
      device_id: 1,
      state: !openFan,
    };
    try {
      const res = await updateDeviceState(putData);
      if (res) {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
    getFanInfo();
  };

  const handleUpdateLevel = async (level) => {
    setLevel(level);
    const putData = {
      device_id: 1,
      level: level,
    };
    try {
      const res = await updateDeviceState(putData);
      console.log(res);
      if (res) {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
    getFanInfo();
  };

  const handleAddSchedule = async () => {
    setSchedule([
      ...schedule,
      {
        start_schedule_id: "f172a10b-ced7-4109-98d8-1775c4f15d9b",
        end_schedule_id: "d1481ec6-ec54-4366-98e6-0b7907d4e1c3",
        start: "2024-04-03T15:04:00.000Z",
        end: "2024-04-03T15:04:30.000Z",
        level: 1,
        _id: Date.now().toString(),
      },
    ]);
  };
  
  useEffect(() => {
    getFanInfo();
  }, []);

  const getFanInfo = async () => {
    try {
      const fanInfo = await getFan();
      if (fanInfo) {
        setNotice(fanInfo.data[0].isAuto);
        setOpenFan(fanInfo.data[0].state);
        setSchedule(fanInfo.data[0].schedule);
        setLevel(fanInfo.data[0].level);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#EEF5FF] mb-[70]">
      <StatusBar barStyle={"opaque"} backgroundColor="black"></StatusBar>
      <Header name="Living Room Fan"></Header>

      <View className=" h-[50] flex-row-reverse items-center rounded-full mx-3">
        <TouchableOpacity onPress={() => setModalOpen(true)}>
          <Feather name="info" className="text-[#2666DE]" size={26} />
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalOpen}
          onRequestClose={() => {
            setModalOpen(!modalOpen);
          }}
        >
          <View className="flex-1 bg-black/[0.5] items-center justify-end">
            <View className="bg-white rounded-t-2xl justify-center items-center p-3">
              <Text className="text-lg font-bold text-[#2666DE] mb-3">
                Fan Automation Mode
              </Text>
              <Text className="mb-10 text-lg text-center">
                The fan will automatically turn on when the temperature ishigher
                than 20°C.
              </Text>
              <View className="flex w-full items-center">
                <TouchableOpacity
                  className="bg-[#2666DE] w-full p-3 justify-center items-center rounded-lg "
                  onPress={() => setModalOpen(false)}
                >
                  <Text className=" w-[85vw] justify-center text-center text-lg font-bold text-white">
                    Exit
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
      <View className="flex-row items-center justify-between rounded-2xl shadow-2x h-[50] bg-[#8AAEEF] mx-3 p-3">
        <Text className="text-lg font-bold text-[#2666DE]">Auto Mode</Text>
        <Switch
          trackColor={{ false: "#D4E2FD", true: "#2666DE" }}
          thumbColor={"#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={handleUpdateAutoMode}
          value={notice}
          style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
        />
      </View>
      {/* manual control */}
      <View
        className={`m-3 ${notice ? "opacity-50" : ""}`}
        pointerEvents={notice ? "none" : "auto"}
      >
        <Text className="text-lg font-regular mx-2 my-1 text-[#6F7EA8]">
          Manual Control
        </Text>

        <View className="flex-row flex-wrap w-[100%] items-center justify-between rounded-2xl shadow-2x bg-white p-3">
          <View className="flex-row w-3/4">
            <Image
              source={require("../assets/Vector.png")}
              className="w-6 h-8"
            ></Image>
            <Text className="text-lg font-bold text-[#2666DE]">
              {" "}
              Turn on the device
            </Text>
          </View>
          <Switch
            className="w-1/4"
            trackColor={{ false: "#D4E2FD", true: "#2666DE" }}
            thumbColor={"#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={handleUpdateFan}
            value={openFan}
            style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
          />
          <Slider
            className="w-[100%]"
            style={{ width: "100%", height: 40 }}
            minimumValue={1}
            maximumValue={3}
            minimumTrackTintColor="#2666DE"
            maximumTrackTintColor="#D4E2FD"
            thumbTintColor="#2666DE"
            step={1}
            disabled={!openFan}
            value={level}
            onValueChange={(value) => handleUpdateLevel(value)}
          />
          <View className="flex-row w-[100%] justify-between">
            <Text className="text-lg font-regular text-[#2666DE]">Level 1</Text>
            <Text className="text-lg font-regular text-[#2666DE]">Level 3</Text>
          </View>
        </View>
      </View>

      {/* schedule */}

      <View className="m-3">
        <View className="flex-row items-center justify-between h-[50]">
          <Text className="text-lg font-regular mx-2 my-1 text-[#6F7EA8]">
            Schedule
          </Text>
          <TouchableOpacity
            className="w-1/4 items-end"
            onPress={handleAddSchedule}
          >
            <Feather name="plus" className="text-[#2666DE]" size={26}></Feather>
          </TouchableOpacity>
        </View>
        <View className="h-[40vh] pb-10 items-center justify-center">
          <ScrollView>
            <FlatList
              data={schedule}
              renderItem={({ item }) => (
                <ScheduleItem
                  item={item}
                  handleFrom={handleFrom}
                  handleTo={handleTo}
                  handleLevel={handleLevel}
                  handleDelete={handleDelete}
                />
              )}
              keyExtractor={(item) => item._id}
            ></FlatList>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FanDeviceScreen;

const styles = StyleSheet.create({});
