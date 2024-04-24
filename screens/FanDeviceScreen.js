import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Switch,
  Image,
  FlatList,
  Modal,
} from "react-native";
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Feather from "react-native-vector-icons/Feather";
// import ScheduleItem from "../components/ScheduleItem";
import Slider from "@react-native-community/slider";
import { ScrollView } from "react-native-virtualized-view";
import { updateDeviceState } from "../apis/deviceAPI";
import { useDispatch, useSelector } from "react-redux";
import {
  setlectSingleDeviceInfomation,
  updateDevicesInfomation,
} from "../redux/deviceSlice/deviceSlice";

const convertToHHMM = (dateTimeString) => {
  const date = new Date(dateTimeString);
  const hours = date.getHours().toString().padStart(2, "0"); // Lấy giờ và thêm số 0 phía trước nếu cần
  const minutes = date.getMinutes().toString().padStart(2, "0"); // Lấy phút và thêm số 0 phía trước nếu cần
  return `${hours}:${minutes}`;
};

const ScheduleItem = ({ item }) => (
  <View className="mx-4 my-2 p-3  items-center justify-evenly shadow-2x bg-white shadow-zinc-600 rounded-lg">
    <View className="v-[40%] flex-row space-x-2">
      <Text className="text-lg font-semibold ">From</Text>
      <Text className="border-2 border-blue-500 px-4 text-lg font-bold text-blue-600 rounded-md">
        {convertToHHMM(item.start)}
      </Text>

      <View className="v-[40%] flex-row space-x-2"></View>
      <Text className="text-lg font-semibold ">To</Text>
      <Text className="border-2 border-blue-500 px-4 text-lg font-bold text-blue-600 rounded-md">
        {convertToHHMM(item.start)}
      </Text>
    </View>
    <View>
      <Slider
        style={{ width: "100%", height: 20 }}
        minimumValue={1}
        maximumValue={3}
        minimumTrackTintColor="#2666DE"
        maximumTrackTintColor="#D4E2FD"
        thumbTintColor="#2666DE"
        step={1}
        value={item.level}
      />
      <View className="flex-row w-[100%] justify-between">
        <Text className="text-md font-regular text-[#2666DE]">Level 1</Text>
        <Text className="text-md font-regular text-[#2666DE]">Level 2</Text>
        <Text className="text-md font-regular text-[#2666DE]">Level 3</Text>
      </View>
    </View>
  </View>
);

