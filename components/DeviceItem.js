import {
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  Pressable,
  View,
} from "react-native";
import React from "react";
import { AdjustmentIcon, DoorIcon, FanIcon } from "../assets/Icons";
import { useNavigation } from "@react-navigation/native";
import { updateDeviceState } from "../apis/deviceAPI";
import { useDispatch, useSelector } from "react-redux";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import { updateDevicesInfomation } from "../redux/deviceSlice/deviceSlice";

const getIconByType = (type, status) => {
  const iconColor = status ? "white" : "#3579F9";

  switch (type) {
    case "door":
      return <DoorIcon color={iconColor} />;
    case "fan":
      return <FanIcon color={iconColor} />;
    case "light":
      return <FontAwesome6 name="lightbulb" color={iconColor} size={35} />;
    default:
      return null;
  }
};

const DeviceItem = ({
  device_name = "",
  device_obj = {},
  navigateDevices,
  status = false,
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const mainIcon = getIconByType(device_obj?.type, status);

  const handleUpdateState = async () => {
    const prevState = status;

    dispatch(
      updateDevicesInfomation({
        name: device_name,
        data: {
          state: !status,
        },
      })
    );

    const putData = {
      device_id: device_obj?.device_id,
      state: Number(!prevState),
      level: device_obj?.level || 1,
      topic: device_obj?.topic,
    };

    console.log("handleUpdateState", putData);

    try {
      await updateDeviceState(putData);
    } catch (error) {
      dispatch(
        updateDevicesInfomation({
          name: device_name,
          data: {
            state: prevState,
          },
        })
      );
      console.error(`Error updating device state: ${error}`);
    }
  };

  return (
    <View
      className={`w-[100%] h-[180] rounded-2xl ${
        status ? "bg-[#3579F9]" : "bg-gray-200"
      } shadow-2xl justify-between p-5 shadow-blue-600`}
    >
      <Pressable onPress={() => handleUpdateState()}>
        <View className="flex-row items-center justify-between h-[65%] pb-10">
          <View className="-translate-x-2">{mainIcon}</View>
          <View>
            <Switch
              trackColor={{ false: "#669BF7", true: "#D4E2FD" }}
              thumbColor={"#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={handleUpdateState}
              value={status}
              style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
            />
          </View>
        </View>

        <Text
          className={`text-white font-bold text-lg ${
            status ? "text-[white]" : "text-[#3579F9]"
          }`}
        >
          {device_name.includes("Living Room")
            ? device_name.replace("Living Room", "LRoom")
            : device_name}
        </Text>

        <View className="flex-row items-center justify-between">
          <Text
            className={`text-white font-bold text-md ${
              status ? "text-[white]" : "text-[#3579F9]"
            }`}
          >
            Philips
          </Text>
          <View>
            {device_obj?.type == "door" || device_obj?.type == "fan" ? (
              <TouchableOpacity
                onPress={() => navigation.navigate(navigateDevices)}
              >
                <View className="absolute right-0 bottom-0 p-3 translate-x-3 translate-y-5">
                  <AdjustmentIcon
                    color={status ? "white" : "#3579F9"}
                  ></AdjustmentIcon>
                </View>
              </TouchableOpacity>
            ) : (
              <Text></Text>
            )}
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default DeviceItem;

const styles = StyleSheet.create({});
