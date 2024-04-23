import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { AdjustmentIcon, DoorIcon, FanIcon } from "../assets/Icons";
import { useNavigation } from "@react-navigation/native";
import { updateDeviceState } from "../apis/deviceAPI";
import { useDispatch } from "react-redux";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import { updateDevicesInfomation } from "../redux/deviceSlice/deviceSlice";

const DeviceItem = ({
  device_obj = {},
  status = false,
  navigateDevices,
  setStatus = () => {},
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const Icons = [
    {
      type: "door",
      icon: <DoorIcon color={status ? "white" : "#3579F9"}></DoorIcon>,
    },
    {
      type: "fan",
      icon: <FanIcon color={status ? "white" : "#3579F9"} />,
    },
    {
      type: "light",
      icon: (
        <FontAwesome6
          name={"lightbulb"}
          color={status ? "white" : "#3579F9"}
          size={35}
        />
      ),
    },
  ];

  const getIconByType = (type, status) => {
    const iconItem = Icons.find((item) => item.type === type);

    if (iconItem) {
      const { icon } = iconItem;
      const iconComponent = React.cloneElement(icon, {
        color: status ? "white" : "#3579F9",
      });
      return iconComponent;
    }

    return null;
  };

  const mainIcon = getIconByType(device_obj.type, status);

  const handleUpdateState = async () => {
    const preState = status;
    setStatus(!status);
    const putData = {
      device_id: device_obj.device_id,
      state: Number(!status),
      topic: device_obj.topic,
    };
    const response = await updateDeviceState(putData);
    if (response.data) {
      setStatus(response?.data?.state);
      dispatch(
        updateDevicesInfomation({ name: device_obj.name, state: !preState })
      );
    } else {
      setStatus(preState);
    }
  };

  return (
    <View
      className={`w-[100%] h-[180] rounded-2xl ${
        status ? "bg-[#3579F9]" : "bg-gray-200"
      } shadow-2xl justify-between p-5 shadow-blue-600`}
    >
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
        {device_obj.name === "Living Room Light"
          ? "LRoom Light"
          : device_obj.name}
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
          {device_obj.type == "door" || device_obj.type == "fan" ? (
            <TouchableOpacity
              onPress={() => navigation.navigate(navigateDevices)}
            >
              <AdjustmentIcon
                color={status ? "white" : "#3579F9"}
              ></AdjustmentIcon>
            </TouchableOpacity>
          ) : (
            <Text></Text>
          )}
        </View>
      </View>
    </View>
  );  
};

export default DeviceItem;

const styles = StyleSheet.create({});