const FanDeviceScreen = () => {
  const dispatch = useDispatch();
  const FanInformation = useSelector((state) =>
    setlectSingleDeviceInfomation(state, "Living Room Fan")
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [schedule, setSchedule] = useState([
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
      level: 2,
      _id: "661e2e572e125911eae1fd6d",
    },
    {
      start_schedule_id: "983eba96-c98c-46dc-9ba5-794c688dba25",
      end_schedule_id: "9bd705d1-4ded-4457-ac72-cb05a86b338a",
      start: "2024-04-03T15:04:00.000Z",
      end: "2024-04-03T15:04:30.000Z",
      level: 3,
      _id: "661e2e572e125911eae1fd6d",
    },
  ]);

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
    const prevIsAuto = FanInformation?.isAuto;
    dispatch(
      updateDevicesInfomation({
        name: FanInformation?.name,
        data: {
          isAuto: !prevIsAuto,
        },
      })
    );
    const putData = {
      device_id: FanInformation?.device_id,
      isAuto: !prevIsAuto,
    };
    try {
      await updateDeviceState(putData);
    } catch (error) {
      dispatch(
        updateDevicesInfomation({
          name: FanInformation?.name,
          data: {
            isAuto: prevIsAuto,
          },
        })
      );
    }
  };

  const handleUpdateLevel = async (level) => {
    const prevLevel = FanInformation?.level || 1;
    dispatch(
      updateDevicesInfomation({
        name: FanInformation?.name,
        data: {
          level: level,
        },
      })
    );
    const putData = {
      device_id: FanInformation?.device_id,
      level: level,
    };
    try {
      await updateDeviceState(putData);
    } catch (error) {
      dispatch(
        updateDevicesInfomation({
          name: FanInformation?.name,
          data: {
            level: prevLevel,
          },
        })
      );
    }
  };

  const handleUpdateFanState = async () => {
    const prevState = FanInformation?.state;
    dispatch(
      updateDevicesInfomation({
        name: FanInformation?.name,
        data: {
          state: !prevState,
        },
      })
    );
    const putData = {
      device_id: FanInformation?.device_id,
      state: !prevState,
    };
    try {
      await updateDeviceState(putData);
    } catch (error) {
      dispatch(
        updateDevicesInfomation({
          name: FanInformation?.name,
          data: {
            state: prevState,
          },
        })
      );
    }
  };

  const handleAddSchedule = async () => {
    setSchedule([
      ...schedule,
      {
        start: "2024-04-03T00:04:00.000Z",
        end: "2024-04-03T00:01:00.000Z",
        level: 1,
      },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#EEF5FF] mb-[70]">
      <StatusBar barStyle={"opaque"} backgroundColor="black"></StatusBar>
      <Header name="Living Room Fan"></Header>
      <ScrollView>
        {/* Modal */}
        <View
          className={`h-[50] ${
            modalOpen ? "absolute" : "hidden"
          } flex-row-reverse items-center rounded-full mx-3`}
        >
          <Modal
            animationType="fade"
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
                  The fan will automatically turn on when the temperature
                  ishigher than 20°C.
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
        {/* Add Modal */}
        <View
          className={`h-[100] ${
            addModalOpen ? "absolute" : "hidden"
          } flex-row-reverse items-center rounded-full mx-3`}
        >
          <Modal
            animationType="fade"
            transparent={true}
            visible={addModalOpen}
            onRequestClose={() => {
              setAddModalOpen(!addModalOpen);
            }}
          >
            <View className="flex-1 bg-black/[0.5] items-center justify-end">
              <View className="bg-white rounded-t-2xl justify-center items-center p-3">
                <Text className="text-lg font-bold text-[#2666DE] mb-3">
                  Fan Automation Mode
                </Text>
                <Text className="mb-10 text-lg text-center">
                  The fan will automatically turn on when the temperature
                  ishigher than 20°C.
                </Text>
                <View className="flex w-full items-center">
                  <TouchableOpacity
                    className="bg-[#2666DE] w-full p-3 justify-center items-center rounded-lg "
                    onPress={() => setAddModalOpen(false)}
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

        {/* manual control */}
        <View className={`mx-3 mt-3`}>
          <Text className="text-lg font-regular mx-2 my-1 text-[#6F7EA8]">
            Manual Control
          </Text>
          <View className="flex-row flex-wrap w-[100%] items-center justify-between rounded-2xl shadow-2xl bg-white p-3">
            <View className="flex-row w-3/4">
              <Image
                source={require("../assets/Vector.png")}
                className="w-6 h-8"
              ></Image>
              <Text className="text-lg font-bold ml-3 text-[#2666DE]">
                Turn on the device
              </Text>
            </View>
            <Switch
              className="w-1/4"
              trackColor={{ false: "#D4E2FD", true: "#2666DE" }}
              thumbColor={"#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={handleUpdateFanState}
              value={FanInformation?.state}
              style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
            />
            <View
              pointerEvents={!FanInformation.state ? "none" : "auto"}
              className={`w-[100%]  ${
                !FanInformation.state ? "opacity-50" : ""
              }`}
            >
              <Slider
                style={{ width: "100%", height: 40 }}
                minimumValue={1}
                maximumValue={3}
                minimumTrackTintColor="#2666DE"
                maximumTrackTintColor="#D4E2FD"
                thumbTintColor="#2666DE"
                step={1}
                value={FanInformation?.level}
                onValueChange={(value) => handleUpdateLevel(value)}
              />
              <View className="flex-row w-[100%] justify-between">
                <Text className="text-lg font-regular text-[#2666DE]">
                  Level 1
                </Text>
                <Text className="text-lg font-regular text-[#2666DE]">
                  Level 3
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View className="px-3 items-center flex-row mt-5 justify-between mr-4">
          <Text className="text-lg font-regular   my-1 text-[#6F7EA8] px-3">
            Schedule Mode
          </Text>
          <TouchableOpacity onPress={() => setModalOpen(true)}>
            <Feather name="info" className="text-[#2666DE]" size={26} />
          </TouchableOpacity>
        </View>
        <View className="flex-row mt-3 items-center justify-between rounded-xl shadow-2x h-[50] bg-[#8AAEEF] mx-3 p-3">
          <Text className="text-lg font-bold text-[#2666DE]">Auto Mode</Text>
          <Switch
            trackColor={{ false: "#D4E2FD", true: "#2666DE" }}
            thumbColor={"#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={handleUpdateAutoMode}
            value={FanInformation?.isAuto}
            style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
          />
        </View>
        <View className="m-3">
          <View className="flex-row items-center justify-between mt-4 h-[50]">
            <Text className="text-lg font-regular mx-2 my-1 text-[#6F7EA8]">
              Schedule
            </Text>
            <TouchableOpacity
              className="w-1/4 items-end"
              onPress={() => setAddModalOpen(true)}
            >
              <Feather
                name="plus"
                className="text-[#2666DE]"
                size={30}
              ></Feather>
            </TouchableOpacity>
          </View>
          <View className="rounded-md pb-10 ">
            <FlatList
              data={schedule}
              renderItem={({ item }) => ScheduleItem({ item })}
              keyExtractor={(item) => item._id}
            ></FlatList>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FanDeviceScreen;

const styles = StyleSheet.create({});
